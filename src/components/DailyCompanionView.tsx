import React, { useState, useEffect, useCallback } from 'react';
import { OrthodoxDayData } from '../types';
import { SaintIconIllustration } from './SaintIconIllustration';
import { QuestionOfTheDaySection } from './QuestionOfTheDaySection';
import { MorningReminderControl } from './MorningReminderControl';
import { playGentleBellChime } from '../utils/reminderService';
import { audioEngine, AudioPlaybackState } from '../services/audioService';
import { VOICE_PROFILES } from '../data/childrenPrayers';
import { VoiceProfileId } from '../types/prayer';
import { 
  Volume2, 
  VolumeX, 
  Flame, 
  BookOpen, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  MessageCircle, 
  Award, 
  Check, 
  Utensils, 
  Music,
  ZoomIn, 
  ZoomOut,
  ArrowDown,
  Compass,
  Sliders,
  X,
  Play,
  Eye,
  Sun,
  Moon,
  Bell,
  Languages
} from 'lucide-react';

interface DailyCompanionViewProps {
  dayData: OrthodoxDayData;
  onOpenGoarchModal: () => void;
  onOpenSaintsGallery: () => void;
  onOpenVoiceMenu?: () => void;
  onNavigateToPrayers?: () => void;
}

export const DailyCompanionView: React.FC<DailyCompanionViewProps> = ({
  dayData,
  onOpenGoarchModal,
  onOpenSaintsGallery,
  onOpenVoiceMenu,
  onNavigateToPrayers,
}) => {
  // Speech synthesis state: Soothing Church & Liturgical Cadence
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioMode, setActiveAudioMode] = useState<'full' | 'saint' | 'question' | 'hymn' | 'scripture' | 'prayer' | null>(null);
  const [femaleVoiceName, setFemaleVoiceName] = useState<string>('Reverent Church Storyteller');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [availableFemaleVoices, setAvailableFemaleVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Language reading state for prayers & scripture
  const [prayerAudioLang, setPrayerAudioLang] = useState<'en' | 'el'>('en');
  const [scriptureAudioLang, setScriptureAudioLang] = useState<'en' | 'el'>('en');
  const [audioEngineState, setAudioEngineState] = useState<AudioPlaybackState>(audioEngine.getState());

  useEffect(() => {
    return audioEngine.subscribe((s) => setAudioEngineState(s));
  }, []);

  // Soothing church cadence (0.84x) gives the peaceful, reverent tempo of liturgical reading
  const [speechRate, setSpeechRate] = useState<number>(0.84);
  const [speechPitch, setSpeechPitch] = useState<number>(0.95); // Warm, soothing, peaceful resonance without tinny sharpness
  const [playChurchBellPrelude, setPlayChurchBellPrelude] = useState<boolean>(true); // Sacred cathedral bell chime before devotions
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Daily Devotion Sequence state: Morning Prayers & Reading vs Evening Prayers & Reading
  const [prayerTime, setPrayerTime] = useState<'morning' | 'evening'>('morning');

  // Active prayer based on Morning/Evening sequence toggle
  const activePrayer = prayerTime === 'evening'
    ? (dayData.eveningPrayer || dayData.prayer)
    : (dayData.morningPrayer || dayData.prayer);

  // Active reading based on Morning/Evening sequence toggle
  const activeReading = prayerTime === 'evening'
    ? (dayData.eveningScripture || dayData.eveningReading || dayData.scripture)
    : (dayData.morningScripture || dayData.morningReading || dayData.scripture);

  // Helper to shift between Morning and Evening sequences seamlessly
  const handleShiftSequence = (time: 'morning' | 'evening') => {
    if (time === prayerTime) return;
    if (isPlayingAudio && (activeAudioMode === 'prayer' || activeAudioMode === 'scripture' || activeAudioMode === 'full')) {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
    }
    setPrayerTime(time);
  };

  // Text zoom state (comfort for kids and parents)
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');
  
  // Interactive candle state
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [candleIntention, setCandleIntention] = useState<'family' | 'health' | 'peace' | 'thanks'>('family');
  const [candleFeedback, setCandleFeedback] = useState(false);

  // Daily Challenge completed state
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  // Highlight state when jumped from Saint of the Day to Learning section
  const [isLearningHighlighted, setIsLearningHighlighted] = useState(false);

  // Helper to test if a voice is an unwanted robotic or synthetic artifact engine
  const isRoboticOrLegacyVoice = (v: SpeechSynthesisVoice): boolean => {
    const n = v.name.toLowerCase();
    return (
      n.includes('espeak') ||
      n.includes('compact') ||
      n.includes('desktop') ||
      n.includes('synth') ||
      n.includes('sample') ||
      n.includes('klatt') ||
      n.includes('robotic') ||
      n.includes('microsoft sam')
    );
  };

  // Helper to discover and sort high-quality natural female voices
  const getFriendlyFemaleVoicesList = useCallback((): SpeechSynthesisVoice[] => {
    if (!('speechSynthesis' in window)) return [];
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length === 0) return [];

    // Filter out robotic synthesizers
    const cleanVoices = voices.filter(v => !isRoboticOrLegacyVoice(v));

    // High-priority natural, friendly female voice names across Windows, macOS, iOS, Android, Chrome
    const preferredFemalePatterns = [
      'jenny', // Microsoft Natural online female
      'aria',  // Microsoft Natural online female
      'samantha', // macOS & iOS warm default female
      'karen', // Australian English female
      'victoria', // macOS female
      'ava', // iOS natural female
      'google uk english female',
      'google us english',
      'fiona', // Scottish female
      'moira', // Irish female
      'tessa', // South African female
      'zira', // Windows female
      'zoe'
    ];

    // Score voice quality and preference
    const scoredVoices = cleanVoices.map(v => {
      const n = v.name.toLowerCase();
      let score = 0;
      if (v.lang.startsWith('en')) score += 10;
      if (preferredFemalePatterns.some(p => n.includes(p))) score += 50;
      if (n.includes('natural') || n.includes('neural') || n.includes('enhanced') || n.includes('premium')) score += 30;
      if (n.includes('female') || n.includes('woman')) score += 20;
      return { voice: v, score };
    });

    // Return voices with highest score first, filtering to English female/natural
    return scoredVoices
      .filter(item => item.voice.lang.startsWith('en') && (item.score >= 20 || item.voice.name.toLowerCase().includes('female')))
      .sort((a, b) => b.score - a.score)
      .map(item => item.voice);
  }, []);

  // Helper to find the best friendly female voice
  const findFriendlyFemaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length === 0) return null;

    if (selectedVoiceURI) {
      const matched = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (matched) return matched;
    }

    const friendlyList = getFriendlyFemaleVoicesList();
    if (friendlyList.length > 0) return friendlyList[0];

    // Secondary fallback: any English voice
    const firstEnglish = voices.find(v => v.lang.startsWith('en') && !isRoboticOrLegacyVoice(v));
    return firstEnglish || voices[0] || null;
  }, [selectedVoiceURI, getFriendlyFemaleVoicesList]);

  // Initialize and listen for voice availability
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const list = getFriendlyFemaleVoicesList();
      setAvailableFemaleVoices(list);
      const voice = findFriendlyFemaleVoice();
      if (voice) {
        setFemaleVoiceName(voice.name.replace(/Microsoft |Google /g, ''));
        if (!selectedVoiceURI) {
          setSelectedVoiceURI(voice.voiceURI);
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [findFriendlyFemaleVoice, getFriendlyFemaleVoicesList, selectedVoiceURI]);

  // Reset audio if date changes
  useEffect(() => {
    audioEngine.stop();
    setIsPlayingAudio(false);
    setActiveAudioMode(null);
  }, [dayData.dateString]);

  // Format text with reverent church cadence and peaceful breath pauses
  const formatChurchCadence = (rawText: string): string => {
    return rawText
      .replace(/\s+/g, ' ')
      .replace(/\bAmen\b/g, 'Amen. ... ')
      .replace(/\bLord have mercy\b/gi, 'Lord, have mercy. ... ')
      .replace(/\bGlory to the Father, and to the Son, and to the Holy Spirit\b/gi, 'Glory to the Father, and to the Son, and to the Holy Spirit, ... ')
      .replace(/\bboth now and ever and unto ages of ages\b/gi, 'both now, and ever, and unto the ages of ages. ... ')
      .replace(/([.?!])\s+/g, '$1 ... ') // gives the synthesizer an intentional, reverent liturgical pause
      .replace(/—|–/g, ', ... ')
      .trim();
  };

  // Configure SpeechUtterance with soothing church liturgical acoustic settings
  const createNaturalUtterance = (text: string): SpeechSynthesisUtterance => {
    const formatted = formatChurchCadence(text);
    const utterance = new SpeechSynthesisUtterance(formatted);
    const femaleVoice = findFriendlyFemaleVoice();
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    // Warm pitch (0.95) prevents shrillness or artificial synthetic artifacts
    utterance.pitch = speechPitch;
    utterance.rate = speechRate; // Soothing church reading pace (0.84x)
    return utterance;
  };

  // Unified audio player with sacred church bell chime prelude using audioEngine (honoring selected voice profile)
  const playAudioWithChurchPrelude = (
    mode: 'full' | 'saint' | 'question' | 'hymn' | 'scripture' | 'prayer',
    scriptText: string,
    lang: 'en' | 'el' = 'en',
    forcedProfileId?: VoiceProfileId
  ) => {
    audioEngine.stop();

    // Play sacred cathedral bell chime prelude if enabled
    if (playChurchBellPrelude) {
      playGentleBellChime('church-bell');
    }

    setIsPlayingAudio(true);
    setActiveAudioMode(mode);

    // If church bell prelude was played, give a peaceful pause (400ms) for the chime to resonate
    setTimeout(() => {
      audioEngine.speakPassage(
        `daily-${mode}`,
        scriptText,
        lang,
        () => {
          setIsPlayingAudio(false);
          setActiveAudioMode(null);
        },
        forcedProfileId || audioEngine.getActiveProfile() || 'byzantine'
      );
    }, playChurchBellPrelude ? 400 : 0);
  };

  // Read aloud audio player (Full Devotion)
  const handleToggleFullAudio = () => {
    if (isPlayingAudio && activeAudioMode === 'full') {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
      return;
    }

    const script = `Welcome to today's Orthodox family devotion.
    Today is ${dayData.formattedDate}.
    Today's commemorated saint of the day is ${dayData.saintOfTheDay.name}, ${dayData.saintOfTheDay.title}.
    ${dayData.saintOfTheDay.shortBio}
    Let us pray together this ${prayerTime === 'morning' ? 'morning' : 'evening'} prayer: ${activePrayer.title}.
    ${activePrayer.text}.
    Today's ${prayerTime === 'morning' ? 'morning' : 'evening'} Holy Scripture reading is from ${activeReading.passageRef}.
    ${activeReading.readingTitle}.
    ${activeReading.text}.
    Family reflection: ${activeReading.reflection}.
    Today's faith motto: ${dayData.learning.moralMotto}.`;

    playAudioWithChurchPrelude('full', script, 'en');
  };

  // Read aloud specifically the Saint of the Day's story - defaults to Father Paisios ('byzantine')
  const handleToggleSaintAudio = () => {
    if (isPlayingAudio && activeAudioMode === 'saint') {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
      return;
    }

    const script = `Commemoration of the Saint of the Day.
    ${dayData.saintOfTheDay.name}, ${dayData.saintOfTheDay.title}.
    Celebrated on ${dayData.saintOfTheDay.feastDateText}.
    ${dayData.saintOfTheDay.shortBio}
    Daily faith motto: ${dayData.saintOfTheDay.moralMotto}.
    Family kindness action: ${dayData.saintOfTheDay.familyAction || dayData.learning.familyAction}.`;

    // Always default to Father Paisios ('byzantine') as requested by user, never a computer voice
    playAudioWithChurchPrelude('saint', script, 'en', 'byzantine');
  };

  // Read aloud specifically the Feast Day Troparion (Apolytikion) - defaults to Father Paisios ('byzantine')
  const handleToggleHymnAudio = () => {
    if (isPlayingAudio && activeAudioMode === 'hymn') {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
      return;
    }

    const hymn = dayData.saintOfTheDay.hymnApolytikion;
    if (!hymn) return;

    const script = `Feast day troparion, or apolytikion, of ${dayData.saintOfTheDay.name}, in ${hymn.tone}.
    ${hymn.englishLyrics}`;

    playAudioWithChurchPrelude('hymn', script, 'en', 'byzantine');
  };

  // Read aloud specifically the Question of the Day
  const handleToggleQuestionAudio = (questionText: string) => {
    if (isPlayingAudio && activeAudioMode === 'question') {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
      return;
    }

    const script = `Question of the Day for our family discussion. ${questionText}`;
    playAudioWithChurchPrelude('question', script, 'en');
  };

  // Read aloud specifically the Scripture reading passage in English or Greek
  const handleToggleScriptureAudio = () => {
    if (isPlayingAudio && activeAudioMode === 'scripture') {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
      return;
    }

    if (playChurchBellPrelude) {
      playGentleBellChime('church-bell');
    }

    setIsPlayingAudio(true);
    setActiveAudioMode('scripture');

    const scriptEn = `Holy Scripture ${prayerTime === 'morning' ? 'morning' : 'evening'} reading from ${activeReading.passageRef}.
    ${activeReading.readingTitle}.
    ${activeReading.text}.
    Family reflection: ${activeReading.reflection}.`;

    const scriptEl = `Ἀνάγνωσμα Ἁγίας Γραφῆς. ${activeReading.passageRef}.
    ${activeReading.readingTitle}.
    Δόξα σοι, Κύριε, δόξα σοι.
    ${activeReading.text}.
    Οἰκογενειακὸς στοχασμός: ${activeReading.reflection}.`;

    const targetScript = scriptureAudioLang === 'el' ? scriptEl : scriptEn;

    setTimeout(() => {
      audioEngine.speakPassage('daily-scripture', targetScript, scriptureAudioLang, () => {
        setIsPlayingAudio(false);
        setActiveAudioMode(null);
      });
    }, playChurchBellPrelude ? 450 : 0);
  };

  // Read aloud specifically the active Prayer (Morning or Evening) in English or Greek
  const handleTogglePrayerAudio = () => {
    if (isPlayingAudio && activeAudioMode === 'prayer') {
      audioEngine.stop();
      setIsPlayingAudio(false);
      setActiveAudioMode(null);
      return;
    }

    if (playChurchBellPrelude) {
      playGentleBellChime('church-bell');
    }

    setIsPlayingAudio(true);
    setActiveAudioMode('prayer');

    const scriptEn = `Let us pray together this Orthodox ${prayerTime === 'morning' ? 'Morning' : 'Evening'} prayer:
    ${activePrayer.title}.
    ${activePrayer.text}.
    ${activePrayer.kidFriendlyNote ? `Family note: ${activePrayer.kidFriendlyNote}` : ''}`;

    const scriptEl = `Ας προσευχηθούμε μαζί την Ορθόδοξη ${prayerTime === 'morning' ? 'πρωινή' : 'εσπερινή'} προσευχή.
    Εἰς τὸ ὄνομα τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος. Ἀμήν.
    ${activePrayer.title}.
    ${activePrayer.text}.
    Δι' εὐχῶν τῶν ἁγίων Πατέρων ἡμῶν, Κύριε Ἰησοῦ Χριστέ, ὁ Θεὸς ἡμῶν, ἐλέησον καὶ σῶσον ἡμᾶς. Ἀμήν.`;

    const targetScript = prayerAudioLang === 'el' ? scriptEl : scriptEn;

    setTimeout(() => {
      audioEngine.speakPassage('daily-prayer', targetScript, prayerAudioLang, () => {
        setIsPlayingAudio(false);
        setActiveAudioMode(null);
      });
    }, playChurchBellPrelude ? 450 : 0);
  };

  // Test voice sample in settings with optional bell chime
  const handleTestVoiceSample = (voiceURI: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (playChurchBellPrelude) {
      playGentleBellChime('church-bell');
    }

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.voiceURI === voiceURI);
    
    const formatted = formatChurchCadence('Glory to God for all things! ... Peace be unto this house and family.');
    const utterance = new SpeechSynthesisUtterance(formatted);
    if (voice) utterance.voice = voice;
    utterance.pitch = speechPitch;
    utterance.rate = speechRate;

    if (playChurchBellPrelude) {
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 350);
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };

  // Smooth scroll and highlight the Learning Section
  const handleScrollToLearning = () => {
    const learningElement = document.getElementById('daily-learning-card');
    if (learningElement) {
      learningElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsLearningHighlighted(true);
      setTimeout(() => {
        setIsLearningHighlighted(false);
      }, 2500);
    }
  };

  const handleLightCandle = (intention: 'family' | 'health' | 'peace' | 'thanks') => {
    setCandleIntention(intention);
    setIsCandleLit(true);
    setCandleFeedback(true);
    setTimeout(() => setCandleFeedback(false), 3000);
  };

  const isLargeText = fontSizeLevel === 'large';

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Commemoration & Date Hero Header */}
      <section 
        id="daily-hero-card"
        className="bg-gradient-to-br from-[#FAF5EC] via-[#F5EEDB] to-[#EFE2C8] rounded-2xl p-6 border border-[#E3D1B4] shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold bg-[#8B5A2B] text-white px-2.5 py-0.5 rounded-full">
                Orthodox Calendar
              </span>
              <span className="text-xs font-semibold bg-[#E8D7B8] text-[#5C3E1B] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#D9C4A1]">
                <Music className="w-3 h-3" />
                {dayData.tone}
              </span>
              <span className="text-xs font-medium bg-[#EFE3CF] text-[#6B4E26] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#DFD1B8]">
                <Utensils className="w-3 h-3" />
                {dayData.fasting.badgeLabel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#2D2115] leading-tight">
              {dayData.dayName}
            </h1>
            <p className="text-sm font-semibold text-[#78542E] mb-1">
              {dayData.formattedDate}
            </p>
            <p className="text-sm text-[#4E3924] font-medium max-w-2xl">
              {dayData.commemoration}
            </p>
          </div>

          {/* Quick Reader Controls (Audio Read-Aloud & Text Size) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-center bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-[#D9C7AA] shadow-xs">
            <div className="flex items-center gap-2">
              <button
                id="listen-daily-audio-btn"
                onClick={handleToggleFullAudio}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio && activeAudioMode === 'full'
                    ? 'bg-[#B45309] text-white animate-pulse'
                    : 'bg-[#D4AF37] hover:bg-[#C29D26] text-[#1F1710]'
                }`}
                title={`Listen to today's devotion read aloud in ${VOICE_PROFILES[audioEngineState.activeProfileId]?.name || 'Father Paisios'}`}
              >
                {isPlayingAudio && activeAudioMode === 'full' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Pause Reading</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Together ({VOICE_PROFILES[audioEngineState.activeProfileId]?.avatarEmoji || '🕯️'})</span>
                  </>
                )}
              </button>

              <button
                id="toggle-font-size-btn"
                onClick={() => setFontSizeLevel(isLargeText ? 'normal' : 'large')}
                className="p-1.5 rounded-lg bg-[#F2E8D8] hover:bg-[#E5D7C2] text-[#4A3723] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                title="Toggle Large Text for Children & Parents"
              >
                {isLargeText ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{isLargeText ? 'Standard' : 'Larger'}</span>
              </button>
            </div>

            {/* Church Audio Cadence & Voice selection modal button */}
            <button
              id="voice-settings-btn"
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-1.5 text-[10px] text-[#7C5A32] hover:text-[#4A3215] bg-[#FAF3E8] hover:bg-[#F3E7D3] px-2.5 py-1 rounded-lg border border-[#E8DCCB] transition-colors cursor-pointer"
              title="Click to adjust church reading cadence, pitch, sanctuary bell chime, or choose voices"
            >
              <Sliders className="w-3 h-3 text-[#B45309]" />
              <span className="font-bold text-[#8C531B]">Voice Engine:</span>
              <span className="font-semibold text-[#573E25]">
                {VOICE_PROFILES[audioEngineState.activeProfileId]?.name || 'Father Paisios'}
              </span>
              {playChurchBellPrelude && (
                <span className="text-[9px] bg-[#FEF3C7] text-[#92400E] px-1 py-0.2 rounded border border-[#FDE68A] font-bold">
                  Bell
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Prominent Voice Engine Selector Bar: Pick from Voice Engine first */}
        <div className="mt-4 pt-3 border-t border-[#E3D1B4]/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[#6E5336] flex items-center gap-1.5">
              <span>🔊 Voice Engine:</span>
            </span>

            {/* Quick 1-tap voice switcher pills */}
            <div className="flex flex-wrap items-center gap-1 bg-white/95 p-1 rounded-xl border border-[#D9C7AA] shadow-xs">
              <button
                type="button"
                onClick={() => audioEngine.setProfile('byzantine')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  audioEngineState.activeProfileId === 'byzantine'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-[#6E5336] hover:bg-amber-50'
                }`}
                title="Father Paisios (Default • Monastic Cantor, Liturgical & Clear)"
              >
                <span>🕯️ Fr. Paisios (Default)</span>
              </button>
              <button
                type="button"
                onClick={() => audioEngine.setProfile('storyteller')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  audioEngineState.activeProfileId === 'storyteller'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-[#6E5336] hover:bg-purple-50'
                }`}
                title="Storyteller Sophia (Soothing Bedtime & Storytelling)"
              >
                <span>🦉 Sophia</span>
              </button>
              <button
                type="button"
                onClick={() => audioEngine.setProfile('greek')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  audioEngineState.activeProfileId === 'greek'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-[#6E5336] hover:bg-sky-50'
                }`}
                title="Elder Yiannis (Authentic Greek Accent)"
              >
                <span>🌿 Yiannis</span>
              </button>
              <button
                type="button"
                onClick={() => audioEngine.setProfile('child')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  audioEngineState.activeProfileId === 'child'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-[#6E5336] hover:bg-yellow-50'
                }`}
                title="Little Nikos (Peer Kid Friend)"
              >
                <span>🌟 Nikos</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#78542E] italic hidden sm:inline">
              Selected voice stays saved for all prayers & listen together
            </span>
            <button
              type="button"
              onClick={() => onOpenVoiceMenu?.() || setIsVoiceModalOpen(true)}
              className="text-[#92400E] font-bold hover:underline cursor-pointer"
            >
              Voice Settings ⚙️
            </button>
          </div>
        </div>

        {/* Fasting family hint */}
        <div className="mt-4 pt-3 border-t border-[#E3D1B4]/80 text-xs text-[#6E5336] flex items-center gap-2">
          <span className="font-semibold">Family Fasting Note:</span>
          <span>{dayData.fasting.familyExplanation}</span>
        </div>
      </section>

      {/* FEATURED: SAINT OF THE DAY CARD */}
      <section 
        id="saint-of-the-day-card"
        className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5EEDB] rounded-2xl p-5 sm:p-6 border-2 border-[#D4AF37] shadow-md relative overflow-hidden"
      >
        {/* Decorative corner cross */}
        <div className="absolute top-2 right-3 text-[#D4AF37]/30 text-2xl font-cinzel select-none pointer-events-none">
          ☦
        </div>

        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E8D5B7]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#B45309] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ☦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
                  Saint of the Day
                </span>
                {dayData.saintOfTheDay.isFeaturedPdf && (
                  <span className="text-[10px] font-bold bg-[#6D28D9] text-white px-2 py-0.2 rounded-full uppercase tracking-wider">
                    ★ Featured Saint
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#785B3E] font-medium">
                Commemorated on {dayData.saintOfTheDay.feastDateText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="listen-saint-audio-btn"
              onClick={handleToggleSaintAudio}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio && activeAudioMode === 'saint'
                  ? 'bg-[#B45309] text-white animate-pulse'
                  : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#FCD34D]'
              }`}
              title="Listen to today's saint story in the reverent monastic voice of Father Paisios (🕯️)"
            >
              {isPlayingAudio && activeAudioMode === 'saint' ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                  <span>Pause Saint Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Listen to Saint (🕯️ Fr. Paisios)</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenSaintsGallery}
              className="text-xs text-[#785B3E] hover:text-[#3B2918] font-bold flex items-center gap-1 bg-white hover:bg-[#FAF4EA] px-2.5 py-1.5 rounded-lg border border-[#E0D2C0] transition-colors cursor-pointer"
              title="Explore all 18 Orthodox Saints"
            >
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Saints Guide</span>
            </button>
          </div>
        </div>

        {/* Content Body: Respectful Icon + Child-Friendly Biography */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
          {/* Simple, Respectful Orthodox Icon or Illustration */}
          <div className="flex flex-col items-center shrink-0">
            <SaintIconIllustration
              iconType={dayData.saintOfTheDay.iconType}
              name={dayData.saintOfTheDay.name}
              imageUrl={dayData.saintOfTheDay.imageUrl}
              size="lg"
            />
            {dayData.saintOfTheDay.greekName && (
              <span className="text-[10px] text-[#8C6D4F] font-serif italic mt-1.5 text-center max-w-[140px] truncate">
                {dayData.saintOfTheDay.greekName}
              </span>
            )}
            <span className="text-[9px] text-[#A88863] mt-0.5">Tap icon to enlarge</span>
          </div>

          {/* Saint Biography & Information */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2D2115] leading-tight">
                  {dayData.saintOfTheDay.name}
                </h2>
                {dayData.saintOfTheDay.liturgicalColorName && (
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1.5"
                    style={{
                      backgroundColor: `${dayData.saintOfTheDay.liturgicalColorHex || '#D97706'}15`,
                      color: dayData.saintOfTheDay.liturgicalColorHex || '#D97706',
                      borderColor: `${dayData.saintOfTheDay.liturgicalColorHex || '#D97706'}40`
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: dayData.saintOfTheDay.liturgicalColorHex || '#D97706' }}
                    />
                    <span>{dayData.saintOfTheDay.liturgicalColorName}</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#8B5A2B]">
                {dayData.saintOfTheDay.title}
              </p>
            </div>

            {/* Short, Child-Friendly Biography (2-3 Sentences) */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E7DECE] text-[#33261A] shadow-2xs">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B5A2B] uppercase tracking-wider mb-1.5 justify-center md:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Saint Story for Children</span>
              </div>
              <p className={`font-reading leading-relaxed ${
                isLargeText ? 'text-lg leading-loose' : 'text-sm sm:text-base'
              }`}>
                {dayData.saintOfTheDay.shortBio}
              </p>
            </div>

            {/* Virtue & Moral Motto Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="text-xs font-semibold bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-lg border border-[#FDE68A] flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Virtue: <strong>{dayData.saintOfTheDay.virtue}</strong></span>
              </span>

              <span className="text-xs font-medium bg-[#EDE9FE] text-[#5B21B6] px-2.5 py-1 rounded-lg border border-[#DDD6FE]">
                "{dayData.saintOfTheDay.moralMotto}"
              </span>
            </div>

            {/* Sacred Icon Symbolism & Colors Box */}
            {dayData.saintOfTheDay.iconSymbolism && (
              <div className="bg-[#FAF5EC] rounded-xl p-3 border border-[#EADFC9] text-xs text-left shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#8B5A2B] text-[11px] uppercase tracking-wider">
                    <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Sacred Icon Symbolism &amp; Colors</span>
                  </div>
                  <span className="text-[10px] text-[#A88863] italic">Holy Tradition</span>
                </div>
                <p className="text-[#453221] leading-relaxed">
                  {dayData.saintOfTheDay.iconSymbolism}
                </p>
              </div>
            )}

            {/* Feast Day Troparion (Apolytikion) */}
            {dayData.saintOfTheDay.hymnApolytikion && (
              <div className="bg-[#F6F2FF] rounded-xl p-3.5 border border-[#E3D9FF] text-xs text-left shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#5B21B6] text-[11px] uppercase tracking-wider">
                    <Music className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>Feast Day Troparion (Apolytikion)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-[#EDE9FE] text-[#5B21B6] px-2 py-0.5 rounded-full border border-[#DDD6FE]">
                      {dayData.saintOfTheDay.hymnApolytikion.tone}
                    </span>
                    <button
                      onClick={handleToggleHymnAudio}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                        isPlayingAudio && activeAudioMode === 'hymn'
                          ? 'bg-[#6D28D9] text-white animate-pulse'
                          : 'bg-white hover:bg-[#EDE9FE] text-[#5B21B6] border border-[#DDD6FE]'
                      }`}
                      title="Listen to this saint's troparion hymn"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isPlayingAudio && activeAudioMode === 'hymn' ? 'Pause' : 'Listen to Hymn'}</span>
                    </button>
                  </div>
                </div>
                <p className="text-[#3C1A74] italic leading-relaxed font-serif">
                  "{dayData.saintOfTheDay.hymnApolytikion.englishLyrics}"
                </p>
              </div>
            )}

            {/* Name Day Tradition & Celebration Custom */}
            {dayData.saintOfTheDay.nameDayTradition && (
              <div className="bg-[#F0FDF4] rounded-xl p-3 border border-[#DCFCE7] text-xs text-left shadow-2xs">
                <div className="flex items-center gap-1.5 font-bold text-[#166534] text-[11px] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Name Day Tradition &amp; Celebration</span>
                </div>
                <p className="text-[#14532D] leading-relaxed">
                  {dayData.saintOfTheDay.nameDayTradition}
                </p>
              </div>
            )}

            {/* LINK TO LEARNING SECTION */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-[11px] text-[#7A6450] italic">
                Want to dive deeper into this saint's teaching and family activity?
              </p>
              
              <button
                id="link-to-learning-section-btn"
                onClick={handleScrollToLearning}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#1B365D] to-[#2563EB] hover:from-[#152B4A] hover:to-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all hover:shadow-sm cursor-pointer group"
              >
                <span>Explore in Saint &amp; Faith Learning Section</span>
                <ArrowDown className="w-4 h-4 text-[#93C5FD] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Morning Prayer & Reading Notification System */}
      <MorningReminderControl 
        onSelectMorningPrayer={() => {
          handleShiftSequence('morning');
          const el = document.getElementById('daily-prayer-card');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="mb-6"
      />

      {/* Dedicated Morning / Evening Devotion Sequence Selector */}
      <div 
        id="devotion-sequence-selector"
        className={`mb-6 p-4 sm:p-5 rounded-2xl border transition-all duration-300 shadow-xs ${
          prayerTime === 'morning'
            ? 'bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7]/40 to-[#FFF7ED] border-[#FDE68A]'
            : 'bg-gradient-to-r from-[#F5F3FF] via-[#EDE9FE]/40 to-[#FDF4FF] border-[#DDD6FE]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xs transition-colors shrink-0 ${
              prayerTime === 'morning'
                ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white shadow-amber-200'
                : 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white shadow-purple-200'
            }`}>
              {prayerTime === 'morning' ? <Sun className="w-6 h-6 animate-spin-slow" /> : <Moon className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2D2115]">
                  Daily Devotion Sequence
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                  prayerTime === 'morning'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-purple-100 text-purple-900 border-purple-300'
                }`}>
                  {prayerTime === 'morning' ? '☀️ Morning Sequence Active' : '🌙 Evening Sequence Active'}
                </span>
              </div>
              <p className="text-xs text-[#7A634E] mt-0.5">
                {prayerTime === 'morning'
                  ? 'Shifted to Morning prayers and sunrise scripture reading for spiritual light and strength.'
                  : 'Shifted to Evening prayers and bedtime scripture reading for peaceful sleep and protection.'}
              </p>
            </div>
          </div>

          {/* Large Toggle Switch between Morning and Evening Sequences */}
          <div 
            role="group"
            aria-label="Shift between Morning and Evening prayer sequences and readings"
            className="flex items-center p-1 bg-white/80 backdrop-blur-xs rounded-xl border border-[#E2D6C4] shadow-inner shrink-0"
          >
            <button
              id="sequence-morning-toggle-btn"
              type="button"
              onClick={() => handleShiftSequence('morning')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                prayerTime === 'morning'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm ring-2 ring-amber-300/50'
                  : 'text-[#7C5A32] hover:text-[#4A3215] hover:bg-black/5'
              }`}
              aria-pressed={prayerTime === 'morning'}
            >
              <Sun className={`w-4 h-4 ${prayerTime === 'morning' ? 'text-white' : 'text-amber-600'}`} />
              <span>Morning Sequence</span>
            </button>

            <button
              id="sequence-evening-toggle-btn"
              type="button"
              onClick={() => handleShiftSequence('evening')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                prayerTime === 'evening'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-sm ring-2 ring-purple-300/50'
                  : 'text-[#7C5A32] hover:text-[#4A3215] hover:bg-black/5'
              }`}
              aria-pressed={prayerTime === 'evening'}
            >
              <Moon className={`w-4 h-4 ${prayerTime === 'evening' ? 'text-white' : 'text-purple-600'}`} />
              <span>Evening Sequence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Daily Prayer & Scripture Readings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Daily Prayer with Morning / Evening Toggle */}
        <section 
          id="daily-prayer-card"
          className="bg-[#FFFDFB] rounded-2xl p-6 border border-[#E7DECE] shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border transition-colors ${
                  prayerTime === 'morning'
                    ? 'bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]'
                    : 'bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]'
                }`}>
                  {prayerTime === 'morning' ? <Sun className="w-4 h-4 text-[#B45309]" /> : <Moon className="w-4 h-4 text-[#6D28D9]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-cinzel text-base font-bold text-[#2D2115]">
                      Daily Prayer
                    </h2>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      prayerTime === 'morning'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        : 'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]'
                    }`}>
                      {prayerTime === 'morning' ? 'Morning Devotion' : 'Evening Devotion'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7662]">
                    {prayerTime === 'morning' 
                      ? 'Begin the day in God\'s presence & peace' 
                      : 'Rest peacefully under God\'s protection'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Morning Prayer Reminder Quick Status Toggle (when Morning Prayers is active) */}
                {prayerTime === 'morning' && (
                  <MorningReminderControl 
                    isCompact={true} 
                    onSelectMorningPrayer={() => handleShiftSequence('morning')} 
                  />
                )}

                {/* Language Switcher for Prayer Audio */}
                <div className="flex items-center gap-1 bg-[#F4EDE2] p-1 rounded-xl border border-[#E3D6C3] text-xs">
                  <button
                    type="button"
                    onClick={() => setPrayerAudioLang('en')}
                    className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      prayerAudioLang === 'en'
                        ? 'bg-white text-[#B45309] shadow-2xs font-black'
                        : 'text-[#8C7662] hover:text-[#5C3E1B]'
                    }`}
                    title="Recite prayer in English"
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrayerAudioLang('el')}
                    className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      prayerAudioLang === 'el'
                        ? 'bg-[#0284C7] text-white shadow-2xs font-black'
                        : 'text-[#8C7662] hover:text-[#5C3E1B]'
                    }`}
                    title="Recite prayer in Greek (Ελληνικά)"
                  >
                    🇬🇷 EL
                  </button>
                </div>

                {/* Audio Listen Button for Active Prayer */}
                <button
                  id="listen-prayer-audio-btn"
                  onClick={handleTogglePrayerAudio}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                    isPlayingAudio && activeAudioMode === 'prayer'
                      ? 'bg-[#B45309] text-white animate-pulse'
                      : 'bg-[#FAF4EA] hover:bg-[#F3E7D3] text-[#7C5A32] border border-[#EADBCA]'
                  }`}
                  title={`Listen to today's ${prayerTime} prayer in ${prayerAudioLang === 'el' ? 'Greek' : 'English'}`}
                >
                  {isPlayingAudio && activeAudioMode === 'prayer' ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Listen ({prayerAudioLang.toUpperCase()})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Children's Prayer Dashboard & Voice Profiles Shortcut */}
            {onNavigateToPrayers && (
              <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 via-sky-50 to-amber-50 rounded-2xl border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-lg shadow-2xs shrink-0">
                    🎙️
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-purple-950">
                      Children’s Prayer Dashboard & 3 Voice Profiles
                    </h4>
                    <p className="text-[11px] text-purple-800 leading-tight">
                      Recite The Lord’s Prayer & Our Father in English & Greek with Sophia, Yiannis & Nikos!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToPrayers}
                  className="px-3.5 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Open Prayer Dashboard →
                </button>
              </div>
            )}

            {/* Simple Toggle Switch between Morning Prayers and Evening Prayers */}
            <div className="mb-4">
              <div 
                id="prayer-time-toggle"
                role="group"
                aria-label="Toggle between Morning and Evening prayers"
                className="inline-flex p-1 bg-[#F4EDE2] rounded-xl border border-[#E3D6C3] shadow-inner w-full sm:w-auto"
              >
                <button
                  id="toggle-morning-prayer-btn"
                  type="button"
                  onClick={() => handleShiftSequence('morning')}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    prayerTime === 'morning'
                      ? 'bg-white text-[#B45309] shadow-xs border border-[#E8D9C5]'
                      : 'text-[#7C5A32] hover:text-[#4A3215] hover:bg-white/40'
                  }`}
                  aria-pressed={prayerTime === 'morning'}
                >
                  <Sun className={`w-3.5 h-3.5 ${prayerTime === 'morning' ? 'text-[#D97706]' : 'text-[#9A7D60]'}`} />
                  <span>Morning Prayers</span>
                </button>

                <button
                  id="toggle-evening-prayer-btn"
                  type="button"
                  onClick={() => handleShiftSequence('evening')}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    prayerTime === 'evening'
                      ? 'bg-white text-[#6D28D9] shadow-xs border border-[#DDD6FE]'
                      : 'text-[#7C5A32] hover:text-[#4A3215] hover:bg-white/40'
                  }`}
                  aria-pressed={prayerTime === 'evening'}
                >
                  <Moon className={`w-3.5 h-3.5 ${prayerTime === 'evening' ? 'text-[#7C3AED]' : 'text-[#9A7D60]'}`} />
                  <span>Evening Prayers</span>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-xl border mb-4 transition-colors ${
              prayerTime === 'morning'
                ? 'bg-[#FAF7F2] border-[#EFE8DC]'
                : 'bg-[#F9F7FD] border-[#ECE5F8]'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${
                  prayerTime === 'morning' ? 'text-[#8C5D2C]' : 'text-[#5B21B6]'
                }`}>
                  {activePrayer.title}
                </h3>
                <span className="text-[10px] text-[#8C7662] italic font-serif">
                  {prayerTime === 'morning' ? 'Rising from sleep' : 'Before resting'}
                </span>
              </div>
              <p className={`text-[#33261A] font-reading leading-relaxed whitespace-pre-line ${
                isLargeText ? 'text-lg leading-loose' : 'text-base'
              }`}>
                {activePrayer.text}
              </p>
            </div>

            {activePrayer.kidFriendlyNote && (
              <div className="flex items-start gap-2 bg-[#F3F7F2] rounded-xl p-3 border border-[#DCE7DA] text-xs text-[#2F522C]">
                <Heart className="w-4 h-4 shrink-0 text-[#16A34A] mt-0.5" />
                <div>
                  <span className="font-bold">Child-Friendly Meaning: </span>
                  <span>{activePrayer.kidFriendlyNote}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0E9DF] flex items-center justify-between text-xs text-[#8A7766]">
            <span>
              {prayerTime === 'morning' 
                ? 'Begin your day with the Sign of the Cross' 
                : 'Cross yourself before closing your eyes'}
            </span>
            <span className="font-medium text-[#B8860B]">
              {prayerTime === 'morning' ? '"Glory to God for all things"' : '"Lord have mercy"'}
            </span>
          </div>

          {onNavigateToPrayers && (
            <div className="mt-3 pt-2.5 border-t border-[#F0E9DF] flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={onNavigateToPrayers}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Lord’s Prayer & Children’s Prayer Garden →</span>
              </button>
              <button
                type="button"
                onClick={onNavigateToPrayers}
                className="text-xs font-extrabold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-xl border border-purple-200 flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>Enter My Heart’s Prayer</span>
              </button>
            </div>
          )}
        </section>

        {/* Card 2: Daily Scripture / Orthodox Reading */}
        <section 
          id="daily-scripture-card"
          className="bg-[#FFFDFB] rounded-2xl p-6 border border-[#E7DECE] shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border transition-colors ${
                  prayerTime === 'morning'
                    ? 'bg-[#EBF2FA] text-[#1B365D] border-[#CFE1F5]'
                    : 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]'
                }`}>
                  <BookOpen className={`w-4 h-4 ${prayerTime === 'morning' ? 'text-[#1B365D]' : 'text-[#6B21A8]'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-cinzel text-base font-bold text-[#2D2115]">
                      Daily Reading
                    </h2>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors ${
                      prayerTime === 'morning'
                        ? 'bg-[#EDF3FA] text-[#1D4E89] border-[#D2E2F5]'
                        : 'bg-[#FAF5FF] text-[#6B21A8] border-[#E9D5FF]'
                    }`}>
                      {prayerTime === 'morning' ? '☀️ Morning Reading' : '🌙 Evening Reading'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7662]">
                    {activeReading.passageRef}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Switcher for Scripture Audio */}
                <div className="flex items-center gap-1 bg-[#F0F4F8] p-1 rounded-xl border border-[#D5E0EA] text-xs">
                  <button
                    type="button"
                    onClick={() => setScriptureAudioLang('en')}
                    className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      scriptureAudioLang === 'en'
                        ? 'bg-white text-[#1B365D] shadow-2xs font-black'
                        : 'text-[#64748B] hover:text-[#1E293B]'
                    }`}
                    title="Listen to scripture reading in English"
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setScriptureAudioLang('el')}
                    className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      scriptureAudioLang === 'el'
                        ? 'bg-[#0284C7] text-white shadow-2xs font-black'
                        : 'text-[#64748B] hover:text-[#1E293B]'
                    }`}
                    title="Listen to scripture reading in Greek (Ελληνικά)"
                  >
                    🇬🇷 EL
                  </button>
                </div>

                {/* Text-to-Speech Play Button for Scripture Readings */}
                <button
                  id="listen-scripture-audio-btn"
                  onClick={handleToggleScriptureAudio}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                    isPlayingAudio && activeAudioMode === 'scripture'
                      ? prayerTime === 'morning'
                        ? 'bg-[#1B365D] text-white animate-pulse'
                        : 'bg-[#6B21A8] text-white animate-pulse'
                      : prayerTime === 'morning'
                        ? 'bg-[#EBF2FA] hover:bg-[#D9E7F7] text-[#1B365D] border border-[#CFE1F5]'
                        : 'bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#6B21A8] border border-[#DDD6FE]'
                  }`}
                  title={`Listen to today's ${prayerTime} Scripture reading in ${scriptureAudioLang === 'el' ? 'Greek' : 'English'}`}
                >
                  {isPlayingAudio && activeAudioMode === 'scripture' ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className={`w-3.5 h-3.5 ${prayerTime === 'morning' ? 'text-[#1B365D]' : 'text-[#6B21A8]'}`} />
                      <span>Listen ({scriptureAudioLang.toUpperCase()})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={`rounded-xl p-4 border mb-4 transition-colors ${
              prayerTime === 'morning'
                ? 'bg-[#FAF7F2] border-[#EFE8DC]'
                : 'bg-[#FAF7FD] border-[#EFE6FA]'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${
                  prayerTime === 'morning' ? 'text-[#1B365D]' : 'text-[#6B21A8]'
                }`}>
                  {activeReading.readingTitle}
                </h3>
                <span className="text-[10px] text-[#8C7662] italic font-serif">
                  {prayerTime === 'morning' ? 'Gospel & Epistles' : 'Vespers & Peace'}
                </span>
              </div>
              <p className={`text-[#33261A] font-reading leading-relaxed italic ${
                isLargeText ? 'text-lg leading-loose' : 'text-base'
              }`}>
                "{activeReading.text}"
              </p>
            </div>

            <div className={`rounded-xl p-3 border text-xs transition-colors ${
              prayerTime === 'morning'
                ? 'bg-[#FFF9EE] border-[#F5E6CC] text-[#6B4E1B]'
                : 'bg-[#FBF8FF] border-[#EADBFA] text-[#581C87]'
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className={`w-3.5 h-3.5 ${prayerTime === 'morning' ? 'text-[#D97706]' : 'text-[#7C3AED]'}`} />
                <span>What This Means For Our Family ({prayerTime === 'morning' ? 'Morning Focus' : 'Evening Reflection'}):</span>
              </div>
              <p className={isLargeText ? 'text-sm' : 'text-xs'}>
                {activeReading.reflection}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0E9DF] flex items-center justify-between text-xs text-[#8A7766]">
            <span>
              {prayerTime === 'morning' 
                ? 'Words of Life for the Day Ahead' 
                : 'Words of Peace for Restful Sleep'}
            </span>
            <span className={`font-semibold ${prayerTime === 'morning' ? 'text-[#1B365D]' : 'text-[#6B21A8]'}`}>
              Orthodox {prayerTime === 'morning' ? 'Morning' : 'Evening'} Reading
            </span>
          </div>
        </section>
      </div>

      {/* Interactive 'Question of the Day' Section (Directly Beneath Reading) */}
      <QuestionOfTheDaySection
        questionData={dayData.questionOfTheDay}
        saint={dayData.saintOfTheDay}
        scripture={activeReading}
        dateString={dayData.dateString}
        isLargeText={isLargeText}
        onReadQuestionAudio={handleToggleQuestionAudio}
        isAudioSpeaking={isPlayingAudio && activeAudioMode === 'question'}
      />

      {/* Card 3: Saint, Feast & Learning Section (Linked to Saint of the Day) */}
      <section 
        id="daily-learning-card"
        className={`bg-[#FFFDFB] rounded-2xl p-6 border-2 shadow-sm relative overflow-hidden transition-all duration-500 ${
          isLearningHighlighted 
            ? 'border-[#D4AF37] ring-4 ring-[#FDE047] shadow-xl bg-[#FFFDF5]' 
            : 'border-[#E8D4B0]'
        }`}
      >
        {/* Linked Anchor Notice */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A8A] bg-[#EFF6FF] px-3 py-1 rounded-lg border border-[#BFDBFE] w-fit mb-3">
          <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Linked to Today's Saint of the Day: <strong>{dayData.saintOfTheDay.name}</strong></span>
        </div>

        {/* Top Featured Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center font-bold shadow-xs">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg font-bold text-[#2D2115]">
                  Saint & Faith Learning
                </h2>
                {dayData.learning.isFeaturedPdfSaint && (
                  <span className="text-[10px] font-bold bg-[#6D28D9] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    ★ Featured Saint
                  </span>
                )}
              </div>
              <p className="text-xs text-[#826953]">
                Commemorated on {dayData.learning.feastDateText}
              </p>
            </div>
          </div>

          <button
            id="browse-all-saints-btn"
            onClick={onOpenSaintsGallery}
            className="text-xs text-[#8B5A2B] hover:text-[#573514] font-bold flex items-center gap-1 bg-[#FAF2E6] hover:bg-[#F2E5D0] px-3 py-1.5 rounded-lg border border-[#E5D2B8] transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Explore All 18 Saints</span>
          </button>
        </div>

        {/* Big Golden Motto Ribbon (Directly inspired by the PDF posters!) */}
        <div className="bg-gradient-to-r from-[#3B1F70] via-[#4C1D95] to-[#3B1F70] rounded-xl p-4 text-center border-2 border-[#FDE047] shadow-md my-4">
          <div className="text-[11px] font-bold tracking-widest text-[#DDD6FE] uppercase mb-1">
            + Daily Faith Motto +
          </div>
          <div className="font-cinzel text-lg sm:text-2xl font-extrabold text-[#FDE047] tracking-wider drop-shadow-sm">
            {dayData.learning.moralMotto}
          </div>
          <div className="text-xs font-semibold text-[#E9D5FF] mt-1 flex items-center justify-center gap-2">
            <span>Virtue to practice today:</span>
            <span className="bg-[#6D28D9] px-2.5 py-0.5 rounded-full text-white font-bold border border-[#8B5CF6]">
              {dayData.learning.virtueBadge}
            </span>
          </div>
        </div>

        {/* Saint Life Story & Child-Friendly Teaching with Icon Accent */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="hidden sm:block shrink-0 mt-1">
              <SaintIconIllustration
                iconType={dayData.saintOfTheDay.iconType}
                name={dayData.saintOfTheDay.name}
                imageUrl={dayData.saintOfTheDay.imageUrl}
                size="md"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-base font-bold text-[#2D2115] mb-1">
                {dayData.learning.name}
              </h3>
              <p className="text-xs text-[#7A5A35] font-semibold mb-3">
                {dayData.learning.subtitle}
              </p>
              <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#ECE2D2] text-[#33261A]">
                <p className={`font-reading leading-relaxed ${
                  isLargeText ? 'text-lg leading-loose' : 'text-base'
                }`}>
                  {dayData.learning.story}
                </p>
              </div>
            </div>
          </div>

          {/* Family Deed / Action Challenge */}
          <div className="bg-[#F2F8F2] rounded-xl p-4 border border-[#D3E8D3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold text-[#14532D] uppercase tracking-wide">
                  Today’s Family Kindness Challenge:
                </span>
                <p className="text-xs text-[#1F4B23] font-medium mt-0.5">
                  {dayData.learning.familyAction}
                </p>
              </div>
            </div>

            <button
              id="complete-challenge-btn"
              onClick={() => setChallengeCompleted(!challengeCompleted)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                challengeCompleted
                  ? 'bg-[#15803D] text-white'
                  : 'bg-white hover:bg-[#E8F3E8] text-[#166534] border border-[#BDE0BD]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{challengeCompleted ? 'Challenge Done!' : 'Mark Completed'}</span>
            </button>
          </div>

          {dayData.learning.funFact && (
            <p className="text-xs text-[#7F6B56] italic">
              {dayData.learning.funFact}
            </p>
          )}
        </div>
      </section>

      {/* Card 4: Official GOARCH Connection Card */}
      <section 
        id="daily-goarch-card"
        className="bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#1D4ED8] rounded-2xl p-6 text-white shadow-md border border-[#3B82F6]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-[#3B82F6] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                Official Resource
              </span>
              <span className="text-xs text-[#93C5FD]">
                Greek Orthodox Archdiocese of America
              </span>
            </div>
            <h2 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              GOARCH Online Chapel & Daily Readings
            </h2>
            <p className="text-xs text-[#BFDBFE] max-w-xl">
              Access the official Greek Orthodox Archdiocese calendar, liturgical hymns, Gospel and Epistle pericopes, and saint lives directly on GOARCH.org.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              id="open-goarch-external-link"
              href={dayData.goarchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#FDE047] hover:bg-[#FACC15] text-[#1E3A8A] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>Open on GOARCH.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              id="view-goarch-guide-btn"
              onClick={onOpenGoarchModal}
              className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-[#60A5FA]"
            >
              GOARCH Guide
            </button>
          </div>
        </div>
      </section>

      {/* Gentle Interactive Family Features: Light a Candle & Dinner Discussion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Feature A: Light a Candle */}
        <section 
          id="light-candle-section"
          className="bg-[#FFFDFB] rounded-2xl p-5 border border-[#E7DECE] shadow-xs"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold border border-[#FDE68A]">
                <Flame className={`w-4 h-4 ${isCandleLit ? 'text-[#F59E0B] animate-pulse' : 'text-[#B45309]'}`} />
              </div>
              <div>
                <h3 className="font-cinzel text-sm font-bold text-[#2D2115]">
                  Light a Candle in Prayer
                </h3>
                <p className="text-[11px] text-[#8C7662]">
                  A sacred Orthodox tradition for prayer intentions
                </p>
              </div>
            </div>
            {isCandleLit && (
              <span className="text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full border border-[#FCD34D]">
                Candle Lit
              </span>
            )}
          </div>

          <p className="text-xs text-[#523F2C] mb-3">
            Children can tap an intention to offer a quiet prayer to God:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'family', label: 'For Family', emoji: '🏡' },
              { id: 'health', label: 'For Healing', emoji: '🌿' },
              { id: 'peace', label: 'For Peace', emoji: '🕊️' },
              { id: 'thanks', label: 'Giving Thanks', emoji: '✨' }
            ].map(item => (
              <button
                key={item.id}
                id={`light-candle-${item.id}-btn`}
                onClick={() => handleLightCandle(item.id as any)}
                className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                  isCandleLit && candleIntention === item.id
                    ? 'bg-[#FEF9C3] border-[#EAB308] text-[#854D0E] shadow-sm'
                    : 'bg-[#FAF7F2] hover:bg-[#F3EDE2] border-[#EADFCF] text-[#4A3723]'
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                <span className="text-[11px]">{item.label}</span>
              </button>
            ))}
          </div>

          {candleFeedback && (
            <div className="mt-3 p-2.5 bg-[#FEFCE8] border border-[#FEF08A] rounded-xl text-xs text-[#854D0E] text-center font-medium animate-fadeIn">
              🕯️ Your candle has been lit in prayer. "Lord Jesus Christ, hear our humble prayer."
            </div>
          )}
        </section>

        {/* Feature B: Family Bedtime / Dinner Discussion */}
        <section 
          id="family-discussion-section"
          className="bg-[#FFFDFB] rounded-2xl p-5 border border-[#E7DECE] shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center font-bold border border-[#E9D5FF]">
                <MessageCircle className="w-4 h-4 text-[#7E22CE]" />
              </div>
              <div>
                <h3 className="font-cinzel text-sm font-bold text-[#2D2115]">
                  Family Table Talk
                </h3>
                <p className="text-[11px] text-[#8C7662]">
                  Gentle question for dinner or bedtime
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EFE8DC]">
              <p className="text-xs font-semibold text-[#2D2115] italic">
                "{dayData.learning.moralMotto.toLowerCase()}"
              </p>
              <p className="text-xs text-[#5C452D] mt-1">
                "What was one moment today where you saw someone being kind or helpful? How can we thank God for that person?"
              </p>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-[#8C7662] flex items-center justify-between">
            <span>Sharing faith builds strong families</span>
            <span className="text-[#8B5A2B] font-medium">Orthodox Family Life</span>
          </div>
        </section>
      </div>

      {/* Voice Selection & Audio Settings Modal */}
      {isVoiceModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsVoiceModalOpen(false)}
        >
          <div 
            className="bg-[#FFFDFB] rounded-2xl max-w-lg w-full p-6 border-2 border-[#D4AF37] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EEDFCB] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#B45309] flex items-center justify-center border border-[#FCD34D] shadow-xs">
                  <span className="font-bold text-base">⛪</span>
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#2D2115]">
                    Church Audio &amp; Reading Settings
                  </h3>
                  <p className="text-xs text-[#84684E]">
                    Soothing liturgical cadence, church bells, and reverent tone
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVoiceModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8C7662] hover:bg-[#F4ECE0] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sacred Church Sound Explanatory Banner */}
            <div className="bg-[#FAF6EE] rounded-xl p-3.5 border border-[#E8DCBF] text-xs text-[#6B5034] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#8C5D19]">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Soothing Church Liturgical Cadence</span>
              </div>
              <p className="leading-relaxed">
                Prayers and Holy Scripture are paced at an unhurried, peaceful tempo (0.84x) with natural breath pauses after liturgical phrases, evoking the reverent ambiance of an Orthodox sanctuary.
              </p>
            </div>

            {/* Church Sanctuary Bell Prelude Toggle */}
            <div className="bg-[#FFF9ED] rounded-xl p-3 border border-[#EADBB8] flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center border border-[#FDE68A] shrink-0">
                  <Bell className="w-4 h-4 text-[#B45309]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D2115] block">
                    Sanctuary Cathedral Bell Prelude
                  </span>
                  <span className="text-[11px] text-[#7C654F]">
                    Rings a gentle Orthodox church bell chime before devotions
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playChurchBellPrelude}
                  onChange={(e) => setPlayChurchBellPrelude(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D8CCB8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309] shadow-inner"></div>
              </label>
            </div>

            {/* Reading Cadence / Speed selection */}
            <div>
              <label className="block text-xs font-bold text-[#423120] uppercase tracking-wider mb-2">
                Reading Cadence &amp; Pace
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: '⛪ Church (0.84x)', rate: 0.84, desc: 'Reverent & soothing' },
                  { label: '🕊️ Meditative (0.80x)', rate: 0.80, desc: 'Quiet & peaceful' },
                  { label: '📖 Story (0.90x)', rate: 0.90, desc: 'Family listening' },
                  { label: '⏱️ Standard (0.98x)', rate: 0.98, desc: 'Crisp tempo' }
                ].map((item) => (
                  <button
                    key={item.rate}
                    onClick={() => setSpeechRate(item.rate)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      speechRate === item.rate
                        ? 'border-[#B45309] bg-[#FFF8EE] ring-2 ring-[#F59E0B]'
                        : 'border-[#E5D7C2] bg-[#FAF8F5] hover:bg-[#F3ECE2]'
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#2D2115]">{item.label}</span>
                    <span className="block text-[10px] text-[#7A624A] mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Warmth & Acoustic Pitch */}
            <div>
              <label className="block text-xs font-bold text-[#423120] uppercase tracking-wider mb-2">
                Acoustic Warmth &amp; Resonance
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSpeechPitch(0.95)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    speechPitch === 0.95
                      ? 'border-[#B45309] bg-[#FFF8EE] ring-2 ring-[#F59E0B]'
                      : 'border-[#E5D7C2] bg-[#FAF8F5] hover:bg-[#F3ECE2]'
                  }`}
                >
                  <span className="block text-xs font-bold text-[#2D2115]">🕊️ Soothing Sanctuary (0.95)</span>
                  <span className="block text-[10px] text-[#7A624A] mt-0.5">Deeper, calm resonance without shrillness</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechPitch(1.0)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    speechPitch === 1.0
                      ? 'border-[#B45309] bg-[#FFF8EE] ring-2 ring-[#F59E0B]'
                      : 'border-[#E5D7C2] bg-[#FAF8F5] hover:bg-[#F3ECE2]'
                  }`}
                >
                  <span className="block text-xs font-bold text-[#2D2115]">Direct Natural (1.00)</span>
                  <span className="block text-[10px] text-[#7A624A] mt-0.5">Standard voice synthesizer pitch</span>
                </button>
              </div>
            </div>

            {/* Prayer Companion Voice Profiles (Top Priority - Never a computer voice) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#423120] uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎙️ Prayer Companion Voices</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    First Choice • Authentic
                  </span>
                </label>
                <span className="text-[11px] text-[#8C7662]">
                  Active: {VOICE_PROFILES[audioEngineState.activeProfileId]?.name || 'Father Paisios'}
                </span>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {Object.values(VOICE_PROFILES).map((profile) => {
                  const isSelected = audioEngineState.activeProfileId === profile.id;
                  const isSpeakingPreview =
                    audioEngineState.isPlaying &&
                    audioEngineState.activePrayerId === `preview-${profile.id}`;

                  return (
                    <div
                      key={profile.id}
                      onClick={() => audioEngine.setProfile(profile.id as VoiceProfileId)}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer gap-2 ${
                        isSelected
                          ? 'border-[#B45309] bg-[#FFFBF2] ring-2 ring-[#F59E0B]/50 shadow-sm'
                          : 'border-[#EBE2D3] bg-[#FCFBF9] hover:bg-[#F6EFE5]'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E0CFB5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                          {profile.avatarEmoji}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-[#2D2115]">{profile.name}</span>
                            {profile.id === 'byzantine' && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-2 py-0.2 rounded-full border border-amber-300">
                                ★ Default Choice
                              </span>
                            )}
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${profile.pastelTheme.badgeBg}`}>
                              {profile.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#7A624A] mt-0.5 leading-snug">
                            {profile.title} • <span className="font-serif italic">{profile.greekName}</span>
                          </p>
                          <p className="text-[10px] text-[#9A8168] mt-0.5 line-clamp-1">
                            {profile.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#F0E4D2]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            audioEngine.previewVoice(profile.id as VoiceProfileId, 'en');
                          }}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                            isSpeakingPreview
                              ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                              : 'bg-[#FAF1E3] hover:bg-[#F2E1C7] text-[#7C4A1E] border-[#E0CFB5]'
                          }`}
                          title="Listen to authentic sample quote"
                        >
                          {isSpeakingPreview ? (
                            <>
                              <Volume2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Speaking...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-[#9A5B18] fill-current" />
                              <span>Hear Sample</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => audioEngine.setProfile(profile.id as VoiceProfileId)}
                          className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#B45309] text-white shadow-2xs'
                              : 'bg-white hover:bg-[#FAF1E3] text-[#7C4A1E] border border-[#DECEB6]'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : 'Choose'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-2 border-t border-[#EEDFCB] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => playGentleBellChime('church-bell')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#8C5A26] bg-[#FAF4EA] hover:bg-[#F2E5D0] border border-[#DECEB6] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Test Sanctuary Bell</span>
              </button>

              <button
                onClick={() => setIsVoiceModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B45309] hover:bg-[#92400E] text-white transition-colors cursor-pointer shadow-xs"
              >
                Save &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
