export interface FastingRule {
  rule: 'fast_free' | 'wine_oil' | 'fish_wine_oil' | 'strict_fast' | 'cheese_fare';
  badgeLabel: string;
  familyExplanation: string;
}

export interface DailyPrayer {
  title: string;
  text: string;
  kidFriendlyNote?: string;
  authorOrContext?: string;
}

export interface ScriptureReading {
  passageRef: string;
  readingTitle: string;
  text: string;
  reflection: string;
}

export interface SaintOfTheDay {
  id: string;
  name: string;
  title: string;
  feastDateText: string;
  shortBio: string; // 2-3 child-friendly sentences as requested
  iconType: 
    | 'bishop'
    | 'great_martyr_soldier'
    | 'woman_martyr'
    | 'apostle_evangelist'
    | 'archangel'
    | 'healer_unmercenary'
    | 'monk_venerable'
    | 'righteous_ancestor'
    | 'holy_cross_feast'
    | 'prophet'
    | 'deacon';
  iconSymbol?: string;
  imageUrl?: string;
  virtue: string;
  moralMotto: string;
  greekName?: string;
  familyAction?: string;
  isFeaturedPdf?: boolean;
  liturgicalColorName?: string;
  liturgicalColorHex?: string;
  iconSymbolism?: string;
  hymnApolytikion?: {
    tone: string;
    title: string;
    englishLyrics: string;
  };
  nameDayTradition?: string;
}

export interface QuestionOfTheDay {
  mainQuestion: string;
  sourceContext: string; // e.g. "Inspired by Saint Nicholas's life" or "Inspired by the Holy Gospel reading"
  basedOn: 'saint' | 'scripture';
  childPrompt: string; // For little ones (ages 4-8)
  olderKidPrompt: string; // For growing children & teens (ages 9-14)
  parentPrompt: string; // For parents & family discussion
  suggestedVirtue: string;
  practicalActionIdea: string;
}

export interface SaintOrFeastLearning {
  name: string;
  subtitle: string;
  feastDateText: string;
  moralMotto: string; // e.g. "God teaches us to give with joy!"
  virtueBadge: string; // e.g. "Generosity & Kindness"
  story: string;
  familyAction: string;
  funFact?: string;
  isFeaturedPdfSaint?: boolean;
}

export interface OrthodoxDayData {
  dateString: string; // YYYY-MM-DD
  dayName: string; // e.g. "Friday"
  formattedDate: string; // e.g. "September 19, 2026"
  tone: string; // e.g. "Tone 3"
  commemoration: string;
  fasting: FastingRule;
  prayer: DailyPrayer;
  morningPrayer?: DailyPrayer;
  eveningPrayer?: DailyPrayer;
  scripture: ScriptureReading;
  morningScripture?: ScriptureReading;
  eveningScripture?: ScriptureReading;
  morningReading?: ScriptureReading;
  eveningReading?: ScriptureReading;
  saintOfTheDay: SaintOfTheDay;
  questionOfTheDay: QuestionOfTheDay;
  learning: SaintOrFeastLearning;
  goarchUrl: string;
}

export interface HolyWeekDay {
  id: string;
  dayTitle: string;
  subtitle: string;
  theme: string;
  servicesSummary: string;
  hymn: {
    title: string;
    lyrics: string;
    phoneticGreek?: string;
    meaning: string;
  };
  scriptureSummary: {
    reference: string;
    text: string;
    kidExplanation: string;
  };
  kidStory: string;
  familyTradition: string;
  specialPrayer: string;
  iconSymbol: string;
  colorTone: 'purple' | 'black' | 'gold' | 'white';
}
