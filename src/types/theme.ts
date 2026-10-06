export type BackgroundThemeId = 'parchment' | 'twilight' | 'aegean' | 'olive' | 'candlelight';

export interface BackgroundTheme {
  id: BackgroundThemeId;
  name: string;
  greekName: string;
  emoji: string;
  description: string;
  timeOfDayHint: string;
  previewBg: string;
  previewBorder: string;
  bodyBgClass: string;
  surfaceClass: string;
  cardBgClass: string;
  borderClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  accentColor: string;
  headerBorderClass: string;
  footerBgClass: string;
}

export const BACKGROUND_THEMES: Record<BackgroundThemeId, BackgroundTheme> = {
  parchment: {
    id: 'parchment',
    name: 'Byzantine Gold',
    greekName: 'Βυζαντινό Χρυσό',
    emoji: '🏛️',
    description: 'Reverent gold and ancient Byzantine parchment tones for sacred devotion.',
    timeOfDayHint: 'All Day • Traditional',
    previewBg: 'bg-[#FAF7F2]',
    previewBorder: 'border-[#D4AF37]',
    bodyBgClass: 'bg-[#FAF7F2]',
    surfaceClass: 'bg-[#FFFDFB]',
    cardBgClass: 'bg-[#FFFDFB] border-[#E8DCCB]',
    borderClass: 'border-[#EADBCA]',
    textPrimaryClass: 'text-[#2D2115]',
    textSecondaryClass: 'text-[#7A634E]',
    accentColor: '#D4AF37',
    headerBorderClass: 'border-[#483522]',
    footerBgClass: 'bg-[#FAF4EA]',
  },
  twilight: {
    id: 'twilight',
    name: 'Twilight Vigil',
    greekName: 'Εσπερινή Γαλήνη',
    emoji: '🌌',
    description: 'Calming lavender dusk and restful starlit sky for peaceful evening prayer.',
    timeOfDayHint: 'Evening & Bedtime',
    previewBg: 'bg-[#F5F3FF]',
    previewBorder: 'border-[#8B5CF6]',
    bodyBgClass: 'bg-[#F5F3FF]',
    surfaceClass: 'bg-[#FAF8FF]',
    cardBgClass: 'bg-[#FAF8FF] border-[#DDD6FE]',
    borderClass: 'border-[#DDD6FE]',
    textPrimaryClass: 'text-[#1E1B4B]',
    textSecondaryClass: 'text-[#5B21B6]/80',
    accentColor: '#8B5CF6',
    headerBorderClass: 'border-[#4C1D95]',
    footerBgClass: 'bg-[#EDE9FE]',
  },
  aegean: {
    id: 'aegean',
    name: 'Aegean Blue',
    greekName: 'Αιγαιοπελαγίτικο Μπλε',
    emoji: '🌊',
    description: 'Luminous Greek island whitewash & crystal Aegean sea blue for clear morning energy.',
    timeOfDayHint: 'Bright Morning',
    previewBg: 'bg-[#F0F9FF]',
    previewBorder: 'border-[#0284C7]',
    bodyBgClass: 'bg-[#F0F9FF]',
    surfaceClass: 'bg-[#F8FCFF]',
    cardBgClass: 'bg-[#F8FCFF] border-[#BAE6FD]',
    borderClass: 'border-[#BAE6FD]',
    textPrimaryClass: 'text-[#082F49]',
    textSecondaryClass: 'text-[#0369A1]',
    accentColor: '#0284C7',
    headerBorderClass: 'border-[#0369A1]',
    footerBgClass: 'bg-[#E0F2FE]',
  },
  olive: {
    id: 'olive',
    name: 'Monastery Olive',
    greekName: 'Ελαιώνας Μονής',
    emoji: '🌿',
    description: 'Tranquil olive leaves and serene mountain monastery gardens for deep focus.',
    timeOfDayHint: 'Quiet Reflection',
    previewBg: 'bg-[#F2F8F3]',
    previewBorder: 'border-[#16A34A]',
    bodyBgClass: 'bg-[#F2F8F3]',
    surfaceClass: 'bg-[#F9FCF9]',
    cardBgClass: 'bg-[#F9FCF9] border-[#BBF7D0]',
    borderClass: 'border-[#BBF7D0]',
    textPrimaryClass: 'text-[#14532D]',
    textSecondaryClass: 'text-[#166534]',
    accentColor: '#16A34A',
    headerBorderClass: 'border-[#15803D]',
    footerBgClass: 'bg-[#DCFCE7]/70',
  },
  candlelight: {
    id: 'candlelight',
    name: 'Candlelight Chapel',
    greekName: 'Φως Καντηλιού',
    emoji: '🕯️',
    description: 'Gentle golden vigil lamp glow and comforting honey amber for bedtime peace.',
    timeOfDayHint: 'Cozy Bedtime',
    previewBg: 'bg-[#FFFDF5]',
    previewBorder: 'border-[#D97706]',
    bodyBgClass: 'bg-[#FFFDF5]',
    surfaceClass: 'bg-[#FFFDF8]',
    cardBgClass: 'bg-[#FFFDF8] border-[#FDE68A]',
    borderClass: 'border-[#FDE68A]',
    textPrimaryClass: 'text-[#451A03]',
    textSecondaryClass: 'text-[#92400E]',
    accentColor: '#D97706',
    headerBorderClass: 'border-[#B45309]',
    footerBgClass: 'bg-[#FEF3C7]/70',
  },
};
