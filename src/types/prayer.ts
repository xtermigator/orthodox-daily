export type VoiceProfileId = 'storyteller' | 'greek' | 'child' | 'byzantine';

export type SpeechPacingMode = 'slow' | 'calm' | 'natural'; // 0.75x, 0.85x, 1.0x

export interface VoiceProfile {
  id: VoiceProfileId;
  name: string;
  greekName: string;
  title: string;
  avatarEmoji: string;
  badge: string;
  persona: string;
  description: string;
  accentNote: string;
  previewSampleEn: string;
  previewSampleEl: string;
  speechRate: number;
  speechPitch: number;
  geminiVoice: string;
  stylePrompt: string;
  pastelTheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    glowRing: string;
  };
}

export interface PrayerVerse {
  id: string;
  verseNumber: number;
  english: string;
  greek: string;
  greekPhonetic: string;
  kidMeaning: string;
}

export interface VocabularyExplorer {
  greekWord: string;
  greekAlphabet: string;
  phonetic: string;
  englishMeaning: string;
  childNote: string;
  emoji: string;
}

export interface ChildPrayer {
  id: string;
  titleEn: string;
  titleEl: string;
  subtitle: string;
  category: 'core' | 'morning' | 'evening' | 'protection' | 'short';
  badge: string;
  iconType: 'dove' | 'cross' | 'sun' | 'angel' | 'heart' | 'moon';
  pastelTheme: {
    cardBg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    accentColor: string;
    audioBarBg: string;
    highlightBg: string;
  };
  verses: PrayerVerse[];
  fullTextEn: string;
  fullTextEl: string;
  fullPhoneticEl: string;
  kidTakeaway: string;
  liturgicalNote?: string;
  vocabularyExplorers?: VocabularyExplorer[];
}
