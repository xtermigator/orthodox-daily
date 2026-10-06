export interface OrthodoxQuote {
  id: string;
  quote: string;
  source: string;
  type: 'quote' | 'prayer';
  theme: string;
}

export const ORTHODOX_DAILY_QUOTES: OrthodoxQuote[] = [
  {
    id: 'quote-1',
    quote: 'Acquire a peaceful spirit, and around you thousands will be saved.',
    source: 'St. Seraphim of Sarov',
    type: 'quote',
    theme: 'Inner Peace & Grace'
  },
  {
    id: 'prayer-1',
    quote: 'Lord, grant me to greet the coming day in peace. Help me in all things to rely upon Your holy will, and in every hour teach and guide me.',
    source: 'Morning Prayer of the Optina Elders',
    type: 'prayer',
    theme: 'Daily Guidance'
  },
  {
    id: 'quote-2',
    quote: 'Love is the reason for all things. Where there is Christ, there is no place for sorrow or fear.',
    source: 'St. Porphyrios of Kavsokalyvia',
    type: 'quote',
    theme: 'Divine Love'
  },
  {
    id: 'prayer-2',
    quote: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.',
    source: 'The Jesus Prayer',
    type: 'prayer',
    theme: 'Continuous Prayer'
  },
  {
    id: 'quote-3',
    quote: 'Prayer is the place of refuge for every worry, a foundation for cheerfulness, a source of constant happiness, and a shield against sadness.',
    source: 'St. John Chrysostom',
    type: 'quote',
    theme: 'Power of Prayer'
  },
  {
    id: 'quote-4',
    quote: 'Have humility and warm love in your heart, and Christ will immediately visit your soul and grant you sweet peace.',
    source: 'St. Paisios of Mount Athos',
    type: 'quote',
    theme: 'Humility & Joy'
  },
  {
    id: 'prayer-3',
    quote: 'O Heavenly King, Comforter, Spirit of Truth, Who are everywhere present and fill all things, Treasury of Good Gifts and Giver of Life: come and abide in us, cleanse us from every stain, and save our souls, O Good One.',
    source: 'Prayer to the Holy Spirit (Paraclete)',
    type: 'prayer',
    theme: 'The Holy Spirit'
  },
  {
    id: 'quote-5',
    quote: 'He who has love in his heart is always rich; he who has no love is poorest of all.',
    source: 'St. John of Kronstadt',
    type: 'quote',
    theme: 'Spiritual Wealth'
  },
  {
    id: 'prayer-4',
    quote: 'Lord and Master of my life, take from me the spirit of sloth, despair, lust of power, and idle talk. But give rather the spirit of chastity, humility, patience, and love to Your servant.',
    source: 'Prayer of St. Ephraim the Syrian',
    type: 'prayer',
    theme: 'Virtue & Patience'
  },
  {
    id: 'quote-6',
    quote: 'Glory to God for all things! Never despair, for God never abandons those who trust in His tender mercy.',
    source: 'St. John Chrysostom',
    type: 'quote',
    theme: 'Thanksgiving & Hope'
  },
  {
    id: 'quote-7',
    quote: 'Kindness and gentle words melt ice and open the most closed and troubled hearts.',
    source: 'St. Gabriel of Samtavro',
    type: 'quote',
    theme: 'Kindness & Mercy'
  },
  {
    id: 'prayer-5',
    quote: 'Holy God, Holy Mighty, Holy Immortal, have mercy on us.',
    source: 'The Trisagion Hymn',
    type: 'prayer',
    theme: 'Praise of the Holy Trinity'
  },
  {
    id: 'quote-8',
    quote: 'The soul that has known the Lord is like a happy child that holds its parent’s hand and walks with complete trust.',
    source: 'St. Silouan the Athonite',
    type: 'quote',
    theme: 'Childlike Trust'
  },
  {
    id: 'quote-9',
    quote: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving, let your requests be made known to God.',
    source: 'Holy Apostle Paul (Philippians 4:6)',
    type: 'quote',
    theme: 'Casting Worries on God'
  },
  {
    id: 'prayer-6',
    quote: 'Into Your hands, O Lord, I commend my spirit, my soul, and my body. Bless me, have mercy upon me, and grant me life everlasting.',
    source: 'Orthodox Bedtime Commendation',
    type: 'prayer',
    theme: 'Evening Protection'
  },
  {
    id: 'quote-10',
    quote: 'Teach your children to pray with a peaceful and tender heart, not out of duty, but out of sweet love for the Saviour.',
    source: 'St. Paisios of Mount Athos',
    type: 'quote',
    theme: 'Family Devotion'
  },
  {
    id: 'quote-11',
    quote: 'Light a candle of gentleness in your heart before you light one before the holy icons.',
    source: 'Mother Gavrilia',
    type: 'quote',
    theme: 'Gentleness of Spirit'
  },
  {
    id: 'prayer-7',
    quote: 'Rejoice, O Virgin Theotokos, Mary full of grace, the Lord is with you. Blessed are you among women, and blessed is the fruit of your womb, for you have borne the Saviour of our souls.',
    source: 'The Angelic Salutation to the Mother of God',
    type: 'prayer',
    theme: 'Intercession of the Theotokos'
  },
  {
    id: 'quote-12',
    quote: 'Christ does not want us to be fearful or gloomy; He wants our hearts to overflow with joy, thankfulness, and simple light.',
    source: 'St. Porphyrios of Kavsokalyvia',
    type: 'quote',
    theme: 'Orthodox Joy'
  },
  {
    id: 'quote-13',
    quote: 'Do not judge anyone, for you do not know the hidden tears and silent battles inside their heart.',
    source: 'Abba Moses the Ethiopian',
    type: 'quote',
    theme: 'Compassion & Mercy'
  },
  {
    id: 'prayer-8',
    quote: 'O Lord, enlighten my mind and warm my heart, that I may do good and walk in Your commandments all the days of my life.',
    source: 'Orthodox Daily Student & Youth Prayer',
    type: 'prayer',
    theme: 'Wisdom & Light'
  },
  {
    id: 'quote-14',
    quote: 'Every act of goodness done in quiet humility shines before the angels like a jewel in the sunlight.',
    source: 'St. Basil the Great',
    type: 'quote',
    theme: 'Quiet Charity'
  },
  {
    id: 'quote-15',
    quote: 'A heart that loves God never stops praying; even during work or quiet moments, it breathes thanksgiving.',
    source: 'St. Isaac the Syrian',
    type: 'quote',
    theme: 'Living Prayer'
  },
  {
    id: 'prayer-9',
    quote: 'O Lord, teach me to forgive from my heart, to speak words that heal, and to see Your image in everyone I meet today.',
    source: 'Orthodox Family Daily Petition',
    type: 'prayer',
    theme: 'Forgiveness & Peace'
  },
  {
    id: 'quote-16',
    quote: 'Keep your mind focused on the kingdom of God, and your hands will fulfill every daily duty with grace, patience, and diligence.',
    source: 'St. Nektarios of Aegina',
    type: 'quote',
    theme: 'Patience in Work'
  },
  {
    id: 'quote-17',
    quote: 'Do not look for love from others first; be the one to give love freely, and heavenly peace will fill your whole house.',
    source: 'St. Silouan the Athonite',
    type: 'quote',
    theme: 'Family Harmony'
  },
  {
    id: 'prayer-10',
    quote: 'Angel of God, my holy Guardian, keep my soul under your watchful care, enlighten my mind, and protect me from all harm this day.',
    source: 'Prayer to the Holy Guardian Angel',
    type: 'prayer',
    theme: 'Angelic Protection'
  },
  {
    id: 'quote-18',
    quote: 'Rejoice always, pray without ceasing, in everything give thanks; for this is the will of God in Christ Jesus for you.',
    source: 'Holy Apostle Paul (1 Thessalonians 5:16-18)',
    type: 'quote',
    theme: 'Joyful Devotion'
  },
  {
    id: 'prayer-11',
    quote: 'May the peace of God, which surpasses all human understanding, guard your hearts and thoughts in Christ Jesus.',
    source: 'Apostolic Blessing (Philippians 4:7)',
    type: 'prayer',
    theme: 'Peace of Christ'
  },
  {
    id: 'quote-19',
    quote: 'Make yourself little and humble in your own eyes, and God will lift you up into the warmth of His great love.',
    source: 'St. Anthony the Great',
    type: 'quote',
    theme: 'Humility'
  },
  {
    id: 'prayer-12',
    quote: 'Blessed are You, O Lord God of our fathers, praised and glorified is Your name forever. Amen.',
    source: 'Song of the Three Holy Youths',
    type: 'prayer',
    theme: 'Unending Praise'
  }
];

/**
 * Returns a deterministic daily Orthodox quote based on a given date.
 */
export function getDailyOrthodoxQuote(date: Date): OrthodoxQuote {
  // Use day of year to deterministically choose a quote
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  // Positive modulo
  const index = Math.abs((dayOfYear + date.getFullYear()) % ORTHODOX_DAILY_QUOTES.length);
  return ORTHODOX_DAILY_QUOTES[index];
}
