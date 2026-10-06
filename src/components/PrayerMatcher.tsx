import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, BookOpen, Volume2, VolumeX, Flame, Bookmark, BookmarkCheck, Check, RotateCcw, Send, ChevronRight, Star, Shield, Sun, Moon } from 'lucide-react';
import { audioEngine, AudioPlaybackState } from '../services/audioService';
import { VOICE_PROFILES } from '../data/childrenPrayers';

export interface MatchedPrayerResult {
  intention: string;
  gospelPassage: {
    citation: string;
    englishText: string;
    greekText: string;
    kidExplanation: string;
  };
  matchedPrayer: {
    titleEn: string;
    titleEl: string;
    englishText: string;
    greekText: string;
    greekPhonetic: string;
    comfortMessage: string;
  };
}

// Built-in rich library of Gospel prayers and child intentions for instant matching & offline capability
const CURATED_PRAYER_DATABASE: Record<string, Omit<MatchedPrayerResult, 'intention'>> = {
  fear: {
    gospelPassage: {
      citation: 'John 14:27 (Κατὰ Ἰωάννην 14:27)',
      englishText: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.',
      greekText: 'Εἰρήνην ἀφίημι ὑμῖν, εἰρήνην τὴν ἐμὴν δίδωμι ὑμῖν· μὴ ταρασσέσθω ὑμῶν ἡ καρδία μηδὲ δειλιάτω.',
      kidExplanation: 'Jesus promises that His heavenly peace is always watching over your room and your heart, especially when the lights are low.',
    },
    matchedPrayer: {
      titleEn: 'Prayer for Peace When I Am Afraid',
      titleEl: 'Προσευχή Γαλήνης ὅταν Φοβᾶμαι',
      englishText: 'Dear Lord Jesus, when the room is dark or I feel worried, send Your holy angel to stand beside my pillow. Fill my heart with Your warm light and sweet calm. I am safe in Your loving hands. Amen.',
      greekText: 'Κύριε Ἰησοῦ Χριστέ, ὅταν φοβᾶμαι ἢ τὸ σκοτάδι μὲ τρομάζει, στεῖλε τὸν ἅγιο ἄγγελό Σου νὰ στέκεται κοντά μου. Γέμισε τὴν καρδιά μου μὲ τὸ φῶς καὶ τὴ γαλήνη Σου. Ἀμήν.',
      greekPhonetic: 'Kýrie Iisoú Christé, ótan fováme ee to skotádi me tromázi, stíle ton áyio ángeló Sou na stékete kontá mou. Yémise teen kardiá mou me to fos ke tee galéenee Sou. Améen.',
      comfortMessage: 'Your Guardian Angel never sleeps and holds your hand through the whole night.',
    },
  },
  healing: {
    gospelPassage: {
      citation: 'Matthew 8:16-17 (Κατὰ Ματθαῖον 8:16-17)',
      englishText: 'He healed all who were sick, that it might be fulfilled which was spoken by Isaiah the prophet: He Himself took our infirmities and bore our sicknesses.',
      greekText: 'Πάντας τοὺς κακῶς ἔχοντας ἐθεράπευσεν, ὅπως πληρωθῇ τὸ ῥηθὲν διὰ Ἡσαΐου τοῦ προφήτου: Αὐτὸς τὰς ἀσθενείας ἡμῶν ἔλαβε καὶ τὰς νόσους ἐβάστασεν.',
      kidExplanation: 'Jesus is the Great Physician of our souls and bodies. He tenderly hears every prayer we whisper for someone who hurts.',
    },
    matchedPrayer: {
      titleEn: 'Prayer for Healing and Comfort',
      titleEl: 'Προσευχή Ἰάσεως καὶ Παρηγορίας',
      englishText: 'Merciful Lord and Physician of souls and bodies, stretch forth Your healing hand upon the one I love. Ease their pain, give them sweet rest, and grant strength to the doctors and nurses caring for them. Amen.',
      greekText: 'Εὔσπλαχνε Κύριε, Ἰατρὲ τῶν ψυχῶν καὶ τῶν σωμάτων ἡμῶν, ἄπλωσε τὸ θεραπευτικό Σου χέρι καὶ χάρισε ὑγεία, δύναμη καὶ εἰρήνη. Ἀμήν.',
      greekPhonetic: 'Éfsplachne Kýrie, Iatré ton psychón ke ton somáton eemón, áplose to therapeftikó Sou chéri ke chárise eeyéea, dýnamee ke eiréeenee. Améen.',
      comfortMessage: 'God hears the prayer of a child with special tenderness. Every prayer is a soothing balm.',
    },
  },
  gratitude: {
    gospelPassage: {
      citation: 'Luke 17:15-19 & 1 Thessalonians 5:18',
      englishText: 'In everything give thanks; for this is the will of God in Christ Jesus for you. Were there not ten cleansed? But where are the nine?',
      greekText: 'Ἐν παντὶ εὐχαριστεῖτε· τοῦτο γὰρ θέλημα Θεοῦ ἐν Χριστῷ Ἰησοῦ εἰς ὑμᾶς.',
      kidExplanation: 'When one man came back to thank Jesus, Jesus smiled with great joy. Saying "Thank You, Lord" brings sunshine into your soul!',
    },
    matchedPrayer: {
      titleEn: 'A Child’s Prayer of Thanksgiving',
      titleEl: 'Παιδικὴ Προσευχὴ Εὐχαριστίας',
      englishText: 'Thank You, sweet Jesus, for my family, my food, my cozy bed, and every happy surprise today. For the birds that sing and the sun that shines, glory to You, O God, glory to You! Amen.',
      greekText: 'Σὲ εὐχαριστῶ, γλυκέ μου Ἰησοῦ, γιὰ τὴν οἰκογένειά μου, τὸ φαγητό μου, καὶ ὅλα τὰ ὄμορφα δῶρα τῆς ζωῆς. Δόξα Σοι, ὁ Θεός, δόξα Σοι! Ἀμήν.',
      greekPhonetic: 'Se efcharistó, glyké mou Iisoú, yia teen oikoyéneiá mou, to fayitó mou, ke óla ta ómorfa dóra tees zoées. Dóxa Si, ho Theós, dóxa Si! Améen.',
      comfortMessage: 'A thankful heart is the happiest heart in the world. St. John Chrysostom taught: "Glory to God for all things!"',
    },
  },
  forgiveness: {
    gospelPassage: {
      citation: 'Matthew 6:14-15 & Matthew 18:21-22',
      englishText: 'For if you forgive men their trespasses, your heavenly Father will also forgive you. Lord, how often shall my brother sin against me, and I forgive him? Up to seventy times seven.',
      greekText: 'Ἐὰν γὰρ ἀφῆτε τοῖς ἀνθρώποις τὰ παραπτώματα αὐτῶν, ἀφήσει καὶ ὑμῖν ὁ Πατὴρ ὑμῶν ὁ οὐράνιος.',
      kidExplanation: 'Jesus taught that saying "I am sorry" and forgiving a friend makes our heart as bright and pure as a clear sky after the rain.',
    },
    matchedPrayer: {
      titleEn: 'Prayer for Forgiving and Making Up',
      titleEl: 'Προσευχὴ Συγχώρησης καὶ Συμφιλίωσης',
      englishText: 'Lord Jesus Christ, I am sorry for getting angry and speaking cross words. Melt away any mad feelings in my chest. Help me say sorry kindly and forgive my brother and friends with a big, happy hug. Amen.',
      greekText: 'Κύριε Ἰησοῦ Χριστέ, συγχώρεσέ με ὅταν θυμώνω ἢ πληγώνω τοὺς ἄλλους. Βοήθησέ με νὰ ζητῶ συγγνώμη καὶ νὰ συγχωρῶ μὲ ἀγάπη ὅπως Ἐσύ. Ἀμήν.',
      greekPhonetic: 'Kýrie Iisoú Christé, synchóresé me ótan thymóno ee pleegóno tous állous. Voéetheesé me na zeetó syngnómee ke na synchoró me agápee ópos Esý. Améen.',
      comfortMessage: 'Forgiving someone is like opening the church window and letting in pure spring sunlight.',
    },
  },
  school: {
    gospelPassage: {
      citation: 'Mark 10:14 & Luke 2:52',
      englishText: 'Let the little children come to Me, and do not forbid them; for of such is the kingdom of God. And Jesus increased in wisdom and stature, and in favor with God and men.',
      greekText: 'Ἄφετε τὰ παιδία ἔρχεσθαι πρός με καὶ μὴ κωλύετε αὐτά· τῶν γὰρ τοιούτων ἐστὶν ἡ βασιλεία τοῦ Θεοῦ.',
      kidExplanation: 'Jesus grew in wisdom and knowledge, just like you are doing at school! He is cheering you on every single day.',
    },
    matchedPrayer: {
      titleEn: 'Prayer for Learning and Bravery at School',
      titleEl: 'Προσευχὴ γιὰ τὸ Σχολεῖο καὶ τὴ Σοφία',
      englishText: 'O Good Shepherd Jesus, bless my teachers, open my mind to understand my lessons, and help me be a kind friend on the playground. When I take a test or feel shy, give me courage and a calm mind. Amen.',
      greekText: 'Καλὲ Ποιμένα Ἰησοῦ, φώτισε τὸν νοῦ μου νὰ μαθαίνω τὰ μαθήματά μου, βοήθησέ με νὰ εἶμαι καλὸς φίλος καὶ δῶσε μου θάρρος στὸ σχολεῖο. Ἀμήν.',
      greekPhonetic: 'Kalé Piména Iisoú, fótise ton nou mou na mathéno ta mathéematá mou, voéetheesé me na eéme kalós fílos ke dóse mou thárros sto scholéeo. Améen.',
      comfortMessage: 'Holy Spirit is called the "Treasury of Good Things" who enlightens young students.',
    },
  },
  bedtime: {
    gospelPassage: {
      citation: 'Psalm 4:8 & Mark 4:39',
      englishText: 'I will both lie down in peace, and sleep; for You alone, O Lord, make me dwell in safety. And He arose and rebuked the wind, and said to the sea, Peace, be still!',
      greekText: 'Ἐν εἰρήνῃ ἐπὶ τὸ αὐτὸ κοιμηθήσομαι καὶ ὑπνώσω, ὅτι σύ, Κύριε, κατὰ μόνας ἐπ’ ἐλπίδι κατῴκισάς με.',
      kidExplanation: 'Just as Jesus quieted the stormy sea with two words, He quiets your mind and blesses you with peaceful dreams.',
    },
    matchedPrayer: {
      titleEn: 'Peaceful Bedtime Blessing',
      titleEl: 'Βραδινὴ Προσευχὴ Ἤρεμου Ὕπνου',
      englishText: 'Lord Jesus Christ, as the stars come out, I lay my head down in peace. Forgive whatever went wrong today, bless my home and all I love, and send sweet angels to guard my sleep until the morning sun. Amen.',
      greekText: 'Κύριε Ἰησοῦ Χριστέ, τώρα ποὺ βγαίνουν τὰ ἀστέρια, πλαγιάζω μὲ γαλήνη. Εὐλόγησε τὸ σπίτι μας καὶ χάρισέ μου γλυκὸ ὕπνο ὑπὸ τὴν προστασία Σου. Ἀμήν.',
      greekPhonetic: 'Kýrie Iisoú Christé, tóra pou vyénoun ta astéria, playiázo me galéenee. Evlóyise to spéeeti mas ke chárise mou glykó ýpno ypó teen prostasía Sou. Améen.',
      comfortMessage: 'Make the sign of the cross over your pillow, and rest in the loving embrace of Christ.',
    },
  },
  nature: {
    gospelPassage: {
      citation: 'Matthew 6:28-29 (Κατὰ Ματθαῖον 6:28-29)',
      englishText: 'Consider the lilies of the field, how they grow: they neither toil nor spin; and yet I say to you that even Solomon in all his glory was not arrayed like one of these.',
      greekText: 'Καταμάθετε τὰ κρίνα τοῦ ἀγροῦ πῶς αὐξάνει· οὐ κοπιᾷ οὐδὲ νήθει· λέγω δὲ ὑμῖν ὅτι οὐδὲ Σολομὼν ἐν πάσῃ τῇ δόξῃ αὐτοῦ περιεβάλετο ὡς ἓν τούτων.',
      kidExplanation: 'God took time to paint every butterfly, leaf, and kitten with love. You are His most precious creation!',
    },
    matchedPrayer: {
      titleEn: 'Prayer of Wonder for God’s Creation',
      titleEl: 'Προσευχὴ Θαυμασμοῦ γιὰ τὴν Κτίση',
      englishText: 'O Creator Lord, how wonderful are all the works of Your hands! Thank You for the trees, the flowers, the ocean waves, and my beloved pets. Help me care for Your beautiful earth with a gentle heart. Amen.',
      greekText: 'Κύριε Δημιουργέ, πόσο θαυμαστὰ εἶναι ὅλα τὰ ἔργα Σου! Σὲ εὐχαριστῶ γιὰ τὴ φύση, τὰ λουλούδια καὶ τὰ ζωάκια. Βοήθησέ με νὰ τὰ φροντίζω μὲ ἀγάπη. Ἀμήν.',
      greekPhonetic: 'Kýrie Dimiouryé, póso thavmastá eéne óla ta érga Sou! Se efcharistó yia tee fýsee, ta louloúdia ke ta zoákia. Voéetheesé me na ta frontízo me agápee. Améen.',
      comfortMessage: 'St. Francis and St. Paisios both loved animals and talked gently to birds and bears!',
    },
  },
};

interface PrayerMatcherProps {
  onBack?: () => void;
}

export const PrayerMatcher: React.FC<PrayerMatcherProps> = ({ onBack }) => {
  const [intentionInput, setIntentionInput] = useState('');
  const [activeResult, setActiveResult] = useState<MatchedPrayerResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedPrayers, setSavedPrayers] = useState<MatchedPrayerResult[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [languageMode, setLanguageMode] = useState<'both' | 'en' | 'el'>('both');
  const [audioState, setAudioState] = useState<AudioPlaybackState>(audioEngine.getState());
  const [komboskiniCount, setKomboskiniCount] = useState<number>(0);

  useEffect(() => {
    return audioEngine.subscribe((s) => setAudioState(s));
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('child_saved_custom_prayers');
      if (stored) {
        setSavedPrayers(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const activeProfile = VOICE_PROFILES[audioState.activeProfileId] || VOICE_PROFILES.byzantine;

  // Keyword / intention smart matching logic for instant responsiveness
  const findBestCuratedMatch = (text: string): Omit<MatchedPrayerResult, 'intention'> => {
    const lower = text.toLowerCase();
    if (lower.includes('fear') || lower.includes('scared') || lower.includes('dark') || lower.includes('night') || lower.includes('worry') || lower.includes('anxious') || lower.includes('afraid')) {
      return CURATED_PRAYER_DATABASE.fear;
    }
    if (lower.includes('sick') || lower.includes('heal') || lower.includes('hospital') || lower.includes('doctor') || lower.includes('hurt') || lower.includes('grandma') || lower.includes('grandpa') || lower.includes('pain')) {
      return CURATED_PRAYER_DATABASE.healing;
    }
    if (lower.includes('thank') || lower.includes('grateful') || lower.includes('praise') || lower.includes('gift') || lower.includes('happy') || lower.includes('toy') || lower.includes('bless')) {
      return CURATED_PRAYER_DATABASE.gratitude;
    }
    if (lower.includes('sorry') || lower.includes('mad') || lower.includes('fight') || lower.includes('brother') || lower.includes('sister') || lower.includes('forgive') || lower.includes('angry')) {
      return CURATED_PRAYER_DATABASE.forgiveness;
    }
    if (lower.includes('school') || lower.includes('test') || lower.includes('exam') || lower.includes('brave') || lower.includes('teacher') || lower.includes('homework') || lower.includes('class')) {
      return CURATED_PRAYER_DATABASE.school;
    }
    if (lower.includes('sleep') || lower.includes('bed') || lower.includes('dream') || lower.includes('tired') || lower.includes('rest')) {
      return CURATED_PRAYER_DATABASE.bedtime;
    }
    if (lower.includes('nature') || lower.includes('pet') || lower.includes('dog') || lower.includes('cat') || lower.includes('puppy') || lower.includes('flower') || lower.includes('animal') || lower.includes('tree')) {
      return CURATED_PRAYER_DATABASE.nature;
    }
    // Default comforting fallback
    return CURATED_PRAYER_DATABASE.fear;
  };

  const handleMatchPrayer = async (queryText?: string) => {
    const textToSearch = (queryText || intentionInput).trim();
    if (!textToSearch) return;

    setIsLoading(true);
    setIsCandleLit(false);
    setSavedSuccess(false);

    try {
      // First attempt server-side Gemini matching for deeply personalized nuances
      const res = await fetch('/api/match-prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intention: textToSearch }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.gospelPassage && data.matchedPrayer) {
          setActiveResult({
            intention: textToSearch,
            gospelPassage: data.gospelPassage,
            matchedPrayer: data.matchedPrayer,
          });
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fallback seamlessly to built-in curated Orthodox library
    }

    // Curated matching fallback
    const match = findBestCuratedMatch(textToSearch);
    setActiveResult({
      intention: textToSearch,
      ...match,
    });
    setIsLoading(false);
  };

  const handlePlayPrayerAudio = () => {
    if (!activeResult) return;

    if (audioState.isPlaying && audioState.activePrayerId === 'custom-matched-prayer') {
      audioEngine.stop();
      return;
    }

    const prayer = activeResult.matchedPrayer;
    const text = languageMode === 'el' ? prayer.greekText : prayer.englishText;
    const lang = languageMode === 'el' ? 'el' : 'en';

    audioEngine.speakPassage('custom-matched-prayer', text, lang);
  };

  const handleSavePrayer = () => {
    if (!activeResult) return;
    const updated = [activeResult, ...savedPrayers.filter((p) => p.intention !== activeResult.intention)];
    setSavedPrayers(updated);
    setSavedSuccess(true);
    try {
      localStorage.setItem('child_saved_custom_prayers', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const quickPrompts = [
    { label: "When I'm scared of the dark", emoji: '🌙', key: 'fear' },
    { label: 'Healing for someone who is sick', emoji: '🩹', key: 'healing' },
    { label: 'Thank you for my family & gifts', emoji: '💖', key: 'gratitude' },
    { label: 'Saying sorry & forgiving friends', emoji: '🤝', key: 'forgiveness' },
    { label: 'Bravery for school or a test', emoji: '🎒', key: 'school' },
    { label: 'Peace before bedtime tonight', emoji: '🕊️', key: 'bedtime' },
    { label: 'Thanking God for nature & pets', emoji: '🐶', key: 'nature' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
            >
              ← Back
            </button>
          )}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-purple-100 px-3.5 py-1 rounded-full border border-amber-300 shadow-xs text-xs font-extrabold text-amber-950">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>My Heart’s Prayer • Ἡ Προσευχὴ τῆς Καρδιᾶς</span>
          </div>
        </div>

        {/* Saved Prayers Toggle */}
        <button
          onClick={() => setShowSavedList(!showSavedList)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold shadow-xs cursor-pointer transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-600" />
          <span>My Saved Prayers ({savedPrayers.length})</span>
        </button>
      </div>

      {/* Hero Invitation Card */}
      <section className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5EEDB] rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-200/70 border border-amber-300 flex items-center justify-center text-2xl mb-3 shadow-2xs">
            ✨
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tell Jesus What Is in Your Heart
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-2 leading-relaxed">
            God loves to hear your thoughts and feelings. Type your prayer or pick an intention below. We will find the closest words spoken by Jesus in the Holy Gospel and a gentle child-friendly prayer just for you!
          </p>
        </div>

        {/* Input Bar */}
        <div className="mt-6 space-y-3">
          <div className="relative">
            <textarea
              value={intentionInput}
              onChange={(e) => setIntentionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleMatchPrayer();
                }
              }}
              placeholder="Dear Jesus, today I feel... (e.g. scared of the dark, thankful for my puppy, worried about a test, or please heal my grandma)..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-white border-2 border-amber-300/80 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/50 outline-hidden text-slate-900 font-medium text-sm sm:text-base placeholder:text-slate-400 shadow-inner resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <span>Voice for reciting:</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                <span>{activeProfile.avatarEmoji}</span>
                <span>{activeProfile.name}</span>
                {audioState.activeProfileId === 'byzantine' && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-1 rounded font-black">
                    Default
                  </span>
                )}
              </span>
            </div>

            <button
              onClick={() => handleMatchPrayer()}
              disabled={isLoading || !intentionInput.trim()}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Finding Gospel Words...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950 fill-amber-300" />
                  <span>Find My Gospel Prayer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Feeling Suggestion Pills */}
        <div className="mt-6 pt-4 border-t border-amber-200/80">
          <p className="text-xs font-bold text-slate-600 mb-2">
            Or tap a common feeling to explore:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setIntentionInput(p.label);
                  handleMatchPrayer(p.label);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-amber-100 text-slate-800 hover:text-amber-950 text-xs font-bold border border-amber-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{p.emoji}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Prayers Drawer Modal */}
      {showSavedList && (
        <section className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-black text-slate-900">
                My Little Prayer Book ({savedPrayers.length} saved)
              </h3>
            </div>
            <button
              onClick={() => setShowSavedList(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          {savedPrayers.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center italic">
              You haven’t saved any prayers yet. When you find a prayer you love, click &quot;Save to My Prayer Book&quot;!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {savedPrayers.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveResult(item);
                    setIntentionInput(item.intention);
                    setShowSavedList(false);
                  }}
                  className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200 transition-all cursor-pointer text-left"
                >
                  <div className="text-xs font-bold text-amber-950 truncate">
                    {item.matchedPrayer.titleEn}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1 line-clamp-1 italic">
                    &quot;{item.intention}&quot;
                  </div>
                  <div className="text-[10px] text-amber-800 mt-1 font-semibold">
                    📖 {item.gospelPassage.citation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Matched Prayer Results */}
      {activeResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Card 1: Closest Gospel / Scripture Passage */}
          <div className="bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] rounded-3xl p-6 border-2 border-amber-300 shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Closest Gospel Passage Spoken by Jesus</span>
              </span>
              <span className="text-xs font-extrabold text-amber-900">
                {activeResult.gospelPassage.citation}
              </span>
            </div>

            {/* Gospel Quote */}
            <blockquote className="border-l-4 border-amber-500 pl-4 py-1 space-y-2">
              <p className="text-lg sm:text-xl font-bold font-cinzel text-slate-900 leading-snug">
                &ldquo;{activeResult.gospelPassage.englishText}&rdquo;
              </p>
              <p className="text-sm sm:text-base font-serif font-semibold text-amber-950/90 italic">
                &laquo;{activeResult.gospelPassage.greekText}&raquo;
              </p>
            </blockquote>

            {/* Kid Explanation */}
            <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-amber-900 bg-white/70 p-3 rounded-2xl border border-amber-200">
              <span className="text-lg">💡</span>
              <p>
                <strong className="font-extrabold text-amber-950">What Jesus is telling you: </strong>
                {activeResult.gospelPassage.kidExplanation}
              </p>
            </div>
          </div>

          {/* Card 2: Matched Child-Friendly Orthodox Prayer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-md space-y-5">
            {/* Header with Title & Audio */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  Child-Friendly Orthodox Prayer
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {languageMode === 'el' ? activeResult.matchedPrayer.titleEl : activeResult.matchedPrayer.titleEn}
                </h3>
              </div>

              {/* Language Switcher for Matched Prayer */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
                <button
                  onClick={() => setLanguageMode('both')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    languageMode === 'both' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Both
                </button>
                <button
                  onClick={() => setLanguageMode('en')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    languageMode === 'en' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguageMode('el')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    languageMode === 'el' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ελληνικά
                </button>
              </div>
            </div>

            {/* Prayer Body with Karaoke Highlights */}
            <div className="space-y-4">
              {(languageMode === 'en' || languageMode === 'both') && (
                <div className="p-4 rounded-2xl bg-[#FAF5FF] border border-purple-200">
                  {languageMode === 'both' && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-200 px-2 py-0.5 rounded-md inline-block mb-2">
                      English
                    </span>
                  )}
                  <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                    {activeResult.matchedPrayer.englishText}
                  </p>
                </div>
              )}

              {(languageMode === 'el' || languageMode === 'both') && (
                <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-sky-200 space-y-2">
                  {languageMode === 'both' && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-200 px-2 py-0.5 rounded-md inline-block mb-1">
                      Ελληνικά (Greek)
                    </span>
                  )}
                  <p className="text-lg sm:text-xl font-serif font-bold text-sky-950 leading-relaxed">
                    {activeResult.matchedPrayer.greekText}
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-sky-800 bg-sky-100/60 p-2 rounded-xl italic">
                    🗣️ {activeResult.matchedPrayer.greekPhonetic}
                  </p>
                </div>
              )}

              {/* Comfort message */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Peace for your heart: </strong>
                  {activeResult.matchedPrayer.comfortMessage}
                </p>
              </div>
            </div>

            {/* Action Bar: Listen Aloud, Light Candle, Save Prayer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Audio Read-Aloud */}
                <button
                  onClick={handlePlayPrayerAudio}
                  className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                    audioState.isPlaying && audioState.activePrayerId === 'custom-matched-prayer'
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                  }`}
                >
                  {audioState.isPlaying && audioState.activePrayerId === 'custom-matched-prayer' ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Stop Voice ({activeProfile.avatarEmoji})</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-950" />
                      <span>Listen in {activeProfile.name} ({activeProfile.avatarEmoji})</span>
                    </>
                  )}
                </button>

                {/* Light a Candle */}
                <button
                  onClick={() => setIsCandleLit(!isCandleLit)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCandleLit
                      ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${isCandleLit ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-slate-400'}`} />
                  <span>{isCandleLit ? 'Candle is Glowing 🕯️' : 'Light a Virtual Candle'}</span>
                </button>

                {/* Komboskini Knot */}
                <button
                  onClick={() => setKomboskiniCount((prev) => (prev + 1) % 34)}
                  className="px-3.5 py-2 rounded-2xl text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  title="Say a knot on the 33-knot prayer rope"
                >
                  <span>📿</span>
                  <span>Prayer Rope Knot: {komboskiniCount}/33</span>
                </button>
              </div>

              {/* Save to Prayer Book */}
              <button
                onClick={handleSavePrayer}
                className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 font-bold" />
                    <span className="text-emerald-700 font-bold">Saved to Prayer Book!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-amber-600" />
                    <span>Save to My Prayer Book</span>
                  </>
                )}
              </button>
            </div>

            {/* Glowing Candle Visual when lit */}
            {isCandleLit && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-amber-100/90 border border-amber-300 text-center animate-fadeIn shadow-inner">
                <div className="text-3xl animate-bounce">🕯️</div>
                <div className="text-xs font-black text-amber-950 mt-1">
                  Your candle is lit before Christ for this prayer intention.
                </div>
                <p className="text-[11px] text-amber-900 mt-0.5 italic">
                  &ldquo;I am the Light of the world. He who follows Me shall not walk in darkness.&rdquo; (John 8:12)
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
