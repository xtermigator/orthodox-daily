export interface FeaturedSaint {
  id: string;
  name: string;
  month: number; // 1-12
  day: number;
  feastDateText: string;
  teaching: string;
  motto: string;
  virtue: string;
  greekName?: string;
  story: string;
  familyChallenge: string;
  scriptureVerse: string;
  scriptureRef: string;
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

export const FEATURED_SAINTS: FeaturedSaint[] = [
  {
    id: 'st-sophia',
    name: 'Saint Sophia & her Daughters Faith, Hope, and Love',
    month: 9,
    day: 17,
    feastDateText: 'September 17',
    teaching: 'Saint Sophia teaches us wisdom, hope, and love that stays faithful to God.',
    motto: 'GOD FILLS OUR HEARTS WITH HOPE AND LOVE!',
    virtue: 'Faith, Hope & Love',
    greekName: 'Η Αγία Σοφία (Πίστις, Ελπίς, Αγάπη)',
    story: 'Saint Sophia lived in Rome and had three precious daughters named Pistis (Faith), Elpis (Hope), and Agape (Love). Sophia taught her children every day that God is loving, good, and worth honoring above all worldly things. Even when rulers pressured them to abandon Christ, the daughters stood firm with gentle smiles and joyful songs. Saint Sophia supported and comforted them with pure motherly love.',
    familyChallenge: 'Practice the three virtues today: say one prayer of faith together, share one hopeful word with someone feeling down, and do one loving deed at home without being asked.',
    scriptureVerse: 'And now abide faith, hope, love, these three; but the greatest of these is love.',
    scriptureRef: '1 Corinthians 13:13',
    liturgicalColorName: 'Crown Gold & Martyr Ruby',
    liturgicalColorHex: '#DC2626',
    iconSymbolism: 'Saint Sophia wears the sacred red maphorion veil of maternal devotion and divine wisdom. Her daughters Faith, Hope, and Love hold golden martyr crosses, surrounded by luminous 24K gold leaf halos signifying uncreated heavenly light.',
    hymnApolytikion: {
      tone: 'Tone 5',
      title: 'Apolytikion of Saints Sophia, Faith, Hope & Love',
      englishLyrics: 'O victorious Sophia, you rejoiced with holy joy in your noble daughters; by faith, hope, and divine love, they triumphed in Christ and were crowned with celestial glory.'
    },
    nameDayTradition: 'Celebrated by girls named Sophia, Sonia, Faith (Pistis), Hope (Elpis), and Love (Agape). Families share sweet breads and pray for motherly wisdom.'
  },
  {
    id: 'st-nicholas',
    name: 'Saint Nicholas the Wonderworker',
    month: 12,
    day: 6,
    feastDateText: 'December 6',
    teaching: 'Saint Nicholas teaches us generosity, kindness, and love. He reminds us to help others with joyful hearts.',
    motto: 'GOD HELPS US SHARE KINDNESS!',
    virtue: 'Generosity & Joyful Giving',
    greekName: 'Ο Άγιος Νικόλαος ο Θαυματουργός',
    story: 'Saint Nicholas was a beloved bishop of Myra in Lycia. He had a heart full of Christ’s love. Whenever he saw someone suffering, poor, or cold, he would secretly bring them gold coins, warm food, and blankets under the cover of night so only God would know who gave it. He also protected sailors caught in violent storms through his prayers.',
    familyChallenge: 'Perform a secret act of giving today: leave a nice note, clean a room secretly, or place a treat or small donation for someone without taking credit.',
    scriptureVerse: 'God loves a cheerful giver.',
    scriptureRef: '2 Corinthians 9:7',
    liturgicalColorName: 'Sea Azure & Bishop Gold',
    liturgicalColorHex: '#1D4ED8',
    iconSymbolism: 'Saint Nicholas wears the sacred white and gold Omophorion with bold black crosses, blessing with his right hand in the IC XC cipher while holding the jewel-encrusted Holy Gospel book. Notice the calm, watchful eyes that protect sailors and children.',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of Saint Nicholas',
      englishLyrics: 'A model of faith and the image of gentleness, a teacher of self-control has your achievements shown you to your flock; wherefore you acquired heights by humility and riches by poverty: O Father and Hierarch Nicholas, intercede with Christ our God to save our souls.'
    },
    nameDayTradition: 'Celebrated by Nicholas, Nick, Nicoletta, and Nicole. In Orthodox seafaring towns, ships blow their horns, churches bake five-loaf artoklasia bread, and parents secretly leave sweet treats in children’s shoes.'
  },
  {
    id: 'st-george',
    name: 'Saint George the Trophy-Bearer',
    month: 4,
    day: 23,
    feastDateText: 'April 23',
    teaching: 'Saint George teaches us courage, faith, and standing strong for what is good.',
    motto: 'GOD MAKES US BRAVE IN FAITH!',
    virtue: 'Courage & Spiritual Strength',
    greekName: 'Ο Άγιος Γεώργιος ο Τροπαιοφόρος',
    story: 'Saint George was a valiant soldier in the Roman army who loved the Lord Jesus with all his heart. When the Emperor ordered soldiers to harm innocent Christians, Saint George gave away his riches to the poor and bravely stepped forward to declare: "I am a servant of Christ, the true King!" His courageous witness inspired thousands of people to follow Christ.',
    familyChallenge: 'Stand up for what is right today. If you see someone being excluded or treated unfairly at school or play, invite them in and be their friend.',
    scriptureVerse: 'Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go.',
    scriptureRef: 'Joshua 1:9',
    liturgicalColorName: 'Martyr Scarlet & Imperial Gold',
    liturgicalColorHex: '#DC2626',
    iconSymbolism: 'Saint George wears Roman golden scale armor and a vibrant scarlet mantle (chlamys) signifying his martyrdom for Christ. He rides a radiant white horse of purity, spearing the dragon of evil through the sign of the Cross.',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of Great Martyr George',
      englishLyrics: 'Liberator of captives, and defender of the poor, physician to the sick, champion of kings, victorious Great Martyr George, intercede with Christ our God for the salvation of our souls.'
    },
    nameDayTradition: 'Celebrated by George, Georgia, and Georgina. One of the greatest feast celebrations with joyful church panigiria, festive ring dancing, and family gatherings.'
  },
  {
    id: 'st-katherine',
    name: 'Saint Katherine the Great Martyr',
    month: 11,
    day: 25,
    feastDateText: 'November 25',
    teaching: 'Saint Katherine teaches us wisdom, learning, and love for God.',
    motto: 'GOD HELPS US GROW IN WISDOM!',
    virtue: 'Wisdom & Love of Truth',
    greekName: 'Η Αγία Αικατερίνη η Πανσόφος',
    story: 'Saint Katherine was a brilliant princess in Alexandria who studied philosophy, science, and literature. But she realized that all earthly learning is incomplete without Christ, who is the true Wisdom of God. When scholars debated her, she spoke with such grace, truth, and warmth that fifty philosophers embraced Christ.',
    familyChallenge: 'Dedicate your studies to God today! Read a book together, pray before doing schoolwork, and thank God for the wonderful gift of learning.',
    scriptureVerse: 'The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is understanding.',
    scriptureRef: 'Proverbs 9:10',
    liturgicalColorName: 'Imperial Tyrian Purple & Cinnabar',
    liturgicalColorHex: '#7E22CE',
    iconSymbolism: 'Saint Katherine wears a jeweled golden imperial crown (stemma) and crimson maphorion. In her hands she holds the white cross of martyrdom and the scroll of heavenly philosophy. Behind her rests the broken spiked wheel, shattered by an angel of God.',
    hymnApolytikion: {
      tone: 'Tone Plagal 1',
      title: 'Apolytikion of Saint Katherine',
      englishLyrics: 'Let us praise the all-lauded bride of Christ, the holy Katherine, guardian of Sinai, our help and aid; for she silenced brilliantly the subtle debates of philosophers by the power of the Holy Spirit.'
    },
    nameDayTradition: 'Celebrated by Katherine, Catherine, Katerina, and Katia. The historic Monastery of Saint Catherine at Mount Sinai distributes silver ring tokens in memory of her spiritual ring from Christ.'
  },
  {
    id: 'st-demetrios',
    name: 'Saint Demetrios the Myrrh-Streamer',
    month: 10,
    day: 26,
    feastDateText: 'October 26',
    teaching: 'Saint Demetrios teaches us courage, faith, and standing strong for what is good.',
    motto: 'GOD HELPS US STAND STRONG IN FAITH!',
    virtue: 'Steadfast Faith & Loyalty',
    greekName: 'Ο Άγιος Δημήτριος ο Μυροβλύτης',
    story: 'Saint Demetrios was an officer of noble birth in Thessaloniki. Instead of seeking military praise, he gathered young people in secret underground chambers to teach them the Gospel of Christ. He blessed his young student Nestor with a sign of the Cross, and the power of God protected them and revealed the glory of faith.',
    familyChallenge: 'When you make the sign of the Cross today, do it slowly and thoughtfully, asking God to make your heart brave and peaceful.',
    scriptureVerse: 'Put on the whole armor of God, that you may be able to stand against the wiles of the adversary.',
    scriptureRef: 'Ephesians 6:11',
    liturgicalColorName: 'Myrrh-Streamer Ruby & Gold',
    liturgicalColorHex: '#B91C1C',
    iconSymbolism: 'Saint Demetrios wears royal Roman armor and a crimson mantle, holding the warrior spear and shield marked with the Cross. Notice the red horse and the historic fortress walls of Thessaloniki which he protects.',
    hymnApolytikion: {
      tone: 'Tone 3',
      title: 'Apolytikion of Saint Demetrios',
      englishLyrics: 'The world has found you to be a great champion in hazards, and a vanquisher of adversaries, O victorious warrior! Therefore, holy Demetrios, intercede with Christ God to grant us great mercy.'
    },
    nameDayTradition: 'Celebrated by Demetrius, Dimitris, Dimitri, and Dimitra. In Thessaloniki, the whole city celebrates with parades, military bands, and sweet tsoureki bread.'
  },
  {
    id: 'st-basil',
    name: 'Saint Basil the Great',
    month: 1,
    day: 1,
    feastDateText: 'January 1',
    teaching: 'Saint Basil teaches us generosity, kindness, and caring for others with joyful hearts.',
    motto: 'GOD TEACHES US TO GIVE WITH JOY!',
    virtue: 'Charity & Caring for the Sick',
    greekName: 'Ο Άγιος Βασίλειος ο Μέγας',
    story: 'Saint Basil was bishop of Caesarea and one of the greatest church fathers. He built an entire city of charity called the "Basiliad", featuring the world’s first public hospital, shelters for travelers, orphanages, and soup kitchens. He also originated the sweet tradition of the Vasilopita (Saint Basil’s New Year bread) by baking gold coins into sweet bread to return savings to families with dignity.',
    familyChallenge: 'Share your bread and snacks with a friend or sibling today, and remember how Saint Basil made sure no one around him went hungry.',
    scriptureVerse: 'Do not forget to do good and to share, for with such sacrifices God is well pleased.',
    scriptureRef: 'Hebrews 13:16',
    liturgicalColorName: 'Universal Teacher Emerald & Gold',
    liturgicalColorHex: '#059669',
    iconSymbolism: 'Saint Basil has an ascetic brow and long dark pointed beard, wearing an emerald and gold Polystavrion (cross-patterned vestment) and white Omophorion. He holds the Gospel and Liturgy scroll, embodying heavenly charity and learning.',
    hymnApolytikion: {
      tone: 'Tone 1',
      title: 'Apolytikion of Saint Basil the Great',
      englishLyrics: 'Your voice resounded into all the earth, which received your word, by which you taught divine dogmas, enlightened the nature of things, and adorned human morals, O royal Hierarch Basil: pray to Christ God to save our souls.'
    },
    nameDayTradition: 'Celebrated on New Year’s Day by Basil, Vasili, and Vasiliki. Families gather to slice the Vasilopita sweet bread, chanting Saint Basil’s troparion, searching for the golden coin of good fortune.'
  },
  {
    id: 'st-nektarios',
    name: 'Saint Nektarios of Aegina',
    month: 11,
    day: 9,
    feastDateText: 'November 9',
    teaching: 'Saint Nektarios teaches us prayer, patience, and trusting God with gentle hearts.',
    motto: 'GOD HELPS US TRUST HIM IN PRAYER!',
    virtue: 'Patience & Forgiveness',
    greekName: 'Ο Άγιος Νεκτάριος Αιγίνης',
    story: 'Saint Nektarios lived in Greece in modern times. Although people spoke falsely against him and treated him unfairly, he never yelled, held grudges, or retaliated. Instead, he went to his quiet room, prayed for those who hurt him, and served sick people in monasteries. God granted him the miraculous gift of healing, and his sweet hymn "Agni Parthene" (O Pure Virgin) is sung worldwide.',
    familyChallenge: 'If someone frustrates or hurts you today, pause for ten seconds, say "Lord have mercy," and choose forgiveness instead of anger.',
    scriptureVerse: 'Be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you.',
    scriptureRef: 'Ephesians 4:32',
    liturgicalColorName: 'Healing Malachite & Pearl',
    liturgicalColorHex: '#047857',
    iconSymbolism: 'Saint Nektarios has kind, merciful eyes and a radiant silver beard. He wears the deep emerald and gold phelonion with an embroidered white Omophorion, blessing the world with the IC XC gesture and holding the Holy Gospel book.',
    hymnApolytikion: {
      tone: 'Tone 1',
      title: 'Apolytikion of Saint Nektarios of Aegina',
      englishLyrics: 'O faithful, let us praise Nektarios, the divine hierarch, the offspring of Selyvria and guardian of Aegina, who appeared in these latter days as a virtuous friend of Christ; for he pours forth healing upon those who cry out with faith.'
    },
    nameDayTradition: 'Celebrated by Nektarios and Nektaria. Pilgrims travel to the island of Aegina to venerate his relics and pray for health and peace of mind.'
  },
  {
    id: 'st-spyridon',
    name: 'Saint Spyridon the Wonderworker of Corfu',
    month: 12,
    day: 12,
    feastDateText: 'December 12',
    teaching: 'Saint Spyridon teaches us humility, kindness, and trusting God in simple ways.',
    motto: 'GOD HELPS US WALK WITH HUMILITY!',
    virtue: 'Humility & Simplicity',
    greekName: 'Ο Άγιος Σπυρίδων ο Θαυματουργός',
    story: 'Saint Spyridon was a humble shepherd on the island of Cyprus who was chosen to be bishop because of his pure, simple heart. Even as bishop, he still wore a simple woven shepherd’s hat. At the First Ecumenical Council in Nicaea, he held up a common clay brick to explain the Holy Trinity: suddenly fire flared upward, water trickled down, and clay remained in his hand—three elements in one brick!',
    familyChallenge: 'Choose modesty and humility today. Instead of boasting about what you have, thank God for simple daily blessings.',
    scriptureVerse: 'God resists the proud, but gives grace to the humble.',
    scriptureRef: 'James 4:6',
    liturgicalColorName: 'Shepherd Ochre & Coral',
    liturgicalColorHex: '#B45309',
    iconSymbolism: 'Saint Spyridon is uniquely shown wearing a rustic woven shepherd’s hat of willow twigs even as a bishop, showing his sublime humility. He holds a clay brick with miraculous flame leaping up and water trickling down, defending the Holy Trinity.',
    hymnApolytikion: {
      tone: 'Tone 1',
      title: 'Apolytikion of Saint Spyridon',
      englishLyrics: 'You emerged as a champion of the First Council and a wonderworker, O God-bearing Father Spyridon; you spoke to the dead in the grave, and turned a serpent into gold; and when you prayed, angels served with you!'
    },
    nameDayTradition: 'Celebrated by Spyro, Spyridon, and Spyridoula. In Corfu, magnificent philharmonic orchestras march in festive uniforms, and families share sweet honey loukoumades.'
  },
  {
    id: 'sts-constantine-helen',
    name: 'Saints Constantine and Helen, Equals-to-the-Apostles',
    month: 5,
    day: 21,
    feastDateText: 'May 21',
    teaching: 'Saints Constantine and Helen teach us faith, courage, and honoring the Cross of Christ.',
    motto: 'GOD HELPS US LEAD WITH FAITH!',
    virtue: 'Honoring the Holy Cross & Leadership',
    greekName: 'Οι Άγιοι Κωνσταντίνος και Ελένη',
    story: 'Emperor Constantine saw the sign of the Cross shining bright in the sky with the words: "In this sign, conquer!" He stopped all persecution of Christians across the Roman Empire. His saintly mother, Empress Helen, traveled all the way to Jerusalem, uncovered the Precious and Life-Giving Cross of Christ buried beneath sweet basil flowers, and built beautiful churches for all believers.',
    familyChallenge: 'Look at the crosses in your home or around your neck. Remember that the Cross is our shield of peace and sign of God’s boundless love.',
    scriptureVerse: 'God forbid that I should boast except in the cross of our Lord Jesus Christ.',
    scriptureRef: 'Galatians 6:14',
    liturgicalColorName: 'Imperial Tyrian Purple & 24K Gold',
    liturgicalColorHex: '#6B21A8',
    iconSymbolism: 'Saints Constantine and Helen wear imperial Byzantine crowns (stemma) with pearl pendilia and royal purple-and-gold garments. Between them they uphold the Life-Giving Precious Cross of Christ, adorned with flowers and the motto "En Touto Nika".',
    hymnApolytikion: {
      tone: 'Tone 8',
      title: 'Apolytikion of Saints Constantine & Helen',
      englishLyrics: 'Having seen the figure of Your Cross in the heavens, like Paul receiving the call not from men, Your Apostle among rulers committed his royal city to Your hand, O Lord. By their prayers, preserve us in peace forever.'
    },
    nameDayTradition: 'Celebrated by Constantine, Costas, Gus, Dino, Helen, Elena, and Eleni. It is one of the most widely celebrated name days in the entire Orthodox world.'
  },
  {
    id: 'st-paraskevi',
    name: 'Saint Paraskevi the Righteous Martyr',
    month: 7,
    day: 26,
    feastDateText: 'July 26',
    teaching: 'Saint Paraskevi teaches us compassion, prayer, and caring for others with love.',
    motto: 'GOD GIVES US HEARTS OF COMPASSION!',
    virtue: 'Compassion & Physical/Spiritual Healing',
    greekName: 'Η Αγία Παρασκευή η Οσιομάρτυς',
    story: 'Saint Paraskevi was born on a Friday (Paraskevi in Greek) to pious parents. From her childhood, she loved prayer and gave away her inheritance to the poor. She traveled from village to village tending to the sick, especially curing people suffering from diseases of the eyes, teaching them that Christ brings light to our spiritual eyes as well.',
    familyChallenge: 'Help someone see the good in life today: say kind compliments to your family members and look at the world through eyes of gratitude.',
    scriptureVerse: 'Blessed are the merciful, for they shall obtain mercy.',
    scriptureRef: 'Matthew 5:7',
    liturgicalColorName: 'Healing Emerald & Ruby',
    liturgicalColorHex: '#059669',
    iconSymbolism: 'Saint Paraskevi wears a dark green and crimson maphorion, holding a martyr’s cross and a salver with spiritual eyes, representing her miracles of healing physical and spiritual blindness.',
    hymnApolytikion: {
      tone: 'Tone 1',
      title: 'Apolytikion of Saint Paraskevi',
      englishLyrics: 'Matching your name with your faithful labor, you inherited a dwelling worthy of your faith, O victorious Paraskevi; wherefore you pour out streams of healing and intercede for our souls.'
    },
    nameDayTradition: 'Celebrated by Paraskevi, Voula, and Paris. Believers pray to her for good eyesight and peaceful families.'
  },
  {
    id: 'st-anna',
    name: 'Saint Anna, Mother of the Theotokos',
    month: 7,
    day: 25,
    feastDateText: 'July 25',
    teaching: 'Saint Anna teaches us family love, faithfulness, and trusting God’s promises.',
    motto: 'GOD BLESSES FAMILIES WITH LOVE!',
    virtue: 'Faithful Parenting & Family Love',
    greekName: 'Η Αγία Άννα η Θεοπρομήτωρ',
    story: 'Saint Anna and her righteous husband Joachim prayed to God for many years with patient and trusting hearts. God answered their prayers and blessed them with a daughter: the Virgin Mary, who would become the mother of our Savior Jesus Christ! Saint Anna raised Mary in holiness, gentleness, and deep love for God’s temple.',
    familyChallenge: 'Give your mother, father, or grandparents a warm hug and thank them for caring for you and guiding your family toward God.',
    scriptureVerse: 'Children, obey your parents in the Lord, for this is right. Honor your father and mother.',
    scriptureRef: 'Ephesians 6:1-2',
    liturgicalColorName: 'Righteous Rose & Forest Green',
    liturgicalColorHex: '#991B1B',
    iconSymbolism: 'Saint Anna tenderly embraces the child Virgin Mary (Theotokos) in maternal holiness. Anna wears a warm cinnabar red veil, and the young Mary wears lapis blue with the star of purity on her brow.',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of the Dormition of Saint Anna',
      englishLyrics: 'You carried in your womb the Pure Mother of God, who gave birth to Life; wherefore, O God-minded Anna, you passed to the heavenly dwelling of the righteous, praying for mercy for all who honor you.'
    },
    nameDayTradition: 'Celebrated by Anna, Anne, and Annita. Grandmothers and mothers receive flowers and blessings for their loving families.'
  },
  {
    id: 'st-john-chrysostom',
    name: 'Saint John Chrysostom ("Golden-Mouthed")',
    month: 11,
    day: 13,
    feastDateText: 'November 13',
    teaching: 'Saint John Chrysostom teaches us wisdom, truth, and speaking with love.',
    motto: 'GOD TEACHES US TO SPEAK WITH WISDOM!',
    virtue: 'Truthful & Loving Words',
    greekName: 'Ο Άγιος Ιωάννης ο Χρυσόστομος',
    story: 'Saint John was given the title "Chrysostom," which in Greek means "Golden-Mouthed," because his words were so sweet, pure, and filled with the Holy Spirit. He wrote the Divine Liturgy that we pray in church almost every Sunday! He always taught that our mouths were made to praise God and lift people up, never to say mean or hurtful words.',
    familyChallenge: 'Use only "golden words" today: say thank you, please, pardon me, and encourage someone who feels tired or sad.',
    scriptureVerse: 'Let no corrupt word proceed out of your mouth, but what is good for necessary edification.',
    scriptureRef: 'Ephesians 4:29',
    liturgicalColorName: 'Golden Divine Liturgy',
    liturgicalColorHex: '#D97706',
    iconSymbolism: 'Saint John Chrysostom is depicted with a wide golden brow of wisdom, wearing the golden cross-patterned Polystavrion and holding the open scroll of the Divine Liturgy with the Golden Gospel book.',
    hymnApolytikion: {
      tone: 'Tone 8',
      title: 'Apolytikion of Saint John Chrysostom',
      englishLyrics: 'Grace shining forth from your mouth like a beacon has illumined the universe; it has stored for the world treasures of uncovetousness and revealed the height of humility. Intercede with the Word, Christ God, that our souls be saved.'
    },
    nameDayTradition: 'Celebrated by John, Chrysostom, and Chrysanthi. Choirs, preachers, and chanters celebrate their heavenly patron.'
  },
  {
    id: 'three-hierarchs',
    name: 'The Three Hierarchs (Basil, Gregory, John)',
    month: 1,
    day: 30,
    feastDateText: 'January 30',
    teaching: 'The Three Hierarchs teach us learning, wisdom, and using our gifts for God’s glory.',
    motto: 'GOD HELPS US GROW IN LEARNING AND FAITH!',
    virtue: 'Wisdom, Christian Education & Unity',
    greekName: 'Οι Τρεις Ιεράρχες',
    story: 'Saint Basil the Great, Saint Gregory the Theologian, and Saint John Chrysostom were three great teachers of the Church. People used to argue about which one was greatest, so the three saints appeared together in a vision, saying: "We are all one in God, without division or rivalry!" Together, they are celebrated as the patron saints of students, learning, and education.',
    familyChallenge: 'Share your talents together as a family! Read a Bible story, draw a holy picture, or sing a hymn together before sleep.',
    scriptureVerse: 'There are diversities of gifts, but the same Spirit.',
    scriptureRef: '1 Corinthians 12:4',
    liturgicalColorName: 'Triple Byzantine Gold & Royal Crimson',
    liturgicalColorHex: '#D97706',
    iconSymbolism: 'The Three Holy Hierarchs—Basil, Gregory, and John—stand side-by-side in majestic episcopal robes, showing that unity and diversity exist in harmony within the Church of Christ.',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of the Three Hierarchs',
      englishLyrics: 'Let us who love their teachings gather and honor with hymns the three great luminaries of the light of the Trinity: Basil the Great, Gregory the Theologian, and John Chrysostom.'
    },
    nameDayTradition: 'Known as Greek Letters & Education Day across Orthodox schools. Students recite poems, receive books as gifts, and thank their teachers.'
  },
  {
    id: 'st-irene',
    name: 'Saint Irene the Great Martyr',
    month: 5,
    day: 5,
    feastDateText: 'May 5',
    teaching: 'Saint Irene teaches us peace, courage, and trusting God with calm hearts.',
    motto: 'GOD FILLS US WITH PEACE AND COURAGE!',
    virtue: 'Peace-making & Serenity',
    greekName: 'Η Αγία Ειρήνη η Μεγαλομάρτυς',
    story: 'Her name Irene comes from the Greek word for "Peace" (Eirene). When she was young, God sent an angel to guide her toward baptism. When soldiers threatened her, her calm, peaceful demeanor and steadfast trust in God softened the hardest hearts, leading thousands of people to peaceful faith in Christ.',
    familyChallenge: 'Be a peacemaker today! If an argument starts between siblings or friends, be the calm voice that brings peace and sharing.',
    scriptureVerse: 'Blessed are the peacemakers, for they shall be called sons of God.',
    scriptureRef: 'Matthew 5:9',
    liturgicalColorName: 'Serene Violet & Olive Green',
    liturgicalColorHex: '#7C3AED',
    iconSymbolism: 'Saint Irene wears an imperial violet maphorion veil with gold stars, holding an olive branch of peace in one hand and the golden martyr’s cross in the other, accompanied by the white dove of heavenly serenity.',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of Saint Irene',
      englishLyrics: 'O Irene, having received the peace of Christ in your pure heart, you shone with the brightness of martyrdom and brought peace to troubled souls; intercede with our merciful God to save us.'
    },
    nameDayTradition: 'Celebrated by Irene, Eirene, Rena, and Irina. Families celebrate with peaceful dinners and light vigil candles for peace in the world.'
  },
  {
    id: 'archangel-michael',
    name: 'Archangel Michael and all the Bodiless Powers',
    month: 11,
    day: 8,
    feastDateText: 'November 8',
    teaching: 'Archangel Michael teaches us courage, protection, and standing strong with God.',
    motto: 'GOD MAKES US BRAVE AND STRONG!',
    virtue: 'Heavenly Protection & Righteous Courage',
    greekName: 'Ο Αρχάγγελος Μιχαήλ',
    story: 'When Lucifer grew proud and fell from heaven, Archangel Michael stood up in the midst of the heavenly host and cried out: "Let us stand upright! Let us stand with awe! Let us attend!" Michael protects God’s children with his shield and flaming sword, reminding us that with God on our side, good always triumphs over darkness.',
    familyChallenge: 'Say the prayer to your Guardian Angel tonight: "O Angel of Christ, holy guardian of my soul and body, guide me in holiness and protect me from harm."',
    scriptureVerse: 'The angel of the Lord encamps all around those who fear Him, and delivers them.',
    scriptureRef: 'Psalm 34:7',
    liturgicalColorName: 'Celestial Azure & Flaming Gold',
    liturgicalColorHex: '#2563EB',
    iconSymbolism: 'Archangel Michael has resplendent luminous golden wings with cyan feather highlights, wearing an imperial military tunic, holding the fiery sword of heavenly justice and the celestial sphere inscribed with the X (Christ).',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of the Archangels Michael & Gabriel',
      englishLyrics: 'Supreme Commanders of the Heavenly Host, we pray you unceasingly: protect us beneath the shelter of your immaterial glory, delivering us from all danger, as we cry: Protect us, commanders of the powers on high!'
    },
    nameDayTradition: 'Celebrated by Michael, Mike, Michaela, Gabriel, Gabriella, and Angel. Armed forces and pilots honor Michael as their celestial protector.'
  },
  {
    id: 'st-marina',
    name: 'Saint Marina the Great Martyr',
    month: 7,
    day: 17,
    feastDateText: 'July 17',
    teaching: 'Saint Marina teaches us courage, faithfulness, and trusting God through hard times.',
    motto: 'GOD GIVES US COURAGE TO STAND FIRM!',
    virtue: 'Resilience & Trust in God',
    greekName: 'Η Αγία Μαρίνα η Μεγαλομάρτυς',
    story: 'Saint Marina was a young girl from Pisidia who learned about Christ from her Christian nurse. When she was imprisoned for her faith, the adversary tried to terrify her in the form of a fearsome dragon. Marina made the sign of the Cross, and the terrifying monster dissolved into dust! She showed that even a young girl, armed with faith, is stronger than all darkness.',
    familyChallenge: 'Whenever you feel scared of the dark or nervous about a test, make the sign of the Cross and remember Saint Marina’s steadfast bravery.',
    scriptureVerse: 'I can do all things through Christ who strengthens me.',
    scriptureRef: 'Philippians 4:13',
    liturgicalColorName: 'Victory Vermilion & Cerulean Blue',
    liturgicalColorHex: '#DC2626',
    iconSymbolism: 'Saint Marina wears a vibrant vermilion red maphorion over a sky-blue chiton, holding high the cross of victory while dispelling the dragon of darkness at her feet through faith in Christ.',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of Saint Marina',
      englishLyrics: 'Your lamb Marina, O Jesus, cries out with a great voice: I love You, my Bridegroom, and seeking You I endure martyrdom... by her intercessions, O Merciful One, save our souls.'
    },
    nameDayTradition: 'Celebrated by Marina, Marin, and Rina. Especially beloved in Mediterranean islands where seaside chapels are adorned with colorful flowers and basil.'
  },
  {
    id: 'st-elias',
    name: 'Saint Elias (Elijah) the Great Prophet',
    month: 7,
    day: 20,
    feastDateText: 'July 20',
    teaching: 'Saint Elias teaches us prayer, listening to God, and faithful hearts.',
    motto: 'GOD SPEAKS TO QUIET, FAITHFUL HEARTS!',
    virtue: 'Prayer & Listening to the Still Small Voice',
    greekName: 'Ο Προφήτης Ηλίας ο Θεσβίτης',
    story: 'Prophet Elias was a fiery man of prayer on Mount Carmel. When he looked for God, God was not in the violent earthquake, nor in the roaring fire, but in a "still, small, gentle breeze" (a quiet whisper). Elias taught us that when we quiet our noisy thoughts and listen with our hearts, God speaks to us with immense gentleness and peace.',
    familyChallenge: 'Take 2 minutes of quiet silence together with your family before prayer. Turn off screens, close your eyes, and listen quietly for God’s peace.',
    scriptureVerse: 'Be still, and know that I am God.',
    scriptureRef: 'Psalm 46:10',
    liturgicalColorName: 'Mount Carmel Fiery Ochre',
    liturgicalColorHex: '#EA580C',
    iconSymbolism: 'Prophet Elias has intense, prayerful eyes and wild silver locks, seated in the Mount Carmel desert cave with the raven bringing bread, holding the prophetic scroll that reads: "As the Lord God liveth!"',
    hymnApolytikion: {
      tone: 'Tone 4',
      title: 'Apolytikion of the Prophet Elias',
      englishLyrics: 'The incarnate angel, the pinnacle of the prophets, the second forerunner of the coming of Christ, the glorious Elias: from on high he sent down grace upon Elisha to banish illnesses and cleanse lepers.'
    },
    nameDayTradition: 'Celebrated by Elias, Elijah, and Iliana. In Greece, Cyprus, and the Levant, mountaintop chapels are dedicated to Prophet Elias where villagers climb up at sunrise to celebrate Liturgy.'
  },
  {
    id: 'st-john-baptist',
    name: 'Saint John the Forerunner and Baptist',
    month: 1,
    day: 7,
    feastDateText: 'January 7',
    teaching: 'Saint John the Baptist teaches us truth, courage, and preparing our hearts for Christ.',
    motto: 'GOD PREPARES OUR HEARTS WITH TRUTH!',
    virtue: 'Honesty, Humility & Repentance',
    greekName: 'Ο Άγιος Ιωάννης ο Πρόδρομος',
    story: 'Saint John lived in the desert, praying and fasting, clothed in camel’s hair. When crowds came to him, he pointed away from himself and toward Jesus Christ, saying: "Behold, the Lamb of God who takes away the sin of the world!" He shows children that true greatness comes from pointing others toward the Light of God with honest humility.',
    familyChallenge: 'Practice humility today: celebrate someone else’s success, praise a sibling’s hard work, and say "Great job!" with a smile.',
    scriptureVerse: 'He must increase, but I must decrease.',
    scriptureRef: 'John 3:30',
    liturgicalColorName: 'Jordan River Ochre & Alabaster',
    liturgicalColorHex: '#854D0E',
    iconSymbolism: 'Saint John the Baptist wears camel hair with a dark himation, holding an open scroll calling the world to repentance ("Metanoeite"). Often shown with angelic wings as the celestial Messenger of the Lord.',
    hymnApolytikion: {
      tone: 'Tone 2',
      title: 'Apolytikion of Saint John the Baptist',
      englishLyrics: 'The memory of the righteous is celebrated with hymns of praise, but for you, O Forerunner, the testimony of the Lord is enough; for you were shown in truth to be the most honorable of prophets, having been counted worthy to baptize in the streams Him Whom you preached.'
    },
    nameDayTradition: 'Celebrated on January 7 by John, Yianni, Ioanna, and Joanna following the feast of Epiphany (Theophany).'
  }
];
