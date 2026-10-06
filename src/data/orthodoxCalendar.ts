import { OrthodoxDayData, FastingRule, ScriptureReading } from '../types';
import { FEATURED_SAINTS, FeaturedSaint } from './pdfSaints';
import { getSaintOfTheDay } from './orthodoxSaintsCalendar';
import { getQuestionOfTheDay } from './orthodoxDiscussionQuestions';

// Well-known fixed Orthodox feasts and saint commemorations
interface FixedFeast {
  title: string;
  commemoration: string;
  saintOrFeastName: string;
  subtitle: string;
  moralMotto: string;
  virtueBadge: string;
  story: string;
  familyAction?: string;
  familyChallenge?: string;
  scriptureRef: string;
  scriptureTitle: string;
  scriptureText: string;
  scriptureReflection: string;
  eveningScriptureRef?: string;
  eveningScriptureTitle?: string;
  eveningScriptureText?: string;
  eveningScriptureReflection?: string;
  prayerTitle: string;
  prayerText: string;
  prayerKidNote: string;
  specialFasting?: FastingRule;
}

const FIXED_FEASTS: Record<string, FixedFeast> = {
  // September
  '9-8': {
    title: 'Nativity of the Most Holy Theotokos',
    commemoration: 'The Nativity of our Most Holy Lady the Theotokos and Ever-Virgin Mary',
    saintOrFeastName: 'Nativity of the Theotokos',
    subtitle: 'The Birth of the Mother of God',
    moralMotto: 'GOD BRINGS JOY TO ALL THE WORLD!',
    virtueBadge: 'Joy & Pure Love',
    story: 'Today the Church rejoices because the Virgin Mary was born to Joachim and Anna. Her birth brought dawn to the whole world, for through her, Jesus Christ our Savior would come into the world to bring light and life to all people.',
    familyChallenge: 'Say a special thank you to the Panagia today, asking her to wrap your family in her maternal prayers and peace.',
    scriptureRef: 'Luke 1:39-49',
    scriptureTitle: 'The Gospel According to Luke',
    scriptureText: 'My soul magnifies the Lord, and my spirit has rejoiced in God my Savior. For He has regarded the lowly state of His maidservant; for behold, henceforth all generations will call me blessed.',
    scriptureReflection: 'Mary’s heart was full of quiet joy and humbleness. When we are humble and thankful, God does great and wonderful things through us too!',
    prayerTitle: 'Troparion of the Nativity of the Theotokos',
    prayerText: 'Your birth, O Theotokos, has proclaimed joy to the whole universe; for from you has shone forth the Sun of Righteousness, Christ our God! He has loosed the curse and bestowed the blessing; He has abolished death and granted us eternal life.',
    prayerKidNote: 'We celebrate Mary’s birthday today as the beginning of God’s great promise of salvation!'
  },
  '9-14': {
    title: 'Universal Elevation of the Precious Cross',
    commemoration: 'The Elevation of the Venerable and Life-Giving Cross of our Lord',
    saintOrFeastName: 'The Holy Cross of Christ',
    subtitle: 'Great Feast of the Elevation of the Cross',
    moralMotto: 'THE CROSS IS OUR HOPE AND SHIELD OF LOVE!',
    virtueBadge: 'Sacrifice & Faith',
    story: 'When Saint Helen found the True Cross in Jerusalem, Patriarch Makarios lifted it high atop the pulpit so that the crowd of thousands could see it. When the people saw the holy wood on which Christ loved us to the end, they bowed with tears of gratitude, chanting "Kyrie Eleison" (Lord have mercy) a hundred times.',
    familyChallenge: 'Place sweet basil or fresh flowers by your family icon cross today, and venerate the Holy Cross together with love.',
    scriptureRef: '1 Corinthians 1:18-24',
    scriptureTitle: 'First Epistle to the Corinthians',
    scriptureText: 'For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.',
    scriptureReflection: 'The Cross is not an ordinary symbol—it is the triumphant trophy of Christ’s self-giving love that defeated darkness and fear forever.',
    prayerTitle: 'Troparion of the Holy Cross',
    prayerText: 'Save, O Lord, Your people, and bless Your inheritance! Grant victory to the faithful over adversaries, and by virtue of Your Cross, preserve Your habitation.',
    prayerKidNote: 'A solemn day of fasting and thanksgiving for the great gift of the Cross.'
  },
  '9-18': {
    title: 'Commemoration of Saint Eumenios & Saint Ariadne',
    commemoration: 'Saint Eumenios the Wonderworker, Bishop of Gortyna; Saint Ariadne the Martyr',
    saintOrFeastName: 'Saint Eumenios the Wonderworker',
    subtitle: 'A Father of Gentleness and Charity',
    moralMotto: 'GOD TEACHES US GENTLE COMPASSION!',
    virtueBadge: 'Gentleness & Almsgiving',
    story: 'Saint Eumenios was known as the "Father of the Poor" in Crete. Whenever anyone was in trouble, cold, or lonely, Eumenios came to their aid with comforting words and warm shelter. He never held anger in his heart and smiled upon all people with the love of Christ.',
    familyChallenge: 'Say something kind and encouraging to someone who might be having a difficult or tiring day today.',
    scriptureRef: 'Galatians 5:22-26',
    scriptureTitle: 'Epistle to the Galatians',
    scriptureText: 'The fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control.',
    scriptureReflection: 'When the Holy Spirit fills our heart, we grow sweet fruits like kindness, gentleness, and peace that make everyone around us feel safe and loved.',
    prayerTitle: 'Daily Prayer of the Heart',
    prayerText: 'Lord Jesus Christ, Son of God, teach me to be gentle, patient, and full of Your loving peace in all that I say and do today. Amen.',
    prayerKidNote: 'Pray this quiet prayer when waking up or heading out to school and work.'
  },
  '9-19': {
    title: 'Commemoration of Saint Trophimus, Sabbatius, & Dorymedon',
    commemoration: 'Holy Martyrs Trophimus, Sabbatius, and Dorymedon; Saint Theodore of Smolensk',
    saintOrFeastName: 'Holy Martyrs Trophimus and Companions',
    subtitle: 'Witnesses of Unshakable Friendship in Christ',
    moralMotto: 'TRUE FRIENDS ENCOURAGE EACH OTHER IN GOD!',
    virtueBadge: 'Christian Friendship',
    story: 'Trophimus and his Christian friends supported and encouraged each other every day. When challenges arose, they didn’t leave each other alone; they held hands and prayed together, reminding one another that Christ is always near.',
    familyChallenge: 'Be a loyal, encouraging friend today! Help a friend with their chores or games, and pray for one of your friends by name.',
    scriptureRef: 'John 15:12-15',
    scriptureTitle: 'The Gospel According to John',
    scriptureText: 'This is My commandment, that you love one another as I have loved you. Greater love has no one than this, than to lay down one’s life for his friends.',
    scriptureReflection: 'Jesus calls us His friends! When we treat our friends and siblings with loyalty and care, we reflect Jesus’s love into the world.',
    prayerTitle: 'Prayer for Our Family & Friends',
    prayerText: 'Lord Jesus Christ, bless my family, my teachers, and all my friends. Keep our hearts united in love and truth, and teach us to lift one another up every day. Amen.',
    prayerKidNote: 'A special prayer for all the people God placed in our lives.'
  },
  '10-18': {
    title: 'Feast of Saint Luke the Apostle & Evangelist',
    commemoration: 'The Holy Apostle and Evangelist Luke',
    saintOrFeastName: 'Saint Luke the Evangelist',
    subtitle: 'The Beloved Physician and Iconographer',
    moralMotto: 'GOD INSPIRES US TO SHARE HIS BEAUTY!',
    virtueBadge: 'Creativity & Healing',
    story: 'Saint Luke was both a caring physician and the writer of the Gospel of Luke and the Acts of the Apostles. Tradition also tells us he painted the very first icons of the Virgin Mary holding the infant Christ! He used his artistic and medical talents entirely for the glory of God.',
    familyChallenge: 'Draw an icon, cross, or beautiful picture of God’s creation and give it to a grandparent or friend.',
    scriptureRef: 'Colossians 4:14',
    scriptureTitle: 'Epistle to the Colossians',
    scriptureText: 'Luke the beloved physician and Demas greet you.',
    scriptureReflection: 'Saint Luke used his mind, hands, and heart to bring healing and to share the Gospel story with the world.',
    prayerTitle: 'Apolytikion of Saint Luke',
    prayerText: 'Let us praise with sacred songs the holy Apostle Luke, the chronicler of the Acts of the Apostles and bright writer of the Gospel of Christ, for he cures the ailments of human nature!',
    prayerKidNote: 'Saint Luke shows us that science, art, and medicine can all be offered to God.'
  },
  '12-25': {
    title: 'The Nativity in the Flesh of our Lord Jesus Christ',
    commemoration: 'The Holy Nativity of our Lord, God, and Savior Jesus Christ (Christmas)',
    saintOrFeastName: 'The Nativity of Christ',
    subtitle: 'The Great Feast of Christ’s Birth in Bethlehem',
    moralMotto: 'CHRIST IS BORN! GLORIFY HIM!',
    virtueBadge: 'Greatest Gift of Love',
    story: 'In a humble cave in Bethlehem, the King of Heaven was born! Shepherds were greeted by choirs of shining angels singing "Glory to God in the highest, and on earth peace, goodwill toward men!" The Star guided the Wise Men from afar to bow down and present their gifts.',
    familyChallenge: 'Sing the Christmas Troparion together around your tree or icon corner, and share gifts with hearts full of praise.',
    scriptureRef: 'Luke 2:1-14',
    scriptureTitle: 'The Holy Gospel According to Luke',
    scriptureText: 'For there is born to you this day in the city of David a Savior, who is Christ the Lord. And this will be the sign to you: You will find a Babe wrapped in swaddling cloths, lying in a manger.',
    scriptureReflection: 'God loved us so much that He came down to earth as a gentle baby so that we might know Him and live in His love forever.',
    prayerTitle: 'Troparion of the Nativity of Christ',
    prayerText: 'Your Nativity, O Christ our God, has shone to the world the light of wisdom! For by it, those who worshipped the stars were taught by a star to adore You, the Sun of Righteousness, and to know You, the Orient from on high. O Lord, glory to You!',
    prayerKidNote: 'Fast free period begins! Rejoice with the whole Church!'
  },
  '1-6': {
    title: 'The Holy Theophany of our Lord',
    commemoration: 'The Holy Theophany (Epiphany) & the Baptism of Christ in the Jordan River',
    saintOrFeastName: 'The Theophany of our Lord',
    subtitle: 'The Great Blessing of the Waters',
    moralMotto: 'GOD REVEALS HIS LIGHT AND SANCTIFIES ALL CREATION!',
    virtueBadge: 'Renewal & Blessing',
    story: 'When Jesus was baptized by Saint John in the Jordan River, the Holy Trinity was revealed: the Father’s voice spoke from heaven saying "This is My beloved Son," and the Holy Spirit descended like a gentle dove. The waters of the earth were blessed and made holy.',
    familyChallenge: 'Drink the Holy Water blessed in Church today, make the sign of the cross in every room of your home, and ask God’s blessing upon your year.',
    scriptureRef: 'Matthew 3:13-17',
    scriptureTitle: 'The Gospel According to Matthew',
    scriptureText: 'When He had been baptized, Jesus came up immediately from the water; and behold, the heavens were opened to Him, and He saw the Spirit of God descending like a dove and alighting upon Him.',
    scriptureReflection: 'At Theophany, Christ sanctified water and nature, showing that God’s love fills all of creation.',
    prayerTitle: 'Troparion of Theophany',
    prayerText: 'When You, O Lord, were baptized in the Jordan, the worship of the Trinity was made manifest! For the voice of the Father bore witness to You, calling You His beloved Son; and the Spirit in the form of a dove confirmed the steadfastness of the word. O Christ our God who appeared and enlightened the world, glory to You!',
    prayerKidNote: 'Priests bless homes and oceans with the Holy Cross!'
  },
  '3-25': {
    title: 'The Annunciation of the Most Holy Theotokos',
    commemoration: 'The Annunciation of the Most Holy Lady Theotokos and Ever-Virgin Mary',
    saintOrFeastName: 'The Annunciation',
    subtitle: 'The Good News brought by Archangel Gabriel',
    moralMotto: 'WITH GOD, NOTHING IS IMPOSSIBLE!',
    virtueBadge: 'Obedience & Trust in God',
    story: 'Archangel Gabriel appeared to the young Virgin Mary and said: "Rejoice, full of grace! The Lord is with you!" Mary wondered at this greeting, but answered with full trust: "Let it be to me according to your word." Her humble "yes" allowed the Savior to enter the world.',
    familyChallenge: 'When parents or teachers ask you to do something good, practice answering with a cheerful, willing heart like the Panagia did.',
    scriptureRef: 'Luke 1:26-38',
    scriptureTitle: 'The Gospel According to Luke',
    scriptureText: 'Then Mary said, "Behold the maidservant of the Lord! Let it be to me according to your word." And the angel departed from her.',
    scriptureReflection: 'Mary’s gentle obedience changed human history forever. Saying "yes" to God always brings light.',
    prayerTitle: 'Troparion of the Annunciation',
    prayerText: 'Today is the fountainhead of our salvation and the manifestation of the ancient mystery: the Son of God becomes the Son of the Virgin, and Gabriel announces the good tidings of grace. Wherefore, let us also cry out with him to the Theotokos: Rejoice, thou who art full of grace! The Lord is with thee.',
    prayerKidNote: 'Feast of joy during Great Lent (Fish, wine, and oil permitted).'
  },
  '8-6': {
    title: 'The Holy Transfiguration of our Lord',
    commemoration: 'The Holy Transfiguration of our Lord, God, and Savior Jesus Christ on Mount Tabor',
    saintOrFeastName: 'The Transfiguration',
    subtitle: 'Christ shines with Divine Uncreated Light',
    moralMotto: 'GOD TRANSFORMS OUR HEARTS WITH HIS LIGHT!',
    virtueBadge: 'Radiance of Holiness',
    story: 'Jesus took Peter, James, and John up a high mountain. Suddenly, His face shone like the sun, and His clothes became dazzling white! Moses and Elijah appeared with Him, and the disciples saw Christ’s divine glory.',
    familyChallenge: 'Tradition on this feast is to bless grapes and summer fruits. Share sweet fresh fruit with your family and thank God for the sweetness of His creation.',
    scriptureRef: 'Matthew 17:1-9',
    scriptureTitle: 'The Gospel According to Matthew',
    scriptureText: 'He was transfigured before them. His face shone like the sun, and His clothes became as white as the light.',
    scriptureReflection: 'When we pray and love others, Christ’s light shines through our faces and our actions.',
    prayerTitle: 'Troparion of the Transfiguration',
    prayerText: 'You were transfigured on the mountain, O Christ God, revealing Your glory to Your disciples as far as they could bear it. Let Your everlasting Light also shine upon us sinners, through the prayers of the Theotokos! O Giver of Light, glory to You!',
    prayerKidNote: 'Traditional blessing of grapes and summer harvest.'
  },
  '8-15': {
    title: 'The Dormition of the Most Holy Theotokos',
    commemoration: 'The Falling Asleep (Koimisis) of our Most Holy Lady Theotokos and Ever-Virgin Mary',
    saintOrFeastName: 'The Dormition of the Theotokos',
    subtitle: 'The "Summer Pascha" of the Church',
    moralMotto: 'LOVE TRANSCENDS EARTH TO HEAVEN!',
    virtueBadge: 'Maternal Protection & Peace',
    story: 'When the time came for the Virgin Mary to depart this world, the Holy Apostles were gathered by angels from across the earth to be by her side. Christ Himself arrived in glory and carried her pure soul into paradise. The Church celebrates this not with sadness, but as the triumphant translation of life to Life!',
    familyChallenge: 'Offer a prayer of gratitude for mothers and grandmothers, who care for us with unconditional love.',
    scriptureRef: 'Luke 10:38-42, 11:27-28',
    scriptureTitle: 'The Gospel According to Luke',
    scriptureText: 'Blessed is the womb that bore You, and the breasts which nursed You! But He said, "More than that, blessed are those who hear the word of God and keep it!"',
    scriptureReflection: 'Mary listened to God’s word and kept it in her heart every single day.',
    prayerTitle: 'Troparion of the Dormition',
    prayerText: 'In giving birth you preserved your virginity, and in falling asleep you did not forsake the world, O Theotokos! You were translated to life, being the Mother of Life, and by your prayers you deliver our souls from death.',
    prayerKidNote: 'Also called the Summer Pascha, filled with joyful hymns and flowers.'
  }
};

// Authentic Orthodox Morning prayers for families
export const DAILY_MORNING_PRAYERS = [
  {
    title: 'Morning Prayer of the Optina Elders',
    text: 'Lord, grant me to greet the coming day with peace. Help me to rely at every moment on Your holy will. In every hour of the day, reveal Your will to me. Bless my dealings with all who surround me. Teach me to treat all that comes to me throughout the day with peace of soul and with firm conviction that Your will governs all.',
    kidFriendlyNote: 'This prayer asks God to help us stay calm, peaceful, and loving from morning until bedtime.'
  },
  {
    title: 'Morning Prayer to the Holy Spirit (Heavenly King)',
    text: 'O Heavenly King, the Comforter, the Spirit of Truth, who are everywhere present and fill all things, Treasury of blessings and Giver of life: come and abide in us, and cleanse us from every impurity, and save our souls, O Good One!',
    kidFriendlyNote: 'We invite the Holy Spirit to guide our thoughts, words, and actions as the day begins.'
  },
  {
    title: 'Morning Prayer of Saint Philaret of Moscow',
    text: 'O Lord, I know not what to ask of You. You alone know what my true needs are. You love me more than I know how to love myself. Help me to see my real needs which are concealed from me. Teach me to pray. Pray Yourself within me. Amen.',
    kidFriendlyNote: 'A peaceful morning prayer asking God to guide our decisions and show us how to love.'
  },
  {
    title: 'Morning Prayer of a Child & Family',
    text: 'Lord Jesus Christ, Son of God, bless our family today. Give light to our eyes and peace to our hearts. Help us in our schoolwork, chores, and play, that in everything we do, Your holy Name may be glorified. Amen.',
    kidFriendlyNote: 'A beautiful morning prayer for kids before heading out for the day.'
  },
  {
    title: 'Morning Trisagion Prayers (Holy God)',
    text: 'Holy God, Holy Mighty, Holy Immortal, have mercy on us. (x3)\nGlory to the Father, and to the Son, and to the Holy Spirit, now and forever and to the ages of ages. Amen.\nAll-Holy Trinity, have mercy on us. Lord, cleanse our sins. Master, pardon our iniquities. Holy One, visit and heal our infirmities for Your name’s sake.\nLord, have mercy (x3).',
    kidFriendlyNote: 'One of the most ancient and beloved prayers of the Orthodox Church, said with three bows to start the morning.'
  }
];

// Authentic Orthodox Evening prayers for families
export const DAILY_EVENING_PRAYERS = [
  {
    title: 'Evening Prayer of Saint John Chrysostom',
    text: 'O Lord our God, whatever I have sinned this day in word, deed, or thought, forgive me, for You are good and love mankind. Grant me peaceful and undisturbed sleep. Send Your guardian angel to shield and protect me from all evil, for You are the guardian of our souls and bodies, and to You we give glory, Father, Son, and Holy Spirit. Amen.',
    kidFriendlyNote: 'A classic evening prayer asking God to forgive our small mistakes of the day and protect us while we sleep.'
  },
  {
    title: 'Evening Prayer of Saint Macarius the Great',
    text: 'O Eternal God and King of all creation, who has permitted me to reach this hour, forgive the sins which I have committed this day in deed, word, and thought. Purify my heart, O Lord, from every stain of flesh and spirit. Grant that I may rise from my sleep to glorify Your holy Name all the days of my life. Amen.',
    kidFriendlyNote: 'Say this right before turning off the lights to rest peacefully in God’s embrace.'
  },
  {
    title: 'Evening Prayer to the Guardian Angel',
    text: 'O Holy Angel of Christ, my faithful guardian and protector of my soul and body, forgive me for everything wherein I have offended you today. Protect me from every trick of the adversary, and pray for me to Christ our God that He may make me worthy of His goodness and mercy. Amen.',
    kidFriendlyNote: 'Every child has a loving Guardian Angel appointed by God at Baptism to guide and shield them throughout the night.'
  },
  {
    title: 'Bedtime Family Blessing & Commendation',
    text: 'Into Your hands, O Lord Jesus Christ, I commend my spirit and body. Bless me, have mercy on me, and grant me life eternal. Watch over our home, our parents, our brothers, sisters, and friends, and grant us peaceful rest under the shelter of Your wings. Amen.',
    kidFriendlyNote: 'Pray this together as a family by the bedside before sleep.'
  },
  {
    title: 'Evening Prayer of Repentance and Peace',
    text: 'Remit, forgive, and pardon, O God, our offenses, both voluntary and involuntary, in word and in deed, in knowledge and in ignorance, by day and by night, in mind and in thought; forgive us all, for You are good and love mankind. Through the prayers of the holy Theotokos, O Savior, save us. Amen.',
    kidFriendlyNote: 'Releasing all worries, hurt feelings, and apologies so we fall asleep with a clean and peaceful heart.'
  }
];

// Standard daily prayers for days without specific feast prayers
const DAILY_PRAYERS = DAILY_MORNING_PRAYERS;

// Authentic Orthodox Morning Scripture Readings (Light, Guidance & Living in Christ)
export const DAILY_MORNING_READINGS = [
  {
    passageRef: 'Matthew 5:14-16',
    readingTitle: 'You are the Light of the World',
    text: 'You are the light of the world. A city that is set on a hill cannot be hidden. Nor do they light a lamp and put it under a basket, but on a lampstand, and it gives light to all who are in the house. Let your light so shine before men, that they may see your good works and glorify your Father in heaven.',
    reflection: 'Every kind word, shared toy, and gentle smile is a warm morning light shining into the world. When you do good, you help everyone around you see God’s goodness!'
  },
  {
    passageRef: 'Colossians 3:12-14',
    readingTitle: 'Put on Tender Mercies',
    text: 'Therefore, as the elect of God, holy and beloved, put on tender mercies, kindness, humility, meekness, longsuffering; bearing with one another, and forgiving one another, if anyone has a complaint against another; even as Christ forgave you, so you also must do. But above all these things put on love, which is the bond of perfection.',
    reflection: 'Just like we pick nice, warm clothes to wear each morning, Saint Paul asks us to "put on" kindness, forgiveness, and love so our hearts are dressed in beauty.'
  },
  {
    passageRef: 'Lamentations 3:22-24',
    readingTitle: 'New Mercies Every Morning',
    text: 'Through the Lord’s mercies we are not consumed, because His compassions fail not. They are new every morning; great is Your faithfulness. "The Lord is my portion," says my soul, "therefore I hope in Him!"',
    reflection: 'Every sunrise is a brand-new gift from God! No matter what happened yesterday, today is a fresh opportunity to walk with Jesus in joy.'
  },
  {
    passageRef: 'Psalm 5:1-3',
    readingTitle: 'My Voice in the Morning',
    text: 'Give ear to my words, O Lord, consider my meditation. Give heed to the voice of my cry, my King and my God, for to You I will pray. My voice You shall hear in the morning, O Lord; in the morning I will direct it to You, and I will look up.',
    reflection: 'Before opening books, playing games, or checking screens, we look up to God and tell Him: "Thank You for this new day!"'
  },
  {
    passageRef: '1 Thessalonians 5:5-8',
    readingTitle: 'Children of the Light',
    text: 'You are all sons of light and sons of the day. We are not of the night nor of darkness. Therefore let us watch and be sober, putting on the breastplate of faith and love, and as a helmet the hope of salvation.',
    reflection: 'We belong to the daylight! That means we choose words that encourage others and actions that bring cheer wherever we go.'
  },
  {
    passageRef: 'Philippians 4:4-7',
    readingTitle: 'Rejoice in the Lord Always',
    text: 'Rejoice in the Lord always. Again I will say, rejoice! Let your gentleness be known to all men. The Lord is at hand. Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.',
    reflection: 'Whenever we feel worried, we can talk directly to God like talking to our best friend. He replaces worry with His gentle peace.'
  }
];

// Authentic Orthodox Evening Scripture Readings (Peace, Protection, Vespers & Rest)
export const DAILY_EVENING_READINGS = [
  {
    passageRef: 'Psalm 4:8',
    readingTitle: 'I Will Lie Down in Peace',
    text: 'I will both lie down in peace, and sleep; for You alone, O Lord, make me dwell in safety. You have put gladness in my heart, more than in the season that their grain and wine increased.',
    reflection: 'As the stars come out, we let go of all tiredness. God watches over our bedroom, our home, and our family so we can sleep in total safety and peace.'
  },
  {
    passageRef: 'Matthew 11:28-30',
    readingTitle: 'Rest for Your Souls',
    text: 'Come to Me, all you who labor and are heavy laden, and I will give you rest. Take My yoke upon you and learn from Me, for I am gentle and lowly in heart, and you will find rest for your souls. For My yoke is easy and My burden is light.',
    reflection: 'Jesus invites us to bring all our heavy thoughts, tired legs, and bedtime worries directly to Him. He wraps us in His gentle rest.'
  },
  {
    passageRef: 'Psalm 91:1-5, 11',
    readingTitle: 'He Shall Give His Angels Charge Over You',
    text: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the Lord, "He is my refuge and my fortress; my God, in Him I will trust." You shall not be afraid of the terror by night... For He shall give His angels charge over you, to keep you in all your ways.',
    reflection: 'God sends His shining holy angels to stand guard beside our beds tonight. We are safe under the shadow of His loving wings!'
  },
  {
    passageRef: 'John 14:27',
    readingTitle: 'My Peace I Give to You',
    text: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.',
    reflection: 'Jesus leaves a special gift of peace in our hearts before we close our eyes. If anything scared or upset you today, Jesus is right here beside you.'
  },
  {
    passageRef: 'Luke 24:28-29',
    readingTitle: 'Abide With Us, For It is Toward Evening',
    text: 'Then they drew near to the village where they were going, and He indicated that He would have gone farther. But they constrained Him, saying, "Abide with us, for it is toward evening, and the day is far spent." And He went in to stay with them.',
    reflection: 'Like the disciples at Emmaus, we pray: "Lord Jesus, come stay in our home tonight." He enters our homes and fills our rooms with quiet light.'
  },
  {
    passageRef: '1 Peter 5:6-7',
    readingTitle: 'Casting All Your Care Upon Him',
    text: 'Therefore humble yourselves under the mighty hand of God, that He may exalt you in due time, casting all your care upon Him, for He cares for you.',
    reflection: 'Imagine placing every worry, test, or difficult feeling into God’s big, gentle hands before sleeping. He cares for you more than you can imagine!'
  }
];

const DAILY_READINGS = DAILY_MORNING_READINGS;

// Helper to determine day tone (Byzantine 8 tones)
export function getByzantineTone(date: Date): string {
  // Simple algorithm based on weeks since standard reference
  const refDate = new Date(2026, 0, 4); // Known Tone 6
  const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
  const weekNum = Math.floor(diffDays / 7);
  const toneIndex = ((weekNum % 8) + 8) % 8;
  const tones = [
    'Tone 6 (Plagal Second)',
    'Tone 7 (Grave Tone)',
    'Tone 8 (Plagal Fourth)',
    'Tone 1 (First Tone)',
    'Tone 2 (Second Tone)',
    'Tone 3 (Third Tone)',
    'Tone 4 (Fourth Tone)',
    'Tone 5 (Plagal First)'
  ];
  return tones[toneIndex];
}

// Calculate fasting rule based on day of week and date
export function getFastingRule(date: Date): FastingRule {
  const dayOfWeek = date.getDay(); // 0 = Sun, 3 = Wed, 5 = Fri
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Major feast days that override fast
  if ((month === 12 && day >= 25) || (month === 1 && day <= 4)) {
    return {
      rule: 'fast_free',
      badgeLabel: 'Fast Free (Feast Period)',
      familyExplanation: 'During this holy feast period, the whole Church rejoices and enjoys food with thanksgiving!'
    };
  }

  // Major feast days with fish
  if ((month === 3 && day === 25) || (month === 8 && day === 6)) {
    return {
      rule: 'fish_wine_oil',
      badgeLabel: 'Fish, Wine & Oil Allowed',
      familyExplanation: 'A festive feast day allowance to celebrate this great milestone of the Church.'
    };
  }

  // Wednesdays and Fridays are traditional fast days
  if (dayOfWeek === 3 || dayOfWeek === 5) {
    return {
      rule: 'wine_oil',
      badgeLabel: 'Fasting Day (Wine & Oil)',
      familyExplanation: 'A day to remember Christ’s betrayal (Wednesday) and Cross (Friday) by eating simple, plant-based foods and practicing extra kindness.'
    };
  }

  // Saturdays and Sundays
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      rule: 'wine_oil',
      badgeLabel: 'Wine & Oil Allowed',
      familyExplanation: 'The weekend honors the Resurrection and the Sabbath with shared family meals.'
    };
  }

  // Regular weekdays
  return {
    rule: 'fast_free',
    badgeLabel: 'Regular Day',
    familyExplanation: 'Give thanks to God for the nourishing meals on your table and enjoy them together in peace.'
  };
}

export function getOrthodoxDay(date: Date): OrthodoxDayData {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateKey = `${month}-${day}`;
  const isoString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = dayNames[date.getDay()];
  const formattedDate = `${dayName}, ${monthNames[date.getMonth()]} ${day}, ${year}`;
  const tone = getByzantineTone(date);
  const fasting = getFastingRule(date);

  // Check if this date has a featured saint from the PDF!
  const pdfSaint = FEATURED_SAINTS.find(s => s.month === month && s.day === day);

  // Check if this date has a fixed feast
  const fixedFeast = FIXED_FEASTS[dateKey];

  // GOARCH URL with date parameter for accurate chapel navigation
  const goarchUrl = `https://www.goarch.org/chapel/calendar?month=${month}&year=${year}`;

  const saintOfTheDay = getSaintOfTheDay(date);

  if (pdfSaint) {
    const morningScriptureObj = {
      passageRef: pdfSaint.scriptureRef,
      readingTitle: `Morning Light: Words of Wisdom from ${pdfSaint.name}`,
      text: pdfSaint.scriptureVerse,
      reflection: `Saint ${pdfSaint.name} lived out this holy passage every single day. Let us carry these words in our hearts as we begin our day.`
    };
    const eveningScriptureObj = {
      passageRef: 'Psalm 119:105, 114',
      readingTitle: `Evening Peace: Resting in Faith with ${pdfSaint.name}`,
      text: 'Your word is a lamp to my feet and a light to my path. You are my hiding place and my shield; I hope in Your word.',
      reflection: `Just as Saint ${pdfSaint.name} found peace and safety in God’s presence, we rest our heads tonight knowing God’s holy love surrounds us like a shield.`
    };
    const questionOfTheDay = getQuestionOfTheDay(date, saintOfTheDay, morningScriptureObj);

    const morningPrayer = {
      title: `Morning Prayer to ${pdfSaint.name}`,
      text: `O Holy and Blessed ${pdfSaint.name}, who lived in love, courage, and faithfulness to Christ our Lord: pray to God for us and for our family as we greet this day, that we may be guided by the Holy Spirit in kindness, peace, and joyful obedience to God’s commandments. Amen.`,
      kidFriendlyNote: `Saint ${pdfSaint.name} is praying for you and your loved ones in heaven right now!`,
      authorOrContext: 'Orthodox Family Commemoration'
    };
    const eveningPrayer = {
      title: `Evening Thanksgiving with ${pdfSaint.name}`,
      text: `Lord Jesus Christ our God, by the prayers of Saint ${pdfSaint.name}, protect our home this night. Forgive any small unkindness or mistake of this day, heal our tiredness, and grant us peaceful sleep under the shelter of Your holy angels. Amen.`,
      kidFriendlyNote: `Thank God for today's blessings and rest peacefully with Saint ${pdfSaint.name}'s prayers.`
    };

    return {
      dateString: isoString,
      dayName,
      formattedDate,
      tone,
      commemoration: `Feast of ${pdfSaint.name}`,
      fasting: fixedFeast?.specialFasting || fasting,
      prayer: morningPrayer,
      morningPrayer,
      eveningPrayer,
      scripture: morningScriptureObj,
      morningScripture: morningScriptureObj,
      eveningScripture: eveningScriptureObj,
      morningReading: morningScriptureObj,
      eveningReading: eveningScriptureObj,
      saintOfTheDay,
      questionOfTheDay,
      learning: {
        name: pdfSaint.name,
        subtitle: pdfSaint.teaching,
        feastDateText: pdfSaint.feastDateText,
        moralMotto: pdfSaint.motto,
        virtueBadge: pdfSaint.virtue,
        story: pdfSaint.story,
        familyAction: pdfSaint.familyChallenge,
        funFact: pdfSaint.greekName ? `In Greek, this saint is celebrated as: ${pdfSaint.greekName}` : undefined,
        isFeaturedPdfSaint: true
      },
      goarchUrl
    };
  }

  if (fixedFeast) {
    const morningScriptureObj = {
      passageRef: fixedFeast.scriptureRef,
      readingTitle: `${fixedFeast.scriptureTitle} (Morning Reading)`,
      text: fixedFeast.scriptureText,
      reflection: fixedFeast.scriptureReflection
    };
    const eveningScriptureObj = {
      passageRef: fixedFeast.eveningScriptureRef || 'Psalm 121:1-8',
      readingTitle: fixedFeast.eveningScriptureTitle || 'The Lord is Your Keeper (Evening Feast Reading)',
      text: fixedFeast.eveningScriptureText || 'The Lord is your keeper; the Lord is your shade at your right hand. The sun shall not strike you by day, nor the moon by night. The Lord shall preserve you from all evil; He shall preserve your soul.',
      reflection: fixedFeast.eveningScriptureReflection || `After rejoicing in the feast of ${fixedFeast.title}, we place our night and our sleep into the loving hands of the Lord who never slumbers nor sleeps.`
    };
    const questionOfTheDay = getQuestionOfTheDay(date, saintOfTheDay, morningScriptureObj);

    const morningPrayer = {
      title: fixedFeast.prayerTitle,
      text: fixedFeast.prayerText,
      kidFriendlyNote: fixedFeast.prayerKidNote
    };
    const eveningPrayer = {
      title: `Evening Feast Prayer & Thanksgiving`,
      text: `O Lord Jesus Christ our God, we give You humble thanks for the light and joy of this holy feast of ${fixedFeast.title}. Protect our home and family this night from all darkness and fear, send Your holy angel to guard our sleep in peace, and grant that on the morrow we may rise to praise You with pure hearts. Through the intercessions of Your most pure Mother and all the saints, amen.`,
      kidFriendlyNote: `Say this quiet prayer before bedtime to thank God for the blessings of today's feast.`
    };

    return {
      dateString: isoString,
      dayName,
      formattedDate,
      tone,
      commemoration: fixedFeast.commemoration,
      fasting: fixedFeast.specialFasting || fasting,
      prayer: morningPrayer,
      morningPrayer,
      eveningPrayer,
      scripture: morningScriptureObj,
      morningScripture: morningScriptureObj,
      eveningScripture: eveningScriptureObj,
      morningReading: morningScriptureObj,
      eveningReading: eveningScriptureObj,
      saintOfTheDay,
      questionOfTheDay,
      learning: {
        name: fixedFeast.saintOrFeastName,
        subtitle: fixedFeast.subtitle,
        feastDateText: `${monthNames[date.getMonth()]} ${day}`,
        moralMotto: fixedFeast.moralMotto,
        virtueBadge: fixedFeast.virtueBadge,
        story: fixedFeast.story,
        familyAction: fixedFeast.familyAction || fixedFeast.familyChallenge || ''
      },
      goarchUrl
    };
  }

  // Fallback for regular calendar days: select balanced prayers & scripture based on day number
  const morningIndex = (day + month) % DAILY_MORNING_PRAYERS.length;
  const eveningIndex = (day * 2 + month) % DAILY_EVENING_PRAYERS.length;
  const morningReadingIndex = (day * 3 + month) % DAILY_MORNING_READINGS.length;
  const eveningReadingIndex = (day * 2 + month + 1) % DAILY_EVENING_READINGS.length;
  const morningPrayer = DAILY_MORNING_PRAYERS[morningIndex];
  const eveningPrayer = DAILY_EVENING_PRAYERS[eveningIndex];
  const morningReading = DAILY_MORNING_READINGS[morningReadingIndex];
  const eveningReading = DAILY_EVENING_READINGS[eveningReadingIndex];

  // Pick a virtuous teaching for the day
  const dailyVirtues = [
    { motto: 'GOD HELPS US SHARE KINDNESS!', badge: 'Patience & Compassion', action: 'Offer to set the dinner table or help with dishes with a cheerful heart.' },
    { motto: 'GOD MAKES US BRAVE IN FAITH!', badge: 'Courage & Honesty', action: 'Always tell the truth with kindness, even when it feels difficult.' },
    { motto: 'GOD GIVES US HEARTS OF GRATITUDE!', badge: 'Thanksgiving', action: 'Name three specific gifts you received from God today before going to bed.' },
    { motto: 'GOD SPEAKS TO QUIET HEARTS!', badge: 'Peaceful Prayer', action: 'Spend two minutes in quiet prayer together by the family icon corner.' },
    { motto: 'GOD TEACHES US TO GIVE WITH JOY!', badge: 'Generosity', action: 'Share your favorite toy, book, or snack with a sibling or classmate today.' }
  ];
  const virtue = dailyVirtues[(day + month) % dailyVirtues.length];
  const scriptureObj = morningReading;
  const questionOfTheDay = getQuestionOfTheDay(date, saintOfTheDay, scriptureObj);

  return {
    dateString: isoString,
    dayName,
    formattedDate,
    tone,
    commemoration: `${saintOfTheDay.name} • ${saintOfTheDay.title}`,
    fasting,
    prayer: morningPrayer,
    morningPrayer,
    eveningPrayer,
    scripture: morningReading,
    morningScripture: morningReading,
    eveningScripture: eveningReading,
    morningReading,
    eveningReading,
    saintOfTheDay,
    questionOfTheDay,
    learning: {
      name: saintOfTheDay.name,
      subtitle: saintOfTheDay.title,
      feastDateText: saintOfTheDay.feastDateText,
      moralMotto: saintOfTheDay.moralMotto,
      virtueBadge: saintOfTheDay.virtue,
      story: `${saintOfTheDay.shortBio} As Orthodox Christians, we look to the holy saints as our friends in heaven and living examples of following Christ. By practicing ${saintOfTheDay.virtue.toLowerCase()}, our homes become little domestic churches full of light and grace.`,
      familyAction: saintOfTheDay.familyAction || virtue.action,
      funFact: saintOfTheDay.greekName 
        ? `In the Greek Orthodox Church, this saint is celebrated as: ${saintOfTheDay.greekName}`
        : `Did you know? In Orthodox tradition, every day of the week is dedicated to a holy theme: Sunday to the Resurrection, Monday to the Angels, Tuesday to the Prophets, Wednesday to the Cross, Thursday to the Apostles, Friday to the Crucifixion, and Saturday to all Saints.`
    },
    goarchUrl
  };
}
