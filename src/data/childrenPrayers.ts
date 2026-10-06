import { ChildPrayer, VoiceProfile } from '../types/prayer';

export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  byzantine: {
    id: 'byzantine',
    name: 'Father Paisios',
    greekName: 'Πατήρ Παΐσιος',
    title: 'Monastic Cantor Voice',
    avatarEmoji: '🕯️',
    badge: 'Liturgical & Clear',
    persona: 'A reverent monastic voice with calm, deep, crystal-clear liturgical cadence and Byzantine warmth.',
    description: 'Slow, peaceful, and wonderfully articulated. Ideal for learning sacred prayers and hymns with distinct diction.',
    accentNote: 'Deep, steady, reverent Byzantine cadence with crystal-clear enunciation.',
    previewSampleEn: 'Lord Jesus Christ, Son of God, fill our home and hearts with heavenly peace, light, and thankful praise.',
    previewSampleEl: 'Κύριε Ἰησοῦ Χριστέ, Υἱὲ τοῦ Θεοῦ, ἐλέησόν με τὸν ἁμαρτωλόν. Εἰρήνη πᾶσι καὶ δόξα τῷ Θεῷ.',
    speechRate: 0.80,
    speechPitch: 0.88,
    geminiVoice: 'Fenrir',
    stylePrompt: 'A deep, reverent, crystal-clear liturgical Orthodox monastic chant voice, peaceful, steady pacing, distinct consonants and vowels, calming cathedral warmth.',
    pastelTheme: {
      bg: 'bg-emerald-50 hover:bg-emerald-100/70',
      border: 'border-emerald-200',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      glowRing: 'ring-emerald-300',
    },
  },
  storyteller: {
    id: 'storyteller',
    name: 'Storyteller Sophia',
    greekName: 'Σοφία η Παραμυθού',
    title: 'Soothing Storyteller',
    avatarEmoji: '🦉',
    badge: 'Bedtime & Calming',
    persona: 'A soothing, authentic voice for storytelling and peaceful family devotions.',
    description: 'Nurturing, reverent, and gentle cadence. Perfect for calming young minds and evening prayer time.',
    accentNote: 'Warm, maternal pacing with soothing pauses after holy verses.',
    previewSampleEn: 'Hello little one. Take a deep, peaceful breath. Let us pray together with love in our hearts.',
    previewSampleEl: 'Γεια σου μικρό μου παιδί. Ας προσευχηθούμε μαζί με γαλήνη και αγάπη στην καρδιά μας.',
    speechRate: 0.84,
    speechPitch: 0.95,
    geminiVoice: 'Kore',
    stylePrompt: 'A soothing, warm, maternal storyteller for young children, authentic, gentle, peaceful, reverent cadence with soft breath pauses.',
    pastelTheme: {
      bg: 'bg-purple-50 hover:bg-purple-100/70',
      border: 'border-purple-200',
      text: 'text-purple-900',
      badgeBg: 'bg-purple-100 text-purple-800',
      badgeText: 'text-purple-700',
      glowRing: 'ring-purple-300',
    },
  },
  greek: {
    id: 'greek',
    name: 'Elder Yiannis',
    greekName: 'Παππούς Γιάννης',
    title: 'Greek Accent Voice',
    avatarEmoji: '🌿',
    badge: 'Authentic Accent',
    persona: 'A warm voice with an authentic Greek accent, bringing the heritage of the Orthodox Church to life.',
    description: 'Rich, melodic Greek inflection. Inspires children with authentic pronunciation of Greek prayers and sacred heritage.',
    accentNote: 'Authentic Greek cadence with soft consonants and reverent Byzantine warmth.',
    previewSampleEn: 'Blessings, my dear child! In our church, we speak to God like a loving Father. Let us recite together!',
    previewSampleEl: 'Ευλογίες, αγαπητό μου παιδί! Ας ενώσουμε τις καρδιές μας στον Κύριο με χαρά και προσευχή.',
    speechRate: 0.86,
    speechPitch: 0.92,
    geminiVoice: 'Charon',
    stylePrompt: 'A warm authentic Greek Orthodox accent speaking reverently with melodic Greek liturgical cadence, gentle grandfatherly wisdom.',
    pastelTheme: {
      bg: 'bg-sky-50 hover:bg-sky-100/70',
      border: 'border-sky-200',
      text: 'text-sky-950',
      badgeBg: 'bg-sky-100 text-sky-800',
      badgeText: 'text-sky-700',
      glowRing: 'ring-sky-300',
    },
  },
  child: {
    id: 'child',
    name: 'Little Nikos',
    greekName: 'Ο μικρός Νίκος',
    title: 'Young Child Voice',
    avatarEmoji: '🌟',
    badge: 'Kid Peer Friend',
    persona: 'A bright, cheerful young child voice for peer-to-peer interaction and learning together.',
    description: 'High-energy and sweet peer voice. Makes learning prayers feel like reciting alongside a best friend in Sunday school.',
    accentNote: 'Bright, youthful pitch with encouraging friend-to-friend warmth.',
    previewSampleEn: 'Hi! I am Nikos! I am practicing my prayers too. Let us say each line together, okay?',
    previewSampleEl: 'Γεια σου! Είμαι ο Νίκος! Έλα να πούμε την προσευχή παρέα, γραμμή προς γραμμή!',
    speechRate: 0.96,
    speechPitch: 1.30,
    geminiVoice: 'Puck',
    stylePrompt: 'A sweet, bright, cheerful 7-year-old child speaking clearly and happily to peer friends, friendly Sunday school buddy.',
    pastelTheme: {
      bg: 'bg-amber-50 hover:bg-amber-100/70',
      border: 'border-amber-200',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-100 text-amber-900',
      badgeText: 'text-amber-800',
      glowRing: 'ring-amber-300',
    },
  },
};

export const CHILDREN_PRAYERS: ChildPrayer[] = [
  {
    id: 'lords-prayer',
    titleEn: "The Lord's Prayer",
    titleEl: 'Η Κυριακή Προσευχή',
    subtitle: 'The special prayer that Jesus Christ Himself taught His disciples',
    category: 'core',
    badge: 'Given by Jesus',
    iconType: 'cross',
    pastelTheme: {
      cardBg: 'bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#EDE9FE]',
      border: 'border-[#DDD6FE]',
      badgeBg: 'bg-[#EDE9FE]',
      badgeText: 'text-[#6D28D9]',
      accentColor: '#7C3AED',
      audioBarBg: 'bg-[#EDE9FE]/70',
      highlightBg: 'bg-[#FDE047]/30 border-l-4 border-[#EAB308]',
    },
    fullTextEn:
      'Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. For Thine is the kingdom and the power and the glory, of the Father and of the Son and of the Holy Spirit, now and ever and unto ages of ages. Amen.',
    fullTextEl:
      'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου, ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς. Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον· καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν· καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ. Ὅτι σοῦ ἐστιν ἡ βασιλεία καὶ ἡ δύναμις καὶ ἡ δόξα, τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.',
    fullPhoneticEl:
      'Páter imón ho en tis ouranís, ayiasthíto to ónomá sou, elthéto ee vasileía sou, yenithéto to thélimá sou, hos en ouranó ke epí tees yees. Ton árton imón ton epioúsion dos iméen séemeron; ke áfes iméen ta ofilémata imón, hos ke eemées afíemen tees ofilétes imón; ke mee isenéngkees imás ees pirasmón, allá rýse imás apó tou poniroú. Hóti sou estin ee vasileía ke ee dýnamis ke ee dóxa, tou Patrós ke tou Yioú ke tou Ayíou Pnévmatos, nyn ke aeí ke ees tous eónas ton eónon. Améen.',
    kidTakeaway:
      'Jesus taught us to call God our "Father" because He loves and protects us just like the best, most caring parent in the whole universe!',
    liturgicalNote: 'Recited at every Divine Liturgy, home morning prayers, and family meals.',
    verses: [
      {
        id: 'lp-1',
        verseNumber: 1,
        english: 'Our Father, Who art in heaven, hallowed be Thy name.',
        greek: 'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου,',
        greekPhonetic: 'Páter imón ho en tis ouranís, ayiasthíto to ónomá sou,',
        kidMeaning:
          'We talk to God as our loving Father in Heaven, and we treat His holy Name with great respect and wonder.',
      },
      {
        id: 'lp-2',
        verseNumber: 2,
        english: 'Thy kingdom come, Thy will be done, on earth as it is in heaven.',
        greek: 'ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς.',
        greekPhonetic: 'elthéto ee vasileía sou, yenithéto to thélimá sou, hos en ouranó ke epí tees yees.',
        kidMeaning:
          'We ask God to help all people live in peace, kindness, and love, just like the angels do in Heaven.',
      },
      {
        id: 'lp-3',
        verseNumber: 3,
        english: 'Give us this day our daily bread;',
        greek: 'Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον·',
        greekPhonetic: 'Ton árton imón ton epioúsion dos iméen séemeron;',
        kidMeaning:
          'We trust God to give us our food today and the spiritual strength our heart needs to do good things.',
      },
      {
        id: 'lp-4',
        verseNumber: 4,
        english: 'and forgive us our trespasses, as we forgive those who trespass against us;',
        greek: 'καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν·',
        greekPhonetic: 'ke áfes iméen ta ofilémata imón, hos ke eemées afíemen tees ofilétes imón;',
        kidMeaning:
          'When we make a mistake, God forgives us with open arms, and we promise to forgive our friends and siblings too.',
      },
      {
        id: 'lp-5',
        verseNumber: 5,
        english: 'and lead us not into temptation, but deliver us from evil.',
        greek: 'καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ.',
        greekPhonetic: 'ke mee isenéngkees imás ees pirasmón, allá rýse imás apó tou poniroú.',
        kidMeaning:
          'We ask God to shield our hearts from tricky thoughts and keep us safe from harm and sadness.',
      },
      {
        id: 'lp-6',
        verseNumber: 6,
        english:
          'For Thine is the kingdom and the power and the glory, of the Father and of the Son and of the Holy Spirit, now and ever and unto ages of ages. Amen.',
        greek:
          'Ὅτι σοῦ ἐστιν ἡ βασιλεία καὶ ἡ δύναμις καὶ ἡ δόξα, τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.',
        greekPhonetic:
          'Hóti sou estin ee vasileía ke ee dýnamis ke ee dóxa, tou Patrós ke tou Yioú ke tou Ayíou Pnévmatos, nyn ke aeí ke ees tous eónas ton eónon. Améen.',
        kidMeaning:
          'All strength, beauty, and honor belong to God forever and ever! Amen means "Yes, truly it is so!"',
      },
    ],
    vocabularyExplorers: [
      {
        greekWord: 'Πάτερ',
        greekAlphabet: 'Π - ά - τ - ε - ρ',
        phonetic: 'Pá-ter',
        englishMeaning: 'Father',
        childNote: 'The loving way we speak to God, just like Jesus did!',
        emoji: '👨‍👧‍👦',
      },
      {
        greekWord: 'Οὐρανοῖς',
        greekAlphabet: 'Ο - υ - ρ - α - ν - ο - ῖ - ς',
        phonetic: 'Ou-ra-neés',
        englishMeaning: 'Heavens',
        childNote: 'The joyful place of God and all the radiant angels.',
        emoji: '☁️',
      },
      {
        greekWord: 'Ἄρτος',
        greekAlphabet: 'Ἄ - ρ - τ - ο - ς',
        phonetic: 'Ár-tos',
        englishMeaning: 'Bread',
        childNote: 'Our food and the holy bread (prosphoro) we bring to church!',
        emoji: '🍞',
      },
      {
        greekWord: 'Ἀμήν',
        greekAlphabet: 'Ἀ - μ - ή - ν',
        phonetic: 'A-méen',
        englishMeaning: 'So be it / Truly!',
        childNote: 'A joyful word that means "I believe this with all my heart!"',
        emoji: '✨',
      },
    ],
  },
  {
    id: 'our-father-greek',
    titleEn: 'The Our Father (Πάτερ ἡμῶν)',
    titleEl: 'Πάτερ ἡμῶν (Ελληνικό Κείμενο)',
    subtitle: 'The authentic original Greek prayer as chanted across Orthodox churches worldwide',
    category: 'core',
    badge: 'Greek Liturgical Master',
    iconType: 'dove',
    pastelTheme: {
      cardBg: 'bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]',
      border: 'border-[#7DD3FC]',
      badgeBg: 'bg-[#0284C7]/15',
      badgeText: 'text-[#0369A1]',
      accentColor: '#0284C7',
      audioBarBg: 'bg-[#E0F2FE]/80',
      highlightBg: 'bg-[#38BDF8]/20 border-l-4 border-[#0284C7]',
    },
    fullTextEn:
      'Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. For Thine is the kingdom and the power and the glory, of the Father and of the Son and of the Holy Spirit, now and ever and unto ages of ages. Amen.',
    fullTextEl:
      'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου, ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς. Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον· καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν· καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ. Ὅτι σοῦ ἐστιν ἡ βασιλεία καὶ ἡ δύναμις καὶ ἡ δόξα, τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.',
    fullPhoneticEl:
      'Páter imón ho en tis ouranís, ayiasthíto to ónomá sou, elthéto ee vasileía sou, yenithéto to thélimá sou, hos en ouranó ke epí tees yees. Ton árton imón ton epioúsion dos iméen séemeron; ke áfes iméen ta ofilémata imón, hos ke eemées afíemen tees ofilétes imón; ke mee isenéngkees imás ees pirasmón, allá rýse imás apó tou poniroú. Hóti sou estin ee vasileía ke ee dýnamis ke ee dóxa, tou Patrós ke tou Yioú ke tou Ayíou Pnévmatos, nyn ke aeí ke ees tous eónas ton eónon. Améen.',
    kidTakeaway:
      'In Greek, these are the very words written in the Holy Gospels! When we say them, we join millions of children chanting in Greece, Cyprus, America, and across the globe.',
    liturgicalNote: 'Features phonetic transliteration so children can practice Greek pronunciation alongside Elder Yiannis.',
    verses: [
      {
        id: 'ofg-1',
        verseNumber: 1,
        greek: 'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου,',
        greekPhonetic: 'Páter imón ho en tis ouranís, ayiasthíto to ónomá sou,',
        english: 'Our Father, Who art in heaven, hallowed be Thy name.',
        kidMeaning:
          'Páter means Father. We honor God with loving voices and bow our heads gently.',
      },
      {
        id: 'ofg-2',
        verseNumber: 2,
        greek: 'ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς.',
        greekPhonetic: 'elthéto ee vasileía sou, yenithéto to thélimá sou, hos en ouranó ke epí tees yees.',
        english: 'Thy kingdom come, Thy will be done, on earth as it is in heaven.',
        kidMeaning:
          'We pray for God’s heavenly light and kindness to fill our homes, classrooms, and playgrounds.',
      },
      {
        id: 'ofg-3',
        verseNumber: 3,
        greek: 'Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον·',
        greekPhonetic: 'Ton árton imón ton epioúsion dos iméen séemeron;',
        english: 'Give us this day our daily bread;',
        kidMeaning:
          'Árton means bread! We thank God for breakfast, lunch, and dinner, and for keeping us healthy.',
      },
      {
        id: 'ofg-4',
        verseNumber: 4,
        greek: 'καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν·',
        greekPhonetic: 'ke áfes iméen ta ofilémata imón, hos ke eemées afíemen tees ofilétes imón;',
        english: 'and forgive us our trespasses, as we forgive those who trespass against us;',
        kidMeaning:
          'We say "I am sorry" when we hurt someone, and we quickly share hugs and smiles with others.',
      },
      {
        id: 'ofg-5',
        verseNumber: 5,
        greek: 'καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ.',
        greekPhonetic: 'ke mee isenéngkees imás ees pirasmón, allá rýse imás apó tou poniroú.',
        english: 'and lead us not into temptation, but deliver us from evil.',
        kidMeaning:
          'God holds our hand like a strong father so we never get lost in dark or scary places.',
      },
      {
        id: 'ofg-6',
        verseNumber: 6,
        greek:
          'Ὅτι σοῦ ἐστιν ἡ βασιλεία καὶ ἡ δύναμις καὶ ἡ δόξα, τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.',
        greekPhonetic:
          'Hóti sou estin ee vasileía ke ee dýnamis ke ee dóxa, tou Patrós ke tou Yioú ke tou Ayíou Pnévmatos, nyn ke aeí ke ees tous eónas ton eónon. Améen.',
        english:
          'For Thine is the kingdom and the power and the glory, of the Father and of the Son and of the Holy Spirit, now and ever and unto ages of ages. Amen.',
        kidMeaning:
          'We bless the Holy Trinity: the Father, the Son Jesus, and the Holy Spirit who comforts us always.',
      },
    ],
    vocabularyExplorers: [
      {
        greekWord: 'Βασιλεία',
        greekAlphabet: 'Β - α - σ - ι - λ - ε - ί - α',
        phonetic: 'Va-si-leé-a',
        englishMeaning: 'Kingdom',
        childNote: 'God’s world filled with radiant peace, truth, and hugs!',
        emoji: '👑',
      },
      {
        greekWord: 'Θέλημα',
        greekAlphabet: 'Θ - έ - λ - η - μ - α',
        phonetic: 'Thé-li-ma',
        englishMeaning: 'Will / Wish',
        childNote: 'Doing what is good, honest, and loving in God’s sight.',
        emoji: '🧭',
      },
      {
        greekWord: 'Δόξα',
        greekAlphabet: 'Δ - ό - ξ - α',
        phonetic: 'Dó-xa',
        englishMeaning: 'Glory / Praise',
        childNote: 'When we sing joyful hymns to God with all our energy!',
        emoji: '🌟',
      },
      {
        greekWord: 'Εἰρήνη',
        greekAlphabet: 'Ε - ἰ - ρ - ή - ν - η',
        phonetic: 'Ee-reé-nee',
        englishMeaning: 'Peace',
        childNote: 'That warm, cozy stillness in your heart when you know God is near.',
        emoji: '🕊️',
      },
    ],
  },
  {
    id: 'morning-child',
    titleEn: 'Morning Prayer for Children',
    titleEl: 'Πρωινή Προσευχή Παιδιών',
    subtitle: 'A sweet daily prayer to start the morning with joy, sunshine, and thankful hearts',
    category: 'morning',
    badge: 'Morning Sunshine',
    iconType: 'sun',
    pastelTheme: {
      cardBg: 'bg-gradient-to-br from-[#FEFCE8] via-[#FEF9C3] to-[#FEF08A]/40',
      border: 'border-[#FDE047]',
      badgeBg: 'bg-[#CA8A04]/15',
      badgeText: 'text-[#854D0E]',
      accentColor: '#CA8A04',
      audioBarBg: 'bg-[#FEF08A]/60',
      highlightBg: 'bg-[#FDE047]/30 border-l-4 border-[#CA8A04]',
    },
    fullTextEn:
      'I thank You, Lord Jesus, for the bright new morning, for the gift of sleep, and for watching over me through the night. Bless my parents, my teachers, and all my friends today. Help me to be kind, truthful, and helpful in all that I do. Amen.',
    fullTextEl:
      'Σὲ εὐχαριστῶ, Κύριε Ἰησοῦ, γιὰ τὸ νέο φῶς τῆς ἡμέρας, γιὰ τὸν ὕπνο ποὺ μοῦ χάρισες, καὶ ποὺ μὲ φύλαξες ὅλη τὴ νύχτα. Εὐλόγησε τοὺς γονεῖς μου, τοὺς δασκάλους μου, καὶ τοὺς φίλους μου. Βοήθησέ με νὰ εἶμαι καλός, εἰλικρινὴς καὶ πρόθυμος σήμερα. Ἀμήν.',
    fullPhoneticEl:
      'Se efcharistó, Kýrie Iesoú, ya to néo fos tees eeméras, ya ton ýpno pou mou cháreeses, ke pou me fýlaxes ólee tee nýchta. Evlóyeese tous yonées mou, tous daskálous mou, ke tous fílous mou. Voéetheesé me na éeme kalós, eelikrineés ke próthymos séemera. Améen.',
    kidTakeaway:
      'Starting our day with "Thank You, Lord!" fills our eyes with sunshine and reminds us to be cheerful helpers!',
    verses: [
      {
        id: 'mc-1',
        verseNumber: 1,
        english: 'I thank You, Lord Jesus, for the bright new morning, and for watching over me through the night.',
        greek: 'Σὲ εὐχαριστῶ, Κύριε Ἰησοῦ, γιὰ τὸ νέο φῶς τῆς ἡμέρας, καὶ ποὺ μὲ φύλαξες ὅλη τὴ νύχτα.',
        greekPhonetic: 'Se efcharistó, Kýrie Iesoú, ya to néo fos tees eeméras, ke pou me fýlaxes ólee tee nýchta.',
        kidMeaning:
          'We wake up with a smile and say thank you to Jesus for a peaceful night of sleep.',
      },
      {
        id: 'mc-2',
        verseNumber: 2,
        english: 'Bless my parents, my teachers, and all my friends today.',
        greek: 'Εὐλόγησε τοὺς γονεῖς μου, τοὺς δασκάλους μου, καὶ τοὺς φίλους μου σήμερα.',
        greekPhonetic: 'Evlóyeese tous yonées mou, tous daskálous mou, ke tous fílous mou séemera.',
        kidMeaning:
          'We ask God to wrap our mom, dad, family, and classmates in His warmth and protection.',
      },
      {
        id: 'mc-3',
        verseNumber: 3,
        english: 'Help me to be kind, truthful, and helpful in all that I do. Amen.',
        greek: 'Βοήθησέ με νὰ εἶμαι καλός, εἰλικρινὴς καὶ πρόθυμος σὲ ὅ,τι κάνω. Ἀμήν.',
        greekPhonetic: 'Voéetheesé me na éeme kalós, eelikrineés ke próthymos se ó,ti káno. Améen.',
        kidMeaning:
          'We promise to share our toys, listen to our teachers, and speak kind words all day long.',
      },
    ],
  },
  {
    id: 'guardian-angel',
    titleEn: 'Prayer to the Guardian Angel',
    titleEl: 'Προσευχή στὸν Φύλακα Ἄγγελο',
    subtitle: 'Calling upon the bright angel who stands beside you and protects your steps',
    category: 'protection',
    badge: 'Angel Shield',
    iconType: 'angel',
    pastelTheme: {
      cardBg: 'bg-gradient-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]/40',
      border: 'border-[#6EE7B7]',
      badgeBg: 'bg-[#059669]/15',
      badgeText: 'text-[#065F46]',
      accentColor: '#059669',
      audioBarBg: 'bg-[#A7F3D0]/60',
      highlightBg: 'bg-[#34D399]/20 border-l-4 border-[#059669]',
    },
    fullTextEn:
      'Holy Angel of God, my faithful guardian, given to me by Christ from holy baptism: enlighten my mind, guide my footsteps in goodness, and protect me from all danger and fear. Through your prayers, keep my soul pure and peaceful. Amen.',
    fullTextEl:
      'Ἅγιε Ἄγγελε τοῦ Θεοῦ, πιστὲ φύλακά μου, ποὺ μοῦ δόθηκες ἀπὸ τὸν Χριστὸ στὸ ἅγιο βάπτισμα: φώτισε τὸν νοῦ μου, ὁδήγησε τὰ βήματά μου στὸ καλό, καὶ προστάτευσέ με ἀπὸ κάθε κίνδυνο. Μὲ τὶς προσευχές σου, φύλαξε τὴν ψυχή μου καθαρὴ καὶ γαλήνια. Ἀμήν.',
    fullPhoneticEl:
      'Áyie Ángele tou Theoú, pisté fýlaká mou, pou mou dótheekes apó ton Christó sto áyio váptisma: fóteese ton nou mou, odéeyeese ta véematá mou sto kaló, ke prostátefsé me apó káthe kíndyno. Me tis prosefchés sou, fýlaxe teen psychéen mou katharéen ke galéenia. Améen.',
    kidTakeaway:
      'Every baptized child has a bright guardian angel with wings of light right beside them, cheering them on and protecting them everywhere they go!',
    verses: [
      {
        id: 'ga-1',
        verseNumber: 1,
        english: 'Holy Angel of God, my faithful guardian, given to me by Christ from holy baptism:',
        greek: 'Ἅγιε Ἄγγελε τοῦ Θεοῦ, πιστὲ φύλακά μου, ποὺ μοῦ δόθηκες ἀπὸ τὸν Χριστὸ στὸ ἅγιο βάπτισμα:',
        greekPhonetic: 'Áyie Ángele tou Theoú, pisté fýlaká mou, pou mou dótheekes apó ton Christó sto áyio váptisma:',
        kidMeaning:
          'You have your very own angel buddy who has been with you since the day of your baptism!',
      },
      {
        id: 'ga-2',
        verseNumber: 2,
        english: 'enlighten my mind, guide my footsteps in goodness, and protect me from all danger.',
        greek: 'φώτισε τὸν νοῦ μου, ὁδήγησε τὰ βήματά μου στὸ καλό, καὶ προστάτευσέ με ἀπὸ κάθε κίνδυνο.',
        greekPhonetic: 'fóteese ton nou mou, odéeyeese ta véematá mou sto kaló, ke prostátefsé me apó káthe kíndyno.',
        kidMeaning:
          'Your angel helps you think bright, creative thoughts and walk on safe paths.',
      },
      {
        id: 'ga-3',
        verseNumber: 3,
        english: 'Through your prayers, keep my soul pure and peaceful. Amen.',
        greek: 'Μὲ τὶς προσευχές σου, φύλαξε τὴν ψυχή μου καθαρὴ καὶ γαλήνια. Ἀμήν.',
        greekPhonetic: 'Me tis prosefchés sou, fýlaxe teen psychéen mou katharéen ke galéenia. Améen.',
        kidMeaning:
          'Whenever you feel scared or lonely, whisper to your angel and feel peace return.',
      },
    ],
  },
  {
    id: 'jesus-prayer',
    titleEn: 'The Jesus Prayer (With Prayer Rope)',
    titleEl: 'Ἡ Εὐχὴ τοῦ Ἰησοῦ (Κομποσχοίνι)',
    subtitle: 'The ancient short prayer that kids can count on prayer beads anytime, anywhere',
    category: 'short',
    badge: 'Komboskini Beads',
    iconType: 'heart',
    pastelTheme: {
      cardBg: 'bg-gradient-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]/40',
      border: 'border-[#FDA4AF]',
      badgeBg: 'bg-[#E11D48]/15',
      badgeText: 'text-[#9F1239]',
      accentColor: '#E11D48',
      audioBarBg: 'bg-[#FECDD3]/60',
      highlightBg: 'bg-[#FB7185]/20 border-l-4 border-[#E11D48]',
    },
    fullTextEn: 'Lord Jesus Christ, Son of God, have mercy on me.',
    fullTextEl: 'Κύριε Ἰησοῦ Χριστέ, Υἱὲ τοῦ Θεοῦ, ἐλέησόν με τὸν ἁμαρτωλόν.',
    fullPhoneticEl: 'Kýrie Iesoú Christé, Yié tou Theoú, eléeesón me.',
    kidTakeaway:
      'This is the heart prayer of Mount Athos and the saints! You can say it quietly while walking, before a test, or holding your soft wool komboskini.',
    verses: [
      {
        id: 'jp-1',
        verseNumber: 1,
        english: 'Lord Jesus Christ, Son of God,',
        greek: 'Κύριε Ἰησοῦ Χριστέ, Υἱὲ τοῦ Θεοῦ,',
        greekPhonetic: 'Kýrie Iesoú Christé, Yié tou Theoú,',
        kidMeaning: 'We say the most beautiful Name in the world: Jesus, God’s beloved Son.',
      },
      {
        id: 'jp-2',
        verseNumber: 2,
        english: 'have mercy on me.',
        greek: 'ἐλέησόν με.',
        greekPhonetic: 'eléeesón me.',
        kidMeaning:
          'Mercy (ἔλεος) comes from the word for olive oil in Greek: it means healing, soothing kindness and love!',
      },
    ],
  },
  {
    id: 'evening-bedtime',
    titleEn: 'Evening Bedtime Prayer',
    titleEl: 'Βραδινὴ Προσευχὴ Παιδιῶν',
    subtitle: 'Calm breathing and quiet thanksgiving under the warm wings of God’s peace',
    category: 'evening',
    badge: 'Peaceful Sleep',
    iconType: 'moon',
    pastelTheme: {
      cardBg: 'bg-gradient-to-br from-[#F1F5F9] via-[#E2E8F0] to-[#CBD5E1]/40',
      border: 'border-[#94A3B8]',
      badgeBg: 'bg-[#475569]/15',
      badgeText: 'text-[#334155]',
      accentColor: '#475569',
      audioBarBg: 'bg-[#CBD5E1]/60',
      highlightBg: 'bg-[#94A3B8]/20 border-l-4 border-[#475569]',
    },
    fullTextEn:
      'Now that the stars shine in the quiet sky, I thank You, Lord, for this joyful day. Forgive anything I did wrong today, and bless my family with sweet dreams. Into Your loving hands, I place my soul and body. In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    fullTextEl:
      'Τώρα ποὺ τὰ ἀστέρια λάμπουν στὸν ἥσυχο οὐρανό, σὲ εὐχαριστῶ, Κύριε, γι’ αὐτὴ τὴν ὄμορφη μέρα. Συγχώρεσέ μου ὅ,τι ἔκανα λάθος, καὶ χάρισε στὴν οἰκογένειά μου γλυκοὺς ὕπνους. Στὰ στοργικά σου χέρια ἀφήνω τὴν ψυχή μου. Εἰς τὸ ὄνομα τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος. Ἀμήν.',
    fullPhoneticEl:
      'Tóra pou ta astéria lámpoun ston éesycho ouranó, se efcharistó, Kýrie, yi aftéen teen ómorfee méra. Synchóresé mou ó,ti ékana láthos, ke cháreese steen eekoyéneiá mou glykoús ýpnous. Sta storgiká sou chéria aféeno teen psychéen mou. Ees to ónoma tou Patrós ke tou Yioú ke tou Ayíou Pnévmatos. Améen.',
    kidTakeaway:
      'Before you close your eyes, say this prayer with Storyteller Sophia or Elder Yiannis to sleep in God’s warm, cozy protection.',
    verses: [
      {
        id: 'eb-1',
        verseNumber: 1,
        english: 'Now that the stars shine in the quiet sky, I thank You, Lord, for this joyful day.',
        greek: 'Τώρα ποὺ τὰ ἀστέρια λάμπουν στὸν ἥσυχο οὐρανό, σὲ εὐχαριστῶ, Κύριε, γι’ αὐτὴ τὴν ὄμορφη μέρα.',
        greekPhonetic: 'Tóra pou ta astéria lámpoun ston éesycho ouranó, se efcharistó, Kýrie, yi aftéen teen ómorfee méra.',
        kidMeaning: 'We look up at the twinkling stars and thank God for everything we played, learned, and saw.',
      },
      {
        id: 'eb-2',
        verseNumber: 2,
        english: 'Forgive anything I did wrong today, and bless my family with sweet dreams.',
        greek: 'Συγχώρεσέ μου ὅ,τι ἔκανα λάθος, καὶ χάρισε στὴν οἰκογένειά μου γλυκοὺς ὕπνους.',
        greekPhonetic: 'Synchóresé mou ó,ti ékana láthos, ke cháreese steen eekoyéneiá mou glykoús ýpnous.',
        kidMeaning: 'We let go of any bad moods or arguments and ask God for cozy, sweet dreams.',
      },
      {
        id: 'eb-3',
        verseNumber: 3,
        english: 'Into Your loving hands, I place my soul and body. In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        greek: 'Στὰ στοργικά σου χέρια ἀφήνω τὴν ψυχή μου. Εἰς τὸ ὄνομα τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ Ἁγίου Πνεύματος. Ἀμήν.',
        greekPhonetic: 'Sta storgiká sou chéria aféeno teen psychéen mou. Ees to ónoma tou Patrós ke tou Yioú ke tou Ayíou Pnévmatos. Améen.',
        kidMeaning: 'We make the sign of the Cross ☦ and rest in God’s warm embrace until the morning.',
      },
    ],
  },
];
