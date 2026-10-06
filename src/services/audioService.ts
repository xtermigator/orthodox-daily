import { VoiceProfileId, SpeechPacingMode } from '../types/prayer';
import { VOICE_PROFILES } from '../data/childrenPrayers';

export interface AudioPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  activePrayerId: string | null;
  activeVerseId: string | null;
  activeVerseIndex: number;
  totalVerses: number;
  activeProfileId: VoiceProfileId;
  activeLang: 'en' | 'el';
  pacing: SpeechPacingMode;
  crystalClearArticulate: boolean;
  isLoadingAudio: boolean;
  usingBackendTts: boolean;
  error: string | null;
}

type StateListener = (state: AudioPlaybackState) => void;

class AudioEngineService {
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  // Default to Father Paisios ('byzantine') as requested - reverent, liturgical, crystal clear
  private activeProfileId: VoiceProfileId = 'byzantine';
  private pacing: SpeechPacingMode = 'calm';
  private crystalClearArticulate: boolean = true;
  private listeners: Set<StateListener> = new Set();
  private audioCache: Map<string, string> = new Map();
  private queueTimeout: any = null;

  // Active playlist context for seamless switching
  private activeSequence: {
    prayerId: string;
    lang: 'en' | 'el';
    verses: { id: string; text: string }[];
    currentIndex: number;
  } | null = null;

  private state: AudioPlaybackState = {
    isPlaying: false,
    isPaused: false,
    activePrayerId: null,
    activeVerseId: null,
    activeVerseIndex: -1,
    totalVerses: 0,
    activeProfileId: 'byzantine',
    activeLang: 'en',
    pacing: 'calm',
    crystalClearArticulate: true,
    isLoadingAudio: false,
    usingBackendTts: false,
    error: null,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('child_voice_profile') as VoiceProfileId;
      if (savedProfile && VOICE_PROFILES[savedProfile]) {
        this.activeProfileId = savedProfile;
        this.state.activeProfileId = savedProfile;
      } else {
        // Enforce Father Paisios as the default voice
        this.activeProfileId = 'byzantine';
        this.state.activeProfileId = 'byzantine';
        try {
          localStorage.setItem('child_voice_profile', 'byzantine');
        } catch {
          // ignore
        }
      }
      const savedPacing = localStorage.getItem('child_speech_pacing') as SpeechPacingMode;
      if (savedPacing) {
        this.pacing = savedPacing;
        this.state.pacing = savedPacing;
      }
    }
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): AudioPlaybackState {
    return { ...this.state };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(s);
      } catch (err) {
        console.error('Audio state listener error:', err);
      }
    });
  }

  public getActiveProfile(): VoiceProfileId {
    return this.activeProfileId;
  }

  public setPacing(pacing: SpeechPacingMode) {
    this.pacing = pacing;
    this.state.pacing = pacing;
    if (typeof window !== 'undefined') {
      localStorage.setItem('child_speech_pacing', pacing);
    }
    this.notify();
  }

  public setCrystalClear(enabled: boolean) {
    this.crystalClearArticulate = enabled;
    this.state.crystalClearArticulate = enabled;
    this.notify();
  }

  /**
   * Seamlessly switches the active voice profile.
   * If a prayer is currently reciting, it instantly resumes from the current line in the new voice!
   */
  public setProfile(profileId: VoiceProfileId) {
    if (!VOICE_PROFILES[profileId]) return;
    this.activeProfileId = profileId;
    this.state.activeProfileId = profileId;
    if (typeof window !== 'undefined') {
      localStorage.setItem('child_voice_profile', profileId);
    }

    // If currently reciting a prayer or verse, seamlessly replay the active line in the new voice
    if (this.state.isPlaying && this.activeSequence) {
      const currentIdx = this.activeSequence.currentIndex;
      this.stopCurrentMedia();
      this.playVerseAtIndex(currentIdx);
    } else {
      this.notify();
    }
  }

  /**
   * Preview a voice's greeting sample
   */
  public async previewVoice(profileId: VoiceProfileId, lang: 'en' | 'el' = 'en') {
    this.stop();
    const profile = VOICE_PROFILES[profileId];
    if (!profile) return;

    const sampleText = lang === 'el' ? profile.previewSampleEl : profile.previewSampleEn;

    this.state.isPlaying = true;
    this.state.isPaused = false;
    this.state.activePrayerId = `preview-${profileId}`;
    this.state.activeVerseId = null;
    this.state.activeVerseIndex = 0;
    this.state.totalVerses = 1;
    this.state.activeLang = lang;
    this.state.isLoadingAudio = true;
    this.notify();

    await this.speakText(sampleText, profileId, lang, () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.activePrayerId = null;
      this.state.isLoadingAudio = false;
      this.notify();
    });
  }

  /**
   * Speak a complete passage (for Daily Prayer or Scripture) with active voice profile
   */
  public speakPassage(
    id: string,
    text: string,
    lang: 'en' | 'el',
    onComplete?: () => void,
    forcedProfileId?: VoiceProfileId
  ) {
    this.stop();

    const targetProfile = forcedProfileId || this.activeProfileId;

    this.state.isPlaying = true;
    this.state.isPaused = false;
    this.state.activePrayerId = id;
    this.state.activeVerseId = null;
    this.state.activeVerseIndex = 0;
    this.state.totalVerses = 1;
    this.state.activeLang = lang;
    this.state.isLoadingAudio = true;
    this.notify();

    this.speakText(text, targetProfile, lang, () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.activePrayerId = null;
      this.state.isLoadingAudio = false;
      this.notify();
      if (onComplete) onComplete();
    });
  }

  /**
   * Plays the complete prayer sequence line-by-line with karaoke sync
   */
  public playPrayer(
    prayerId: string,
    verses: { id: string; text: string }[],
    lang: 'en' | 'el',
    startIndex: number = 0
  ) {
    this.stop();

    if (!verses || verses.length === 0) return;

    this.activeSequence = {
      prayerId,
      lang,
      verses,
      currentIndex: startIndex >= 0 && startIndex < verses.length ? startIndex : 0,
    };

    this.state.isPlaying = true;
    this.state.isPaused = false;
    this.state.activePrayerId = prayerId;
    this.state.activeLang = lang;
    this.state.totalVerses = verses.length;
    this.notify();

    this.playVerseAtIndex(this.activeSequence.currentIndex);
  }

  /**
   * Plays a single specific verse
   */
  public playSingleVerse(
    prayerId: string,
    verseId: string,
    verseIndex: number,
    text: string,
    lang: 'en' | 'el'
  ) {
    this.stop();

    this.activeSequence = {
      prayerId,
      lang,
      verses: [{ id: verseId, text }],
      currentIndex: 0,
    };

    this.state.isPlaying = true;
    this.state.isPaused = false;
    this.state.activePrayerId = prayerId;
    this.state.activeVerseId = verseId;
    this.state.activeVerseIndex = verseIndex;
    this.state.totalVerses = 1;
    this.state.activeLang = lang;
    this.notify();

    this.speakText(text, this.activeProfileId, lang, () => {
      this.state.isPlaying = false;
      this.state.activePrayerId = null;
      this.state.activeVerseId = null;
      this.notify();
    });
  }

  private playVerseAtIndex(index: number) {
    if (!this.activeSequence || index >= this.activeSequence.verses.length) {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.activePrayerId = null;
      this.state.activeVerseId = null;
      this.state.activeVerseIndex = -1;
      this.activeSequence = null;
      this.notify();
      return;
    }

    this.activeSequence.currentIndex = index;
    const currentVerse = this.activeSequence.verses[index];

    this.state.activeVerseId = currentVerse.id;
    this.state.activeVerseIndex = index;
    this.state.isLoadingAudio = true;
    this.notify();

    this.speakText(
      currentVerse.text,
      this.activeProfileId,
      this.activeSequence.lang,
      () => {
        // Line finished. Add a calming breath pause (650ms) before the next line
        const pauseMs = this.pacing === 'slow' ? 850 : this.pacing === 'calm' ? 650 : 450;
        this.queueTimeout = setTimeout(() => {
          if (this.state.isPlaying && this.activeSequence) {
            this.playVerseAtIndex(index + 1);
          }
        }, pauseMs);
      }
    );
  }

  public pause() {
    if (!this.state.isPlaying) return;

    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }

    this.state.isPaused = true;
    this.notify();
  }

  public resume() {
    if (!this.state.isPaused) return;

    if (this.currentAudioElement) {
      this.currentAudioElement.play();
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }

    this.state.isPaused = false;
    this.notify();
  }

  public stop() {
    if (this.queueTimeout) {
      clearTimeout(this.queueTimeout);
      this.queueTimeout = null;
    }

    this.stopCurrentMedia();

    this.activeSequence = null;
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.activePrayerId = null;
    this.state.activeVerseId = null;
    this.state.activeVerseIndex = -1;
    this.state.isLoadingAudio = false;
    this.notify();
  }

  private stopCurrentMedia() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.removeAttribute('src');
      this.currentAudioElement = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  /**
   * Internal dispatcher:
   * 1. Attempts secure backend `/api/tts`
   * 2. If backend succeeds, plays WAV audio
   * 3. If backend returns fallback or errors, seamlessly triggers local Web Speech synthesis
   */
  private async speakText(
    text: string,
    profileId: VoiceProfileId,
    lang: 'en' | 'el',
    onComplete: () => void
  ) {
    this.stopCurrentMedia();

    // Auto-detect Greek characters in text
    const effectiveLang = lang === 'el' || /[\u0370-\u03FF]/.test(text) ? 'el' : 'en';

    // Format text for maximum enunciation and clarity
    let cleanedText = text
      .replace(/\s+/g, ' ')
      .replace(/[•*#]/g, '')
      .trim();

    if (this.crystalClearArticulate) {
      // Add slight spacing around commas and periods for distinct sacred cadence
      cleanedText = cleanedText
        .replace(/,/g, ', ')
        .replace(/\./g, '. ')
        .replace(/;/g, '; ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    const cacheKey = `${profileId}:${effectiveLang}:${this.pacing}:${cleanedText}`;

    // 1. Check client memory cache
    if (this.audioCache.has(cacheKey)) {
      const cachedUrl = this.audioCache.get(cacheKey)!;
      this.state.isLoadingAudio = false;
      this.state.usingBackendTts = true;
      this.notify();
      this.playHtmlAudio(cachedUrl, onComplete);
      return;
    }

    // 2. Fetch from secure backend service
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout for natural speech generation

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanedText,
          profile: profileId,
          lang: effectiveLang,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.audioUrl) {
          this.audioCache.set(cacheKey, data.audioUrl);
          this.state.isLoadingAudio = false;
          this.state.usingBackendTts = true;
          this.notify();
          this.playHtmlAudio(data.audioUrl, onComplete);
          return;
        }
      }
    } catch {
      // Backend not running or timeout; seamlessly use client speech synthesis fallback
    }

    // 3. Fallback: Client Web Speech API configured to exact voice profile & pacing
    this.state.isLoadingAudio = false;
    this.state.usingBackendTts = false;
    this.notify();
    this.playSpeechSynthesisFallback(cleanedText, profileId, effectiveLang, onComplete);
  }

  private playHtmlAudio(audioUrl: string, onComplete: () => void) {
    const audio = new Audio(audioUrl);
    this.currentAudioElement = audio;

    // Apply pacing to audio element playback rate
    audio.playbackRate = this.pacing === 'slow' ? 0.85 : this.pacing === 'natural' ? 1.05 : 0.95;

    audio.onended = () => {
      this.currentAudioElement = null;
      onComplete();
    };

    audio.onerror = () => {
      this.currentAudioElement = null;
      onComplete();
    };

    audio.play().catch(() => {
      onComplete();
    });
  }

  private playSpeechSynthesisFallback(
    text: string,
    profileId: VoiceProfileId,
    lang: 'en' | 'el',
    onComplete: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onComplete();
      return;
    }

    window.speechSynthesis.cancel();

    const profile = VOICE_PROFILES[profileId] || VOICE_PROFILES.storyteller;
    const utterance = new SpeechSynthesisUtterance(text);

    // Calculate effective speech rate based on pacing mode
    const pacingMultiplier = this.pacing === 'slow' ? 0.82 : this.pacing === 'natural' ? 1.12 : 0.95;
    utterance.rate = Math.max(0.65, Math.min(1.3, profile.speechRate * pacingMultiplier));
    utterance.pitch = profile.speechPitch;

    // Pick best matching system voice
    const voices = window.speechSynthesis.getVoices() || [];
    let matchedVoice: SpeechSynthesisVoice | undefined;

    if (lang === 'el') {
      utterance.lang = 'el-GR';
      // Find Greek voices with highest clarity
      matchedVoice =
        voices.find((v) => v.lang === 'el-GR' || v.lang === 'el_GR') ||
        voices.find((v) => v.lang.startsWith('el')) ||
        voices.find((v) => v.name.toLowerCase().includes('greek'));
    } else {
      utterance.lang = 'en-US';
      if (profileId === 'greek') {
        // Prefer Greek-accented or European voice if available
        matchedVoice =
          voices.find((v) => v.lang.startsWith('el')) ||
          voices.find((v) => v.name.toLowerCase().includes('greek')) ||
          voices.find((v) => v.lang === 'en-GB');
      } else if (profileId === 'child') {
        // Prefer youthful, bright voice
        matchedVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('junior') ||
              v.name.toLowerCase().includes('child') ||
              v.name.toLowerCase().includes('zira') ||
              v.name.toLowerCase().includes('samantha'))
        );
      } else if (profileId === 'byzantine') {
        // Prefer deep, steady, reverent resonant voice - avoiding robotic system defaults
        matchedVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('natural') ||
              v.name.toLowerCase().includes('guy') ||
              v.name.toLowerCase().includes('george') ||
              v.name.toLowerCase().includes('daniel') ||
              v.name.toLowerCase().includes('oliver') ||
              v.name.toLowerCase().includes('arthur') ||
              v.name.toLowerCase().includes('male') ||
              v.name.toLowerCase().includes('david'))
        ) || voices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
      } else {
        // Storyteller: calming warm female voice
        matchedVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('natural') ||
              v.name.toLowerCase().includes('samantha') ||
              v.name.toLowerCase().includes('jenny') ||
              v.name.toLowerCase().includes('female'))
        );
      }
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      onComplete();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      onComplete();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }
}

export const audioEngine = new AudioEngineService();
