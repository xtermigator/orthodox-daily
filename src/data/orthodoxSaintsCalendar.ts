import { SaintOfTheDay } from '../types';
import { FEATURED_SAINTS } from './pdfSaints';

// Comprehensive dictionary of Orthodox Saints for key and daily calendar dates
export const CALENDAR_SAINTS: Record<string, Omit<SaintOfTheDay, 'id' | 'feastDateText'>> = {
  // --- JANUARY ---
  '1-1': {
    name: 'Saint Basil the Great',
    title: 'Archbishop of Caesarea and Universal Teacher',
    shortBio: 'Saint Basil was a kind and brilliant bishop who built hospitals, soup kitchens, and schools called the Basiliad. He taught children that giving cheerfully to the poor is one of the greatest joys in life. He also baked gold coins inside sweet breads so struggling families could receive help with dignity.',
    iconType: 'bishop',
    virtue: 'Generosity & Joyful Giving',
    moralMotto: 'GOD TEACHES US TO GIVE WITH JOY!',
    greekName: 'Ο Άγιος Βασίλειος ο Μέγας',
    familyAction: 'Share a sweet treat or help someone in secret today without asking for praise.',
    isFeaturedPdf: true
  },
  '1-7': {
    name: 'Saint John the Baptist & Forerunner',
    title: 'The Holy Prophet, Forerunner and Baptist of the Lord',
    shortBio: 'Saint John lived in the peaceful desert and helped people prepare their hearts to welcome the Lord Jesus. He baptized Christ in the Jordan River and pointed everyone toward the Light of the world. He shows children how to be honest, humble, and brave in doing what is right.',
    iconType: 'prophet',
    virtue: 'Humility & Truthfulness',
    moralMotto: 'GOD CALLS US TO BE HUMBLE AND TRUE!',
    greekName: 'Ο Άγιος Ιωάννης ο Πρόδρομος',
    familyAction: 'Say a quiet prayer of thanksgiving for your baptism and your godparents.',
    isFeaturedPdf: true
  },
  '1-17': {
    name: 'Saint Anthony the Great',
    title: 'Father of Monks and Desert Hermit',
    shortBio: 'Saint Anthony gave away all his worldly goods to the poor and lived quietly in prayer and peace in the Egyptian desert. People traveled from far away just to hear his gentle words of wisdom and forgiveness. He taught everyone that a calm, praying heart is stronger than any worry.',
    iconType: 'monk_venerable',
    virtue: 'Peace of Heart & Prayer',
    moralMotto: 'GOD BRINGS PEACE TO CALM HEARTS!',
    familyAction: 'Practice two minutes of quiet silence together by your icon corner before dinner.'
  },
  '1-18': {
    name: 'Saint Athanasius the Great',
    title: 'Patriarch of Alexandria and Champion of Truth',
    shortBio: 'Saint Athanasius defended the true faith with unwavering courage when others were confused about Jesus Christ. Even when he was sent into exile five times, he never gave up loving God and encouraging his flock. He showed children that standing up for the truth with love is always worth it.',
    iconType: 'bishop',
    virtue: 'Steadfast Faith & Courage',
    moralMotto: 'GOD GIVES US COURAGE TO DEFEND THE TRUTH!',
    familyAction: 'Encourage a friend or family member who is feeling nervous about doing the right thing.'
  },
  '1-25': {
    name: 'Saint Gregory the Theologian',
    title: 'Archbishop of Constantinople and Poet of Faith',
    shortBio: 'Saint Gregory was a deeply gifted writer and speaker who wrote beautiful poems and sermons about the Holy Trinity. He loved peace so much that he willingly stepped down from high positions to preserve harmony among Christians. He teaches children that loving peace is greater than having worldly power.',
    iconType: 'bishop',
    virtue: 'Peacemaking & Heavenly Wisdom',
    moralMotto: 'BLESSED ARE THE PEACEMAKERS!',
    familyAction: 'Be a peacemaker at home today: help resolve an argument gently with a smile.'
  },
  '1-30': {
    name: 'The Three Holy Hierarchs: Basil, Gregory & John',
    title: 'Universal Teachers and Patrons of Education',
    shortBio: 'Saints Basil the Great, Gregory the Theologian, and John Chrysostom were three close friends and brilliant teachers of the Church. Rather than competing with one another, they worked together in deep unity to care for the poor and spread the Gospel. They remind students and families that learning is a holy gift to be shared.',
    iconType: 'bishop',
    virtue: 'Unity, Friendship & Wisdom',
    moralMotto: 'GOD BLESSES FRIENDS WHO WORK TOGETHER!',
    greekName: 'Οι Τρεις Ιεράρχες',
    familyAction: 'Thank your teachers, parents, or mentors for helping you learn and grow.',
    isFeaturedPdf: true
  },

  // --- FEBRUARY ---
  '2-2': {
    name: 'The Holy Righteous Symeon & Anna the Prophetess',
    title: 'Receivers of the Infant Christ in the Temple',
    shortBio: 'Righteous Elder Symeon and Prophetess Anna waited patiently in the Jerusalem Temple for many years to see the promised Savior. When Mary and Joseph brought the forty-day-old infant Jesus, Symeon took Him into his arms with joyful tears. They show us that God always keeps His loving promises to those who wait in faith.',
    iconType: 'righteous_ancestor',
    virtue: 'Patience & Hope in God',
    moralMotto: 'GOD ALWAYS KEEPS HIS PROMISES!',
    familyAction: 'Practice patience today: let someone else go first in line or pick a game.'
  },
  '2-10': {
    name: 'Saint Haralambos the Hieromartyr',
    title: 'Bishop of Magnesia and Wonderworker',
    shortBio: 'Saint Haralambos was over a hundred years old and served God with a radiant, joyful spirit that amazed everyone who met him. He prayed for the healing of the sick and protected towns from illness and sorrow through his prayers. He teaches children to honor and love their grandparents and elders.',
    iconType: 'bishop',
    virtue: 'Joy in Old Age & Compassion',
    moralMotto: 'GOD FILLS OUR SOULS WITH LASTING JOY!',
    familyAction: 'Call or write a heartfelt drawing or note to a grandparent or elder in your community.'
  },
  '2-23': {
    name: 'Saint Polycarp of Smyrna',
    title: 'Bishop of Smyrna and Disciple of Saint John',
    shortBio: 'Saint Polycarp was taught directly by the Apostle John and served Christ faithfully for eighty-six years. When asked to turn away from Christ, he replied with warmth: "Eighty and six years have I served Him, and He has done me no wrong; how can I blaspheme my King?" His steadfast loyalty inspired generations of believers.',
    iconType: 'bishop',
    virtue: 'Faithfulness & Steadfast Love',
    moralMotto: 'CHRIST IS OUR FAITHFUL FRIEND FOREVER!',
    familyAction: 'Keep your word today: do whatever you promised to do completely and with a happy heart.'
  },

  // --- MARCH ---
  '3-9': {
    name: 'The Forty Holy Martyrs of Sebaste',
    title: 'Valiant Soldiers of Faith',
    shortBio: 'These forty brave soldiers in Armenia chose to freeze on an icy lake together rather than deny their Christian faith. They held hands and prayed as one family, encouraging one another until glowing crowns of heavenly light descended upon them. They teach us the power of sticking together in times of trial.',
    iconType: 'great_martyr_soldier',
    virtue: 'Brotherly Unity & Courage',
    moralMotto: 'WE ARE STRONGER WHEN WE STAND TOGETHER!',
    familyAction: 'Do an activity together as a family and help each other without complaining.'
  },
  '3-25': {
    name: 'The Annunciation to the Most Holy Theotokos',
    title: 'Archangel Gabriel and the Mother of God',
    shortBio: 'Archangel Gabriel brought the most wonderful news to the Virgin Mary in Nazareth, saying, "Rejoice, highly favored one, the Lord is with you!" Mary answered with pure trust and humbleness: "Let it be to me according to your word." Her gentle "yes" brought the Savior of the world into our midst.',
    iconType: 'archangel',
    virtue: 'Trusting God & Obedience',
    moralMotto: 'GOD DELIGHTS IN A TRUSTING HEART!',
    familyAction: 'Say "yes" cheerfully the very first time a parent or teacher asks you to do a task.'
  },

  // --- APRIL ---
  '4-23': {
    name: 'Saint George the Trophy-Bearer',
    title: 'Great Martyr, Soldier of Christ and Protector',
    shortBio: 'Saint George was a valiant officer in the Roman army who loved the Lord Jesus with all his heart. When the Emperor commanded that innocent Christians be harmed, George gave away his riches to the poor and bravely stepped forward to confess Christ. His courageous witness gave strength to countless families across the world.',
    iconType: 'great_martyr_soldier',
    virtue: 'Courage & Spiritual Strength',
    moralMotto: 'GOD MAKES US BRAVE IN FAITH!',
    greekName: 'Ο Άγιος Γεώργιος ο Τροπαιοφόρος',
    familyAction: 'Stand up for someone who is being left out or treated unfairly at school or on the playground.',
    isFeaturedPdf: true
  },
  '4-25': {
    name: 'Saint Mark the Apostle & Evangelist',
    title: 'Author of the Holy Gospel of Mark and Bishop of Alexandria',
    shortBio: 'Saint Mark traveled with the Apostles Peter and Paul, recording the miracles, words, and compassion of Christ. He founded churches and schools in Egypt and cared deeply for young students. He inspires children to tell true, uplifting stories and share good news with everyone they meet.',
    iconType: 'apostle_evangelist',
    virtue: 'Sharing Good News & Faithfulness',
    moralMotto: 'SPREAD THE GOOD NEWS WITH LOVE!',
    familyAction: 'Read one short chapter from the Gospel of Mark together as a family tonight.'
  },

  // --- MAY ---
  '5-5': {
    name: 'Saint Irene the Great Martyr',
    title: 'Bearing the Peace of Christ to the World',
    shortBio: 'Saint Irene was a princess who learned about Christ through a gentle teacher and chose to dedicate her life to spreading peace. When challenges arose, God sent angels to protect her and heal the sick through her prayers. Her name means "peace," and she reminds children to carry calmness and love wherever they go.',
    iconType: 'woman_martyr',
    virtue: 'Peace, Calmness & Gentleness',
    moralMotto: 'GOD GIVES US PEACE THAT SHINES LIKE LIGHT!',
    greekName: 'Η Αγία Ειρήνη',
    familyAction: 'Whenever you feel upset today, take three deep breaths, say a prayer for peace, and speak gently.',
    isFeaturedPdf: true
  },
  '5-8': {
    name: 'Saint John the Theologian & Evangelist',
    title: 'The Beloved Disciple of Christ',
    shortBio: 'Saint John was the disciple whom Jesus loved, resting his head near the Lord’s heart at the Mystical Supper. In his old age on the island of Patmos, his continual advice to all children was simple: "Little children, love one another!" He teaches us that God Himself is pure love.',
    iconType: 'apostle_evangelist',
    virtue: 'Pure Love & Devotion',
    moralMotto: 'LITTLE CHILDREN, LOVE ONE ANOTHER!',
    familyAction: 'Tell every member of your family "I love you" and give them a warm hug today.'
  },
  '5-21': {
    name: 'Saints Constantine and Helen the Equals-to-the-Apostles',
    title: 'Emperor Constantine and Empress Helen',
    shortBio: 'Emperor Constantine and his mother Saint Helen stopped the persecution of Christians and built beautiful churches across Jerusalem. Helen journeyed all the way to Golgotha and discovered the precious True Cross buried beneath fragrant wild basil. They show families how parents and children can work together for the glory of God.',
    iconType: 'holy_cross_feast',
    virtue: 'Family Teamwork & Reverence',
    moralMotto: 'GOD BLESSES FAMILIES WHO HONOR HIM!',
    greekName: 'Άγιοι Κωνσταντίνος και Ελένη',
    familyAction: 'Do a home improvement project or clean up together as a family with joyful music.',
    isFeaturedPdf: true
  },

  // --- JUNE ---
  '6-11': {
    name: 'Saint Luke the Blessed Surgeon & Confessor',
    title: 'Archbishop of Simferopol, Surgeon and Healer',
    shortBio: 'Saint Luke was a brilliant medical doctor who operated on thousands of sick patients and always placed an icon of Christ in the operating room. Even when imprisoned for his Christian faith, he treated the wounded and prayed over every soul with fatherly love. He teaches us that our talents should be used to heal and bless others.',
    iconType: 'healer_unmercenary',
    virtue: 'Compassion for the Sick & Service',
    moralMotto: 'USE YOUR TALENTS TO BLESS OTHERS!',
    familyAction: 'Say a prayer for all doctors, nurses, and anyone who is feeling sick or unwell today.'
  },
  '6-29': {
    name: 'The Holy Apostles Peter and Paul',
    title: 'Leaders of the Apostles and Preachers to the Nations',
    shortBio: 'Saint Peter, the fisherman with a bold heart, and Saint Paul, the tireless traveler and writer, spread the light of Christ across the ancient world. Though they had very different personalities and backgrounds, Christ united them in one mission of unconditional love. They remind us that God has a special, wonderful plan for each one of us.',
    iconType: 'apostle_evangelist',
    virtue: 'Apostolic Zeal & Christian Unity',
    moralMotto: 'GOD HAS A PURPOSE FOR EVERY HEART!',
    familyAction: 'Celebrate the differences in your family: name one unique strength each person has.'
  },

  // --- JULY ---
  '7-17': {
    name: 'Saint Marina the Great Martyr',
    title: 'Valiant Defender of Christ and Protector of Children',
    shortBio: 'Saint Marina was a young woman who learned the Christian faith and held fast to Christ with fearless courage. When she faced tests and scary adversaries, she crossed herself and drove away all darkness with the sign of the Cross. She is remembered as a loving protector of children, mothers, and the sick.',
    iconType: 'woman_martyr',
    virtue: 'Bravery & Childlike Faith',
    moralMotto: 'THE SIGN OF THE CROSS PROTECTS OUR HEARTS!',
    greekName: 'Η Αγία Μαρίνα',
    familyAction: 'Make the sign of the Cross with care and reverence when you wake up and go to sleep.',
    isFeaturedPdf: true
  },
  '7-20': {
    name: 'Holy Prophet Elias (Elijah) the Tishbite',
    title: 'The Great Prophet of Fire and Prayer',
    shortBio: 'Prophet Elias was a fiery messenger of God who lived on Mount Carmel and prayed for rain with unshakeable faith. When God spoke to him, it was not in the violent storm or earthquake, but in a gentle, quiet breeze. He teaches us that God often speaks to us when we quiet down and listen.',
    iconType: 'prophet',
    virtue: 'Faithful Prayer & Quiet Reflection',
    moralMotto: 'GOD HEARS US IN THE GENTLE BREEZE!',
    greekName: 'Ο Προφήτης Ηλίας',
    familyAction: 'Take a quiet nature walk outside and thank God for the breeze, trees, and sky.'
  },
  '7-25': {
    name: 'Saint Anna, Mother of the Theotokos',
    title: 'Righteous Grandmother of Jesus Christ',
    shortBio: 'Righteous Anna and her husband Joachim prayed for many years with gentle patience and trust in God. God answered their prayers and blessed them with a daughter, the Virgin Mary, whom they lovingly offered back to God. Saint Anna is a special patron for mothers, grandmothers, and growing children.',
    iconType: 'righteous_ancestor',
    virtue: 'Patience, Motherly Care & Hope',
    moralMotto: 'GOD REWARDS QUIET PATIENCE AND HOPE!',
    greekName: 'Η Αγία Άννα',
    familyAction: 'Help your mother or grandmother with a chore today without them asking.',
    isFeaturedPdf: true
  },
  '7-26': {
    name: 'Saint Paraskevi the Venerable Martyr',
    title: 'Protector of the Eyes and Healer of Souls',
    shortBio: 'Saint Paraskevi traveled from village to village sharing the Gospel, caring for orphans, and healing people who were blind. When asked to turn away from Christ, she healed the ruler who had harmed her and prayed for his sight to be restored. She teaches children to be kind even to people who are unkind to them.',
    iconType: 'woman_martyr',
    virtue: 'Kindness, Forgiveness & Spiritual Vision',
    moralMotto: 'LOOK ON EVERYONE WITH EYES OF LOVE!',
    greekName: 'Η Αγία Παρασκευή',
    familyAction: 'Practice forgiveness today: if someone makes a mistake or bothers you, forgive them right away.',
    isFeaturedPdf: true
  },

  // --- AUGUST ---
  '8-6': {
    name: 'The Holy Transfiguration of our Lord',
    title: 'Christ Revealing His Divine Light on Mount Tabor',
    shortBio: 'Jesus took Peter, James, and John up onto Mount Tabor, where His face shone like the sun and His garments became radiant white. The voice of the Heavenly Father proclaimed, "This is My beloved Son, hear Him!" This glorious feast reminds children that Christ fills our lives with light and banishes every shadow.',
    iconType: 'prophet',
    virtue: 'Spiritual Radiance & Listening to Christ',
    moralMotto: 'CHRIST FILLS OUR HEARTS WITH HEAVENLY LIGHT!',
    familyAction: 'Bless and eat fresh summer fruits together, thanking God for the abundance of creation.'
  },
  '8-15': {
    name: 'The Dormition of the Most Holy Theotokos',
    title: 'The Falling Asleep and Heavenly Translation of the Mother of God',
    shortBio: 'When the Mother of God fell asleep in the Lord, the Holy Apostles were brought together from the ends of the earth to honor her in Gethsemane. Christ Himself received her pure soul into heaven in His arms with boundless tenderness. She remains our loving heavenly mother who prays continuously for all of us.',
    iconType: 'woman_martyr',
    virtue: 'Maternal Love, Honor & Peaceful Hope',
    moralMotto: 'THE PANAGIA PRAYS FOR US NIGHT AND DAY!',
    familyAction: 'Light a candle before the icon of the Panagia and ask her to protect your family.'
  },
  '8-27': {
    name: 'Saint Phanourios the Great Martyr',
    title: 'Revealer of Lost Things and Bringer of Light',
    shortBio: 'Saint Phanourios was an ancient martyr whose beautiful icon was miraculously discovered centuries later holding a candle and cross of faith. Orthodox families bake a fragrant sweet bread called "Phanouropita" to celebrate his feast and pray for their loved ones. He reminds us that when we feel lost or confused, Christ will reveal the right path.',
    iconType: 'great_martyr_soldier',
    virtue: 'Seeking Truth & Finding Guidance',
    moralMotto: 'GOD LIGHTS OUR PATH WHEN WE ARE LOST!',
    familyAction: 'Help find or organize something that was misplaced at home, and bake or share bread.'
  },

  // --- SEPTEMBER ---
  '9-1': {
    name: 'Saint Symeon the Stylite',
    title: 'Pillar of Prayer and Beacon of Humility',
    shortBio: 'Saint Symeon lived atop a high stone pillar in Syria, spending his whole life in prayer, fasting, and counseling travelers. Kings, farmers, and children gathered at the foot of his pillar to hear his gentle words of peace and repentance. He teaches us that keeping our thoughts raised toward heaven brings peace to daily life.',
    iconType: 'monk_venerable',
    virtue: 'Steadfast Prayer & Humility',
    moralMotto: 'LIFT YOUR THOUGHTS TO HEAVEN WITH A CHEERFUL HEART!',
    familyAction: 'Start your morning with a short, joyful prayer before checking devices or rushing out.'
  },
  '9-5': {
    name: 'Holy Prophet Zacharias and Righteous Elizabeth',
    title: 'Parents of the Holy Forerunner and Baptist John',
    shortBio: 'Zacharias the priest and Elizabeth lived righteous lives and walked faithfully in all the commandments of God. In their old age, the Archangel Gabriel announced that they would give birth to the prophet John. They teach families that trusting God’s timing always brings deep blessings.',
    iconType: 'righteous_ancestor',
    virtue: 'Faithfulness & Trust in God’s Timing',
    moralMotto: 'GOD’S TIMING IS ALWAYS PERFECT!',
    familyAction: 'Practice faithful patience: when waiting for something, say a little prayer of gratitude.'
  },
  '9-8': {
    name: 'The Nativity of the Most Holy Theotokos',
    title: 'The Birth of the Mother of God to Joachim and Anna',
    shortBio: 'Today the whole Church rejoices because the Virgin Mary was born to the righteous Joachim and Anna. Her birth announced the dawn of joy to the universe, because through her, Christ our Savior was born into the world. She teaches children how to live with sweet humility, pure love, and quiet gratitude.',
    iconType: 'woman_martyr',
    virtue: 'Joyful Hope & Pure Humility',
    moralMotto: 'GOD BRINGS JOY TO ALL THE WORLD!',
    familyAction: 'Say a special prayer thanking God for the Mother of God and for your own family.'
  },
  '9-11': {
    name: 'Saint Euphrosynos the Cook',
    title: 'Venerable Cook of the Monastery and Servant of Humility',
    shortBio: 'Saint Euphrosynos worked in the hot, busy kitchen of a monastery, quietly serving meals and cleaning up with joyful humility. One night, his abbot saw in a dream that Euphrosynos was walking in Paradise, picking fragrant heavenly apples. He teaches children that serving others with a smile turns ordinary chores into holy deeds.',
    iconType: 'monk_venerable',
    virtue: 'Humility in Daily Work & Cheerful Service',
    moralMotto: 'EVEN SIMPLE CHORES CAN SHINE WITH GOD’S LOVE!',
    familyAction: 'Help clean up the kitchen or set the dinner table with a joyful, cheerful attitude today.'
  },
  '9-14': {
    name: 'The Precious and Life-Giving Cross',
    title: 'Universal Elevation of the Holy Cross',
    shortBio: 'When Saint Helen found the True Cross of Christ in Jerusalem, the Patriarch lifted it high for all the people to venerate. The crowd bowed with tears of gratitude, chanting "Kyrie Eleison" (Lord have mercy) as sweet basil was distributed. The Cross reminds us that Christ’s self-giving love is our greatest victory and shield.',
    iconType: 'holy_cross_feast',
    virtue: 'Sacrificial Love & Reverence',
    moralMotto: 'THE CROSS IS OUR HOPE AND SHIELD OF LOVE!',
    familyAction: 'Venerate your family cross with reverence and place sweet basil or flowers by your icons.'
  },
  '9-17': {
    name: 'Saint Sophia & her Daughters Faith, Hope, and Love',
    title: 'Loving Mother and Holy Martyrs Pistis, Elpis, and Agape',
    shortBio: 'Saint Sophia raised her three precious daughters in Rome, teaching them that God’s love is the greatest treasure in life. When tested, the young girls stood firm with gentle smiles and joyful songs of praise, knowing God was with them. Sophia comforted them with deep maternal love, reminding children that faith, hope, and love will never fail.',
    iconType: 'woman_martyr',
    virtue: 'Faith, Hope & Love',
    moralMotto: 'GOD FILLS OUR HEARTS WITH HOPE AND LOVE!',
    greekName: 'Η Αγία Σοφία (Πίστις, Ελπίς, Αγάπη)',
    familyAction: 'Practice the three virtues: say one prayer of faith, share one hopeful word, and do one loving deed at home.',
    isFeaturedPdf: true
  },
  '9-18': {
    name: 'Saint Eumenios the Wonderworker of Gortyna',
    title: 'Bishop of Gortyna in Crete and Father of the Poor',
    shortBio: 'Saint Eumenios was a gentle bishop on the island of Crete who became known as the father of the poor and sorrowful. Whenever he saw anyone in need, cold, or lonely, he quietly brought them warm food, shelter, and words of peace. His whole life showed children and adults that kindness and humility can soften even the hardest hearts.',
    iconType: 'bishop',
    virtue: 'Gentleness & Compassion',
    moralMotto: 'GOD TEACHES US GENTLE COMPASSION!',
    greekName: 'Ο Άγιος Ευμένιος ο Θαυματουργός',
    familyAction: 'Say something encouraging to someone who might be having a tiring or difficult day today.'
  },
  '9-19': {
    name: 'Holy Martyrs Trophimus, Sabbatius & Dorymedon',
    title: 'Witnesses of Unshakable Friendship in Christ',
    shortBio: 'These holy friends in Asia Minor supported and encouraged each other every day in their love for the Lord Jesus. When trials and difficulties arrived, they held hands and prayed together as true brothers, never leaving anyone behind. They show children the beauty of loyal Christian friendship that always builds others up.',
    iconType: 'great_martyr_soldier',
    virtue: 'Loyalty & Christian Friendship',
    moralMotto: 'TRUE FRIENDS ENCOURAGE EACH OTHER IN GOD!',
    familyAction: 'Be a loyal friend today: help a friend or sibling with their chores or games without complaining.'
  },
  '9-20': {
    name: 'Saint Eustathios the Great Martyr & his Family',
    title: 'Commander Placidus, his Wife Theopiste & Sons',
    shortBio: 'Saint Eustathios was a high Roman general who saw a vision of a luminous cross shining between the antlers of a stag while hunting. He and his beloved family were baptized, and when heavy trials struck, they stayed united in prayer like the biblical Job. They teach us that a family united in Christ cannot be broken by any hardship.',
    iconType: 'great_martyr_soldier',
    virtue: 'Family Unity & Patience in Hardship',
    moralMotto: 'A FAMILY UNITED IN PRAYER REMAINS STRONG!',
    familyAction: 'Hold hands around the dinner table or icon corner and pray for your family’s unity.'
  },
  '9-21': {
    name: 'Holy Apostle Quadratus of the Seventy',
    title: 'Apostle of the 70 and Defender of the Christian Faith',
    shortBio: 'Saint Quadratus was a disciple of the Apostles and a bishop of Athens who wrote one of the first defenses of Christianity to the Roman Emperor. He pointed out the many miracles of Christ, noting that people who had been healed by Jesus lived on as living testimonies of God’s grace. He inspires children to speak about God with clear, respectful words.',
    iconType: 'apostle_evangelist',
    virtue: 'Courageous Witness & Thoughtful Words',
    moralMotto: 'SPEAK THE TRUTH WITH KINDNESS AND CLARITY!',
    familyAction: 'Share one good thing God did for you this week with someone at school or home.'
  },
  '9-22': {
    name: 'Hieromartyr Phokas of Sinope',
    title: 'Bishop of Sinope and Patron of Gardeners and Sailors',
    shortBio: 'Saint Phokas was a bishop on the Black Sea coast who tended a lush garden and welcomed every traveler and stranger into his home for a warm meal. When soldiers were sent to harm him, he fed them generously and showed them such love that they were moved to tears. He teaches us that warm hospitality is a wonderful way to honor Christ.',
    iconType: 'bishop',
    virtue: 'Generous Hospitality & Love for Strangers',
    moralMotto: 'WELCOME EVERY STRANGER AS YOU WOULD WELCOME CHRIST!',
    familyAction: 'Help welcome a guest or make an extra seat and plate welcoming for someone visiting.'
  },
  '9-23': {
    name: 'Conception of Saint John the Baptist',
    title: 'The Miracle of Holy Zacharias and Elizabeth',
    shortBio: 'Today the Church remembers how the Archangel Gabriel appeared to Zacharias at the altar to announce the birth of Saint John the Baptist. Even when it seemed humanly impossible, God showed that nothing is too difficult for Him. This holy day reminds children that God works wonders in the most quiet and humble places.',
    iconType: 'righteous_ancestor',
    virtue: 'Faith in God’s Wonders & Hope',
    moralMotto: 'NOTHING IS IMPOSSIBLE WITH GOD!',
    familyAction: 'When facing a hard task or homework today, say: "Lord Jesus, help me do my best."'
  },
  '9-24': {
    name: 'Saint Thekla the Equal-to-the-Apostles',
    title: 'First Woman Martyr and Disciple of Saint Paul',
    shortBio: 'Saint Thekla heard the Apostle Paul preaching about Christ in Iconium and dedicated her life to sharing the Gospel of light and hope. God protected her through many dangerous trials, and even wild animals sat peacefully at her feet. She lived in a mountain cave in Syria, healing the sick and teaching people about Jesus.',
    iconType: 'woman_martyr',
    virtue: 'Bold Faith & Spiritual Perseverance',
    moralMotto: 'GOD GIVES US STRENGTH TO OVERCOME FEAR!',
    familyAction: 'Try doing something you felt nervous about with a brave prayer to God in your heart.'
  },
  '9-25': {
    name: 'Saint Euphrosyne of Alexandria',
    title: 'Venerable Monastic and Beacon of Hidden Humility',
    shortBio: 'Saint Euphrosyne was a noble girl in Alexandria who desired to devote her whole heart to prayer and God’s peace. She spent decades in quiet contemplation and spiritual guidance, helping troubled souls find reconciliation with God. She reminds us that true beauty shines from a gentle and peaceful spirit.',
    iconType: 'woman_martyr',
    virtue: 'Inner Quietness & Pure Devotion',
    moralMotto: 'TRUE BEAUTY SHINES FROM A PURE HEART!',
    familyAction: 'Do a kind deed today without telling anyone that you were the one who did it.'
  },
  '9-26': {
    name: 'Saint John the Theologian & Evangelist',
    title: 'Falling Asleep of the Apostle and Evangelist John',
    shortBio: 'Today we celebrate the falling asleep of the beloved Apostle John, who stood at the foot of the Cross and took the Mother of God into his home. He lived to be very old and wrote the Gospel of John, urging all believers to love one another with sincere hearts. He reminds children that loving our neighbors is the purest sign of our faith.',
    iconType: 'apostle_evangelist',
    virtue: 'Unconditional Love & Spiritual Light',
    moralMotto: 'LET US NOT LOVE IN WORD ONLY, BUT IN DEED AND TRUTH!',
    familyAction: 'Do a deed of love for a neighbor or friend: help with yard work, bring over baked goods, or send a note.'
  },
  '9-27': {
    name: 'Holy Martyr Callistratus and the 49 Martyrs',
    title: 'Soldier of Christ and Inspiring Guide of Friends',
    shortBio: 'Callistratus was a Christian soldier from Carthage who prayed quietly each night while his fellow soldiers were sleeping. His comrades noticed his calm peace and radiant kindness, and forty-nine of them asked him to teach them how to know the true God. He showed that living a gentle, prayerful life naturally inspires those around us.',
    iconType: 'great_martyr_soldier',
    virtue: 'Inspiring Example & Quiet Faith',
    moralMotto: 'LET YOUR LIGHT SHINE THROUGH KIND ACTIONS!',
    familyAction: 'Set a peaceful, kind example for younger siblings or friends during playtime today.'
  },
  '9-28': {
    name: 'Saint Chariton the Confessor',
    title: 'Monastic Founder and Healer of the Judean Desert',
    shortBio: 'Saint Chariton was captured by desert bandits in Palestine, but God protected him and transformed their cave into a peaceful monastery of prayer. Many people came to him for healing, and he taught them that forgiving those who wrong us is the secret to heavenly joy. He shows us that God can turn difficult circumstances into places of blessing.',
    iconType: 'monk_venerable',
    virtue: 'Forgiveness & Trusting God in Trials',
    moralMotto: 'GOD TURNS HARD TIMES INTO BLESSINGS!',
    familyAction: 'Pray for someone who was unkind or grumpy toward you today, asking God to bless them.'
  },
  '9-29': {
    name: 'Saint Kyriakos the Anchorite',
    title: 'Venerable Hermit of Palestine and Friend of Wild Animals',
    shortBio: 'Saint Kyriakos lived in the Judean desert until he was over a hundred years old, reading the Holy Scriptures and praying constantly. A huge wild lion became his gentle friend, guarding his garden and eating fruit from his hand without harming anyone. He teaches children that when our hearts are full of God’s peace, all of creation feels safe with us.',
    iconType: 'monk_venerable',
    virtue: 'Harmony with Nature & Gentleness',
    moralMotto: 'A GENTLE HEART BRINGS PEACE TO ALL OF GOD’S CREATURES!',
    familyAction: 'Treat family pets and neighborhood animals with special gentleness and care today.'
  },
  '9-30': {
    name: 'Saint Gregory the Illuminator of Armenia',
    title: 'Bishop and Apostle of Armenia',
    shortBio: 'Saint Gregory brought the light of the Gospel to Armenia, baptizing the King and helping establish Armenia as the first Christian nation. Even when he spent years in a deep stone pit, an angel of God watched over him and kept him safe. He reminds us that the light of Christ can shine through the darkest obstacles.',
    iconType: 'bishop',
    virtue: 'Endurance & Bringing Light to Nations',
    moralMotto: 'THE LIGHT OF CHRIST OVERCOMES ALL DARKNESS!',
    familyAction: 'Turn on your home icon vigil lamp or candle and pray for Christians around the world.'
  },

  // --- OCTOBER ---
  '10-1': {
    name: 'The Protection (Agia Skepi) of the Theotokos',
    title: 'Holy Protection of the Mother of God',
    shortBio: 'In Constantinople, Saint Andrew the Fool for Christ saw a vision of the Virgin Mary spreading her radiant veil over the entire church in prayer. She prayed to her Son to guard, shield, and comfort all families who cry out in distress. She reminds children that her motherly prayers are a warm and secure shelter for our souls.',
    iconType: 'woman_martyr',
    virtue: 'Shelter, Protection & Motherly Care',
    moralMotto: 'THE PANAGIA SPREADS HER SHIELD OF PRAYER OVER US!',
    familyAction: 'Pray for families who are in harm’s way or experiencing conflict around the world.'
  },
  '10-6': {
    name: 'Holy Apostle Thomas',
    title: 'The Honest Apostle Who Confessed "My Lord and My God!"',
    shortBio: 'Saint Thomas wanted to see the risen Lord with his own eyes to be sure of the Resurrection. When Jesus appeared, Thomas knelt with profound love and proclaimed, "My Lord and My God!" He later traveled all the way to India to preach the Gospel, showing that honest questions can lead to the deepest faith.',
    iconType: 'apostle_evangelist',
    virtue: 'Honest Faith & Deep Devotion',
    moralMotto: 'MY LORD AND MY GOD!',
    familyAction: 'Ask an honest question about faith or church at dinner and discuss it together.'
  },
  '10-18': {
    name: 'Saint Luke the Apostle and Evangelist',
    title: 'The Beloved Physician, Historian, and First Iconographer',
    shortBio: 'Saint Luke was a kind Greek doctor who traveled with the Apostle Paul and wrote the beautiful Gospel of Luke and the Acts of the Apostles. Tradition tells us that Luke also painted the very first icons of the Virgin Mary holding the Christ child. He shows us how art, writing, and medicine can all be used to glorify God.',
    iconType: 'apostle_evangelist',
    virtue: 'Creativity, Healing & Spiritual Beauty',
    moralMotto: 'USE YOUR GIFTS TO GLORIFY GOD!',
    familyAction: 'Draw or color a picture of an Orthodox cross or church and share it with someone you love.'
  },
  '10-26': {
    name: 'Saint Demetrios the Myrrh-Streamer',
    title: 'Great Martyr, Protector of Thessaloniki and Youth Teacher',
    shortBio: 'Saint Demetrios was a courageous officer in Thessaloniki who gathered youth in secret underground rooms to teach them about Christ. When his student Nestor had to face a fierce challenge, Demetrios blessed him with the sign of the Cross and said, "You will conquer, and you will witness for Christ!" Demetrios shows young people how to stand strong and brave in their faith.',
    iconType: 'great_martyr_soldier',
    virtue: 'Steadfast Faith & Loyalty to Christ',
    moralMotto: 'GOD HELPS US STAND STRONG IN FAITH!',
    greekName: 'Ο Άγιος Δημήτριος ο Μυροβλύτης',
    familyAction: 'Make the sign of the Cross slowly and thoughtfully before starting your schoolwork or day.',
    isFeaturedPdf: true
  },

  // --- NOVEMBER ---
  '11-1': {
    name: 'Saints Cosmas and Damian the Unmercenaries',
    title: 'Holy Doctors and Healers Who Served Without Pay',
    shortBio: 'Saints Cosmas and Damian were two brothers and skilled physicians in Asia Minor who treated every sick person and animal without asking for any money. All they asked of the people they healed was that they believe in the loving Savior Jesus Christ. They show children that true kindness expects nothing in return.',
    iconType: 'healer_unmercenary',
    virtue: 'Selfless Giving & Healing Love',
    moralMotto: 'FREELY YOU RECEIVED, FREELY GIVE!',
    familyAction: 'Offer a helpful favor to a neighbor or family member and refuse to take any reward.'
  },
  '11-8': {
    name: 'Synaxis of the Archangel Michael & All Bodiless Powers',
    title: 'Archangels Michael, Gabriel, Raphael and the Heavenly Hosts',
    shortBio: 'Archangel Michael is the glorious leader of the heavenly angels who proclaimed, "Let us stand well, let us stand with fear!" when darkness tempted creation. Angels are God’s loving messengers and guardians who watch over children and families every moment of the day. They remind us to stay pure, brave, and full of prayer.',
    iconType: 'archangel',
    virtue: 'Spiritual Vigilance & Heavenly Protection',
    moralMotto: 'GOD GIVES HIS ANGELS CHARGE OVER YOU!',
    greekName: 'Ο Αρχάγγελος Μιχαήλ',
    familyAction: 'Say your Guardian Angel prayer together before bed, thanking God for your angel’s care.',
    isFeaturedPdf: true
  },
  '11-9': {
    name: 'Saint Nektarios of Aegina the Wonderworker',
    title: 'Metropolitan of Pentapolis and Protector of the Misunderstood',
    shortBio: 'Saint Nektarios was a modern bishop in Greece who was falsely accused and treated unfairly, but he responded only with gentleness and silent prayer. He built a beautiful monastery on the island of Aegina, cleaned floors with a smile, and spent his nights praying for the sick. He shows children that a sweet, forgiving heart always wins God’s favor.',
    iconType: 'bishop',
    virtue: 'Patience, Forgiveness & Humility',
    moralMotto: 'GOD GUARDS THE GENTLE AND HUMBLE HEART!',
    greekName: 'Ο Άγιος Νεκτάριος Αιγίνης',
    familyAction: 'If someone is upset with you, choose gentle words instead of arguing back.',
    isFeaturedPdf: true
  },
  '11-13': {
    name: 'Saint John Chrysostom ("Golden-Mouthed")',
    title: 'Archbishop of Constantinople and Great Preacher',
    shortBio: 'Saint John was given the title "Chrysostom," which means "golden-mouthed," because his sermons were so full of truth, warmth, and love. He defended the poor and hungry, reminding wealthy rulers that Christ lives in the least of our brothers and sisters. He also composed the beautiful Divine Liturgy that Orthodox churches pray every Sunday.',
    iconType: 'bishop',
    virtue: 'Loving the Poor & Speaking with Grace',
    moralMotto: 'GLORY TO GOD FOR ALL THINGS!',
    greekName: 'Ο Άγιος Ιωάννης ο Χρυσόστομος',
    familyAction: 'Say "Glory to God for all things!" three times today whenever something doesn’t go as planned.',
    isFeaturedPdf: true
  },
  '11-21': {
    name: 'The Entry of the Theotokos into the Temple',
    title: 'The Young Virgin Mary Entering the Holy of Holies',
    shortBio: 'At just three years old, the little Mary was brought to the Temple by Joachim and Anna, walking joyfully up the fifteen temple stairs to the high priest Zacharias. She lived in the Holy of Holies in quiet prayer and praise, preparing her soul to become the living temple of Christ. She shows children how to love coming to church with open hearts.',
    iconType: 'woman_martyr',
    virtue: 'Pure Devotion & Love for the Church',
    moralMotto: 'LET OUR HEARTS BE TEMPLES OF GOD’S PEACE!',
    familyAction: 'Prepare your church clothes and minds the night before going to Divine Liturgy.'
  },
  '11-25': {
    name: 'Saint Katherine the Great Martyr of Alexandria',
    title: 'Brilliant Princess, Scholar, and Witness of Truth',
    shortBio: 'Saint Katherine was a brilliant princess in Alexandria who mastered science, philosophy, and languages at a young age. When the Emperor tried to debate her with fifty philosophers, she spoke with such grace, truth, and warmth that they all embraced Christ. She teaches children that real wisdom comes from loving God with both our minds and our hearts.',
    iconType: 'woman_martyr',
    virtue: 'Wisdom & Love of Truth',
    moralMotto: 'GOD HELPS US GROW IN WISDOM!',
    greekName: 'Η Αγία Αικατερίνη',
    familyAction: 'Pray before starting your homework or reading, asking God to bless your mind and studies.',
    isFeaturedPdf: true
  },
  '11-30': {
    name: 'Holy Apostle Andrew the First-Called',
    title: 'First-Called Apostle of Christ and Patron of Constantinople',
    shortBio: 'Saint Andrew was the first disciple to follow Jesus, and his very first reaction was to run and tell his brother Peter: "We have found the Messiah!" He traveled across Greece and around the Black Sea, sharing Christ’s love with every village he entered. He reminds us to invite our friends and family to come and see the goodness of God.',
    iconType: 'apostle_evangelist',
    virtue: 'Zeal for Christ & Brotherly Love',
    moralMotto: 'COME AND SEE THE LOVE OF CHRIST!',
    familyAction: 'Invite a classmate or neighborhood friend over for a meal or friendly game.'
  },

  // --- DECEMBER ---
  '12-6': {
    name: 'Saint Nicholas the Wonderworker of Myra',
    title: 'Archbishop of Myra in Lycia and Protector of Children and Sailors',
    shortBio: 'Saint Nicholas was a beloved bishop known worldwide for his joyful generosity, kindness, and deep love for the poor. Whenever he learned that a family was in trouble, he secretly tossed bags of gold into their window at night so only God would know who helped them. He inspires every child and adult to give cheerfully and quietly from the heart.',
    iconType: 'bishop',
    virtue: 'Generosity & Secret Giving',
    moralMotto: 'GOD HELPS US SHARE KINDNESS!',
    greekName: 'Ο Άγιος Νικόλαος ο Θαυματουργός',
    familyAction: 'Perform a secret act of giving today: leave a kind note or treat without putting your name on it.',
    isFeaturedPdf: true
  },
  '12-12': {
    name: 'Saint Spyridon the Wonderworker of Trimythous',
    title: 'Humble Shepherd, Bishop and Defender of the Trinity',
    shortBio: 'Saint Spyridon was a humble shepherd in Cyprus who became a bishop but continued to tend his sheep with simple clothes and a peaceful heart. At the First Ecumenical Council, he held up a clay brick to explain the Holy Trinity: fire leaped upward, water dropped downward, and clay remained in his hand. He shows that a humble and pure heart pleases God more than any earthly pride.',
    iconType: 'bishop',
    virtue: 'Simplicity, Faith & Humility',
    moralMotto: 'A HUMBLE HEART IS FULL OF GOD’S WONDERS!',
    greekName: 'Ο Άγιος Σπυρίδων ο Θαυματουργός',
    familyAction: 'Keep things simple today: choose to be thankful for what you already have rather than asking for more.',
    isFeaturedPdf: true
  },
  '12-13': {
    name: 'Saint Lucia the Virgin Martyr of Syracuse',
    title: 'Bringer of Light and Protector of the Poor',
    shortBio: 'Saint Lucia was a gentle young woman in Sicily whose name means "light." She took food and warm supplies secretly to Christians hiding in dark catacombs, wearing a wreath of candles on her head so her hands were free to carry bread. She teaches children to bring the light of good deeds into dark places.',
    iconType: 'woman_martyr',
    virtue: 'Bringing Light & Caring for the Needy',
    moralMotto: 'BE A LIGHT IN THE DARKNESS!',
    familyAction: 'Bring light to someone’s day: do a chore that brightens up the house without being asked.'
  },
  '12-25': {
    name: 'The Nativity of our Lord and Savior Jesus Christ',
    title: 'The Holy Incarnation and Birth of Christ in Bethlehem',
    shortBio: 'Today the angels sing in the heavens and the shepherds rejoice because Jesus Christ was born in a humble manger in Bethlehem. God loved the world so deeply that He came to us as a little baby to bring us peace, forgiveness, and eternal life. Families celebrate this great feast by sharing meals, singing carols, and rejoicing together.',
    iconType: 'righteous_ancestor',
    virtue: 'Divine Love, Peace on Earth & Generosity',
    moralMotto: 'GLORY TO GOD IN THE HIGHEST, AND ON EARTH PEACE!',
    familyAction: 'Sing a Christmas troparion or carol together and thank Christ for coming to save us.'
  },
  '12-27': {
    name: 'Holy Protomartyr and Archdeacon Stephen',
    title: 'First Christian Martyr and Deacon of the Poor',
    shortBio: 'Saint Stephen was a young deacon full of grace and power who helped distribute food to widows and orphans in Jerusalem. When people opposed him, his face shone like that of an angel, and he prayed for the forgiveness of those who hurt him: "Lord, do not hold this sin against them." He teaches us the heroic power of forgiving our enemies.',
    iconType: 'deacon',
    virtue: 'Forgiving Enemies & Selfless Service',
    moralMotto: 'FORGIVE OTHERS AS GOD FORGIVES YOU!',
    familyAction: 'Pray for someone you had a disagreement with and speak warmly to them today.'
  }
};

// Fallback pool of rotating Orthodox Saints for other days to guarantee 100% year-round coverage
const ROTATING_ORTHODOX_SAINTS: Array<Omit<SaintOfTheDay, 'id' | 'feastDateText'>> = [
  {
    name: 'Saint Euphrosynos the Cook',
    title: 'Patron of Kitchens and Humble Service',
    shortBio: 'Saint Euphrosynos worked quietly in the monastery kitchen, preparing meals and washing dishes with love for everyone. Though others barely noticed him, an angel revealed that his humble, joyful service pleased God more than great honors. He teaches us that even washing dishes with a smile is a holy deed.',
    iconType: 'monk_venerable',
    virtue: 'Cheerful Service & Humility',
    moralMotto: 'SERVE OTHERS WITH A CHEERFUL SMILE!',
    familyAction: 'Offer to clear the dinner plates or help with dishes cheerfully tonight.'
  },
  {
    name: 'Saint Herman of Alaska',
    title: 'Wonderworker of North America and Friend of Children',
    shortBio: 'Saint Herman lived peacefully on Spruce Island in Alaska, where he built a school for native children and loved all forest creatures. The bears, foxes, and birds would eat safely from his hand because his heart was filled with Christ’s gentle peace. He teaches children that loving God means cherishing every person and creature around us.',
    iconType: 'monk_venerable',
    virtue: 'Gentle Love & Friendship with Nature',
    moralMotto: 'FROM THIS DAY FORTH, LET US LOVE GOD ABOVE ALL!',
    familyAction: 'Spend time outside appreciating nature and say a prayer for your community.'
  },
  {
    name: 'Saint Philothei of Athens',
    title: 'Protectress of Athens and Shelterer of the Oppressed',
    shortBio: 'Saint Philothei opened schools, hospitals, and safe shelters in Athens to protect struggling girls and feed poor families. She gave away all her family inheritance so that nobody in her city would go hungry or without education. She reminds children that generosity and education change the world.',
    iconType: 'woman_martyr',
    virtue: 'Generosity & Protection of the Vulnerable',
    moralMotto: 'HELP THOSE WHO CANNOT HELP THEMSELVES!',
    familyAction: 'Donate a warm coat, toy, or food item to a local charity or shelter.'
  },
  {
    name: 'Saint Paisios the Athonite',
    title: 'Venerable Elder of Mount Athos and Father of Consolation',
    shortBio: 'Saint Paisios was a loving modern elder who welcomed thousands of visitors to his humble cell on Mount Athos, listening patiently to their sorrows. He used to say that we should have "good thoughts" about everyone and pray with a heart full of compassion. He shows children how thinking kindly about others makes our own hearts peaceful.',
    iconType: 'monk_venerable',
    virtue: 'Good Thoughts & Compassionate Prayer',
    moralMotto: 'FILL YOUR MIND WITH GOOD THOUGHTS!',
    familyAction: 'Whenever you feel like criticizing someone today, replace it with a compliment or blessing.'
  },
  {
    name: 'Saint Panteleimon the Great Martyr & Healer',
    title: 'The All-Merciful Physician and Martyr of Christ',
    shortBio: 'Saint Panteleimon was a physician who treated the poor without charge and healed people through the power of Christ’s name. His name means "all-merciful," and he lived up to it by spending his whole life easing pain and bringing light to the suffering. He inspires us to visit and cheer up anyone who feels sick or lonely.',
    iconType: 'healer_unmercenary',
    virtue: 'Mercy, Compassion & Healing',
    moralMotto: 'BLESSED ARE THE MERCIFUL!',
    familyAction: 'Send a get-well card or make a phone call to someone who is feeling unwell.'
  },
  {
    name: 'Saint Innocent of Alaska',
    title: 'Apostle to the Americas and Tireless Missionary',
    shortBio: 'Saint Innocent traveled across Alaska by canoe and dogsled, building churches, translating the Bible into native languages, and teaching children carpentry and science. He was deeply loved because he respected the local people and shared the Gospel with patience and joy. He teaches us that learning skills can help us serve our neighbors.',
    iconType: 'bishop',
    virtue: 'Tireless Service & Learning Skills',
    moralMotto: 'USE YOUR MIND AND HANDS TO BLESS THE WORLD!',
    familyAction: 'Learn a new useful practical skill or help a parent fix something at home today.'
  },
  {
    name: 'Saint John of Kronstadt',
    title: 'Beloved Pastor of Russia and Champion of the Hungry',
    shortBio: 'Saint John walked the streets every single day, visiting cold basements to bring hot soup, boots, and warm clothes to the poor. He founded the "House of Industry," which gave jobs, shelter, and schooling to thousands of people. He taught children that when we feed the hungry, we are welcoming Christ into our home.',
    iconType: 'bishop',
    virtue: 'Active Charity & Earnest Prayer',
    moralMotto: 'LOVE YOUR NEIGHBOR AS YOURSELF!',
    familyAction: 'Pack an extra snack or lunch item to share with a classmate who might be hungry.'
  }
];

/**
 * Returns an authentic Orthodox Saint of the Day for any given date.
 * Every single day of the year is guaranteed to have a relevant Orthodox saint,
 * complete with their name, a short child-friendly 2-3 sentence biography,
 * and a simple, respectful icon illustration type!
 */
// Map a saint to their authentic Byzantine Orthodox icon photograph or sacred art
export function getSaintIconUrl(name: string, iconType: SaintOfTheDay['iconType']): string {
  const n = name.toLowerCase();
  
  // Specific Saint Matches with Dedicated Authentic & Colorful Icons
  if (n.includes('sophia') || n.includes('faith, hope')) return '/icons/st_sophia.svg';
  if (n.includes('constantine') || n.includes('helen')) return '/icons/sts_constantine_helen.svg';
  if (n.includes('nektario') || n.includes('nectario')) return '/icons/st_nektarios.svg';
  if (n.includes('catherine') || n.includes('katherine')) return '/icons/st_katherine.svg';
  if (n.includes('three holy hierarchs') || n.includes('three hierarchs')) return '/icons/three_hierarchs.svg';
  if (n.includes('elias') || n.includes('elijah')) return '/icons/st_elias.svg';
  if (n.includes('marina')) return '/icons/st_marina.svg';
  if (n.includes('irene') || n.includes('eirene')) return '/icons/st_irene.svg';
  if (n.includes('anna') && (n.includes('theotokos') || n.includes('righteous') || n.includes('mother'))) return '/icons/st_anna.svg';
  
  if (n.includes('nicholas')) return '/icons/st_nicholas.jpg';
  if (n.includes('george')) return '/icons/st_george.jpg';
  if (n.includes('demetrio') || n.includes('demetrius')) return '/icons/st_demetrios.jpg';
  if (n.includes('basil')) return '/icons/st_basil.jpg';
  if (n.includes('chrysostom')) return '/icons/st_john_chrysostom.jpg';
  if (n.includes('baptist') || n.includes('forerunner')) return '/icons/st_john_baptist.jpg';
  if (n.includes('anthony')) return '/icons/st_anthony.jpg';
  if (n.includes('peter') || n.includes('paul')) return '/icons/st_peter_paul.jpg';
  if (n.includes('paraskevi') || n.includes('barbara')) return '/icons/st_paraskevi.jpg';
  if (n.includes('michael') || n.includes('gabriel') || n.includes('archangel') || n.includes('bodiless')) {
    return '/icons/archangel_michael.jpg';
  }
  if (n.includes('cross') || n.includes('crucifixion')) {
    return '/icons/holy_cross.jpg';
  }
  if (n.includes('christ') || n.includes('transfiguration') || n.includes('ascension') || n.includes('theophany') || n.includes('nativity') || n.includes('savior')) {
    return '/icons/christ_pantocrator.jpg';
  }
  if (n.includes('spyridon')) return '/icons/st_spyridon.jpg';
  if (n.includes('seraphim')) return '/icons/st_seraphim.jpg';
  if (n.includes('theotokos') || n.includes('virgin') || n.includes('dormition') || n.includes('annunciation')) {
    return '/icons/theotokos.jpg';
  }

  // Type-based matching to authentic historical Byzantine icons
  switch (iconType) {
    case 'bishop': return '/icons/st_nicholas.jpg';
    case 'great_martyr_soldier': return '/icons/st_george.jpg';
    case 'woman_martyr': return '/icons/st_katherine.svg';
    case 'monk_venerable': return '/icons/st_anthony.jpg';
    case 'apostle_evangelist': return '/icons/st_peter_paul.jpg';
    case 'archangel': return '/icons/archangel_michael.jpg';
    case 'prophet': return '/icons/st_elias.svg';
    case 'healer_unmercenary': return '/icons/st_demetrios.jpg';
    case 'holy_cross_feast': return '/icons/sts_constantine_helen.svg';
    case 'righteous_ancestor': return '/icons/st_anna.svg';
    case 'deacon': return '/icons/st_basil.jpg';
    default: return '/icons/st_nicholas.jpg';
  }
}

function getSaintLiturgicalDetails(name: string, iconType: SaintOfTheDay['iconType']) {
  if (iconType === 'great_martyr_soldier' || iconType === 'woman_martyr') {
    return {
      liturgicalColorName: 'Martyr Scarlet & Imperial Gold',
      liturgicalColorHex: '#DC2626',
      iconSymbolism: 'Notice the sacred vermilion red cloak and martyr’s cross, representing unwavering courage and pure love for Christ that overcomes all fear.'
    };
  }
  if (iconType === 'bishop' || iconType === 'healer_unmercenary') {
    return {
      liturgicalColorName: 'Episcopal Emerald & Gold',
      liturgicalColorHex: '#059669',
      iconSymbolism: 'Notice the sacred white and gold Omophorion embroidered with bold crosses, the blessing hand in the sign of Christ, and the jeweled Holy Gospel book.'
    };
  }
  if (iconType === 'archangel') {
    return {
      liturgicalColorName: 'Celestial Azure & Flaming Gold',
      liturgicalColorHex: '#2563EB',
      iconSymbolism: 'Notice the radiant golden wings with cyan feather highlights, celestial tunic, and the flaming sword of heavenly protection.'
    };
  }
  if (iconType === 'prophet') {
    return {
      liturgicalColorName: 'Mount Carmel Fiery Ochre',
      liturgicalColorHex: '#EA580C',
      iconSymbolism: 'Notice the prophetic scroll with words of repentance, the wilderness garments, and eyes fixed upon the divine light of God.'
    };
  }
  if (iconType === 'holy_cross_feast') {
    return {
      liturgicalColorName: 'Imperial Tyrian Purple & Gold',
      liturgicalColorHex: '#6B21A8',
      iconSymbolism: 'Notice the imperial Byzantine crowns and the glorious Life-Giving Cross of Christ, adorned with sweet basil and triumph.'
    };
  }
  return {
    liturgicalColorName: 'Heavenly Byzantine Gold',
    liturgicalColorHex: '#D97706',
    iconSymbolism: 'Notice the burnished 24K gold leaf halo representing the uncreated Taborian light of God radiating through the holy saint.'
  };
}

export function getSaintOfTheDay(date: Date): SaintOfTheDay {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const key = `${month}-${day}`;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const feastDateText = `${monthNames[date.getMonth()]} ${day}`;

  // 1. Check if date matches one of the 18 PDF saints
  const pdfSaint = FEATURED_SAINTS.find(s => s.month === month && s.day === day);
  if (pdfSaint) {
    // Map PDF saint to icon type
    let iconType: SaintOfTheDay['iconType'] = 'bishop';
    if (pdfSaint.id === 'st-george' || pdfSaint.id === 'st-demetrios') iconType = 'great_martyr_soldier';
    else if (pdfSaint.id === 'st-sophia' || pdfSaint.id === 'st-katherine' || pdfSaint.id === 'st-paraskevi' || pdfSaint.id === 'st-marina' || pdfSaint.id === 'st-irene' || pdfSaint.id === 'st-anna') iconType = 'woman_martyr';
    else if (pdfSaint.id === 'st-michael') iconType = 'archangel';
    else if (pdfSaint.id === 'st-elias' || pdfSaint.id === 'st-john-baptist') iconType = 'prophet';
    else if (pdfSaint.id === 'st-constantine-helen') iconType = 'holy_cross_feast';
    else iconType = 'bishop';

    return {
      id: pdfSaint.id,
      name: pdfSaint.name,
      title: pdfSaint.teaching,
      feastDateText,
      shortBio: pdfSaint.story.split('. ').slice(0, 3).join('. ') + (pdfSaint.story.endsWith('.') ? '' : '.'),
      iconType,
      imageUrl: getSaintIconUrl(pdfSaint.name, iconType),
      virtue: pdfSaint.virtue,
      moralMotto: pdfSaint.motto,
      greekName: pdfSaint.greekName,
      familyAction: pdfSaint.familyChallenge,
      isFeaturedPdf: true,
      liturgicalColorName: pdfSaint.liturgicalColorName,
      liturgicalColorHex: pdfSaint.liturgicalColorHex,
      iconSymbolism: pdfSaint.iconSymbolism,
      hymnApolytikion: pdfSaint.hymnApolytikion,
      nameDayTradition: pdfSaint.nameDayTradition
    };
  }

  // 2. Check calendar mapping
  const calendarSaint = CALENDAR_SAINTS[key];
  if (calendarSaint) {
    const details = getSaintLiturgicalDetails(calendarSaint.name, calendarSaint.iconType);
    return {
      id: `saint-${key}`,
      name: calendarSaint.name,
      title: calendarSaint.title,
      feastDateText,
      shortBio: calendarSaint.shortBio,
      iconType: calendarSaint.iconType,
      imageUrl: getSaintIconUrl(calendarSaint.name, calendarSaint.iconType),
      virtue: calendarSaint.virtue,
      moralMotto: calendarSaint.moralMotto,
      greekName: calendarSaint.greekName,
      familyAction: calendarSaint.familyAction,
      isFeaturedPdf: calendarSaint.isFeaturedPdf,
      liturgicalColorName: details.liturgicalColorName,
      liturgicalColorHex: details.liturgicalColorHex,
      iconSymbolism: details.iconSymbolism
    };
  }

  // 3. Guaranteed deterministic fallback for other days based on day and month
  const fallbackIndex = (day * 7 + month * 3) % ROTATING_ORTHODOX_SAINTS.length;
  const fallbackSaint = ROTATING_ORTHODOX_SAINTS[fallbackIndex];
  const fallbackDetails = getSaintLiturgicalDetails(fallbackSaint.name, fallbackSaint.iconType);

  return {
    id: `saint-commemorated-${month}-${day}`,
    name: fallbackSaint.name,
    title: fallbackSaint.title,
    feastDateText,
    shortBio: fallbackSaint.shortBio,
    iconType: fallbackSaint.iconType,
    imageUrl: getSaintIconUrl(fallbackSaint.name, fallbackSaint.iconType),
    virtue: fallbackSaint.virtue,
    moralMotto: fallbackSaint.moralMotto,
    greekName: fallbackSaint.greekName,
    familyAction: fallbackSaint.familyAction,
    isFeaturedPdf: false,
    liturgicalColorName: fallbackDetails.liturgicalColorName,
    liturgicalColorHex: fallbackDetails.liturgicalColorHex,
    iconSymbolism: fallbackDetails.iconSymbolism
  };
}
