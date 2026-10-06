import { QuestionOfTheDay, SaintOfTheDay, ScriptureReading } from '../types';

// Curated date-specific discussion questions anchored to key Orthodox feasts and scripture
const SPECIFIC_DATE_QUESTIONS: Record<string, QuestionOfTheDay> = {
  // Sept 18: St. Eumenios / Galatians 5:22-26 (Gentleness & Fruit of the Spirit)
  '9-18': {
    mainQuestion: 'Saint Eumenios was called the "Father of the Poor" because he met every troubled person with gentle words and warm hospitality. When someone in our family is having a rough or grumpy day, what is one gentle thing we can do to make their heart feel peaceful?',
    sourceContext: 'Inspired by Saint Eumenios\'s gentleness & St. Paul\'s Epistle on the Fruits of the Spirit',
    basedOn: 'saint',
    childPrompt: 'Can you give someone in our family a gentle hug or say a kind word right now?',
    olderKidPrompt: 'When someone at school or online is angry, why is answering with gentle patience much stronger than fighting back?',
    parentPrompt: 'What helps you pause and choose gentleness when family life feels rushed or stressful?',
    suggestedVirtue: 'Gentleness & Compassion',
    practicalActionIdea: 'Leave a secret sticky note or kind surprise for a family member today.'
  },

  // Sept 19: Holy Martyrs Trophimus & Companions / John 15:12-15 ("Love one another")
  '9-19': {
    mainQuestion: 'In today\'s Gospel, Jesus commands: "Love one another as I have loved you." Saint Trophimus and his friends always encouraged each other in faith. Who is a friend or family member who has helped you, and how can you show them today that you are grateful for their friendship?',
    sourceContext: 'Inspired by Christ\'s commandment in John 15:12 and the Holy Martyrs Trophimus, Sabbatius & Dorymedon',
    basedOn: 'scripture',
    childPrompt: 'Who is a friend you love playing with? Let\'s say a quiet prayer for them by name right now.',
    olderKidPrompt: 'What makes a true, loyal Christian friend different from someone who only hangs around when it\'s fun?',
    parentPrompt: 'Share a story about a faithful friend or mentor who helped you through a challenging time in your life.',
    suggestedVirtue: 'Loyal Christian Friendship',
    practicalActionIdea: 'Send a message, make a drawing, or call a friend or family member to say "I\'m thinking of you."'
  },

  // Jan 1: St. Basil the Great
  '1-1': {
    mainQuestion: 'Saint Basil baked gold coins inside sweet breads so struggling families could receive help with dignity. How can our family give or share this week in a way that is joyful and humble, without boasting?',
    sourceContext: 'Inspired by Saint Basil the Great of Caesarea and the tradition of the Vasilopita',
    basedOn: 'saint',
    childPrompt: 'What is one favorite toy or treat you would be willing to share with a friend or sibling?',
    olderKidPrompt: 'Why did Saint Basil help people in secret rather than advertising his good deeds?',
    parentPrompt: 'How can we build a culture of cheerful, quiet charity into our family\'s daily habits?',
    suggestedVirtue: 'Generosity & Joyful Giving',
    practicalActionIdea: 'Prepare a meal or small gift box for someone who could use encouragement.'
  },

  // Jan 6: The Holy Theophany
  '1-6': {
    mainQuestion: 'At Theophany, Christ sanctified the waters of the Jordan River, showing that God loves and renews all of His creation. How can our family take loving care of God\'s world—our home, plants, pets, and neighborhood—this week?',
    sourceContext: 'Inspired by the Great Blessing of the Waters on the Feast of Theophany',
    basedOn: 'scripture',
    childPrompt: 'What is your favorite animal or nature spot that God made? Let\'s thank Him for it!',
    olderKidPrompt: 'What does it mean that as Orthodox Christians we see God\'s blessing in physical things like water and oil?',
    parentPrompt: 'How does celebrating Theophany remind us to refresh our spiritual commitments as parents?',
    suggestedVirtue: 'Gratitude & Care for Creation',
    practicalActionIdea: 'Sprinkle blessed holy water around your home and tidy up an outdoor space together.'
  },

  // Oct 18: St. Luke the Evangelist
  '10-18': {
    mainQuestion: 'Saint Luke was both a caring physician and a gifted icon painter who used all his talents for God. What special gift, hobby, or talent has God given you, and how can you use it to bring joy or healing to others?',
    sourceContext: 'Inspired by Saint Luke the Apostle, Physician, and Iconographer',
    basedOn: 'saint',
    childPrompt: 'Do you like drawing, singing, or helping? How can you make someone smile with your talent today?',
    olderKidPrompt: 'How can modern careers like science, medicine, coding, or art be holy ways to serve Christ?',
    parentPrompt: 'How can we nurture our children\'s God-given talents without creating worldly anxiety or pressure?',
    suggestedVirtue: 'Holy Creativity & Service',
    practicalActionIdea: 'Create a drawing, letter, or craft and give it to someone who is ill or lonely.'
  },

  // Dec 6: St. Nicholas the Wonderworker
  '12-6': {
    mainQuestion: 'Saint Nicholas tossed bags of gold through a window at night so a father could provide for his daughters without embarrassment. Have you ever done something kind when no one was watching? Why does God love secret giving?',
    sourceContext: 'Inspired by the life and miracles of Saint Nicholas of Myra',
    basedOn: 'saint',
    childPrompt: 'Can you do a secret helper chore at home today before anyone notices who did it?',
    olderKidPrompt: 'Why is it tempting to want applause for good deeds, and how did Saint Nicholas overcome that pride?',
    parentPrompt: 'Share how giving sacrificially as a family has blessed your own spiritual walk.',
    suggestedVirtue: 'Quiet Charity & Humility',
    practicalActionIdea: 'Slip an anonymous gift, food donation, or encouraging card into a local church or community box.'
  },

  // Dec 25: Nativity of Christ
  '12-25': {
    mainQuestion: 'God came into the world not in a royal palace, but in a humble cave and was laid in a simple wooden feeding trough. What does Christ\'s humble birth teach us about what truly matters in life?',
    sourceContext: 'Inspired by the Holy Nativity of our Lord, God, and Savior Jesus Christ',
    basedOn: 'scripture',
    childPrompt: 'What is the best gift you can give Jesus for His birthday today?',
    olderKidPrompt: 'In a world that celebrates Christmas with noise and shopping, how can we keep our hearts focused on Christ\'s peace?',
    parentPrompt: 'What family Christmas tradition brings you closest to the true spirit of the Nativity?',
    suggestedVirtue: 'Humility & Sacred Wonder',
    practicalActionIdea: 'Gather by the icon corner to sing the Nativity Troparion together before opening presents.'
  }
};

// Universal virtue question templates based on Saint's virtue or scripture
export function getQuestionOfTheDay(
  date: Date,
  saint: SaintOfTheDay,
  scripture: ScriptureReading
): QuestionOfTheDay {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateKey = `${month}-${day}`;

  // Check specific curated feast questions
  if (SPECIFIC_DATE_QUESTIONS[dateKey]) {
    return SPECIFIC_DATE_QUESTIONS[dateKey];
  }

  // Dynamic question anchored to the Saint's virtue
  const v = saint.virtue.toLowerCase();
  
  if (v.includes('generos') || v.includes('giving') || v.includes('almsgiving')) {
    return {
      mainQuestion: `${saint.name} taught us that when we give freely to others, our hearts become rich in God's love. What is something our family has in abundance—time, toys, smiles, or warm food—that we can share with someone in need this week?`,
      sourceContext: `Inspired by ${saint.name}'s life of ${saint.virtue}`,
      basedOn: 'saint',
      childPrompt: 'Who is one person you would like to share your favorite snack or game with today?',
      olderKidPrompt: 'Why can sharing feel scary or hard sometimes, and how does trusting Jesus make us generous?',
      parentPrompt: 'How can we help our home be a place of hospitality where neighbors and friends always feel welcome?',
      suggestedVirtue: 'Generosity & Joyful Giving',
      practicalActionIdea: 'Pick out two pantry items or gently used items together to donate to a local shelter.'
    };
  }

  if (v.includes('courage') || v.includes('brave') || v.includes('martyr') || v.includes('steadfast')) {
    return {
      mainQuestion: `${saint.name} had great courage because they knew that Jesus was always by their side. When have you felt nervous, afraid, or shy recently, and how can remembering God help give you bravery?`,
      sourceContext: `Inspired by ${saint.name}'s courage and steadfast faith`,
      basedOn: 'saint',
      childPrompt: 'What makes you feel brave when you are afraid of the dark or trying something new?',
      olderKidPrompt: 'How can you stand up for someone being left out or teased at school, even if it feels awkward?',
      parentPrompt: 'Share a moment in your life when your faith in God helped you walk through fear.',
      suggestedVirtue: 'Courage in Christ',
      practicalActionIdea: 'Say a 5-second prayer: "Lord Jesus Christ, give me courage to do what is right today."'
    };
  }

  if (v.includes('peace') || v.includes('prayer') || v.includes('quiet') || v.includes('monk')) {
    return {
      mainQuestion: `${saint.name} showed that a quiet, praying heart is stronger than any worry. In our busy days full of screens, noise, and hurry, how can our family create moments of holy calm and stillness together?`,
      sourceContext: `Inspired by ${saint.name}'s peace of heart and life of prayer`,
      basedOn: 'saint',
      childPrompt: 'Let\'s close our eyes together for 30 seconds and whisper "Lord Jesus, bless our home."',
      olderKidPrompt: 'When your mind feels stressed with homework or worries, how can a short Jesus Prayer help you reset?',
      parentPrompt: 'What boundaries can we set on digital distractions to protect peaceful family connection?',
      suggestedVirtue: 'Peace of Heart & Prayer',
      practicalActionIdea: 'Turn off all screens during dinner tonight and light a candle by your icon.'
    };
  }

  if (v.includes('friend') || v.includes('love') || v.includes('unity')) {
    return {
      mainQuestion: `In today's scripture and the life of ${saint.name}, we are reminded that Christ calls us to love one another deeply. What is one practical way we can show honor and kindness to each other right here in our home today?`,
      sourceContext: `Inspired by today's Holy Scripture (${scripture.passageRef}) and ${saint.name}`,
      basedOn: 'scripture',
      childPrompt: 'What is one nice thing your brother, sister, or parent did for you today? Let\'s tell them thank you!',
      olderKidPrompt: 'How does forgiving someone quickly keep a friendship healthy and strong?',
      parentPrompt: 'How can we model healthy reconciliation and asking for forgiveness in our family relationships?',
      suggestedVirtue: 'Brotherly Love & Forgiveness',
      practicalActionIdea: 'Give a heartfelt compliment or verbal thank-you to each family member before bedtime.'
    };
  }

  // Default universal reflection anchored to scripture and saint
  return {
    mainQuestion: `Reflecting on ${saint.name}'s life and today's reading ("${scripture.readingTitle}"), what is one holy habit or virtue that God is asking our family to grow in right now?`,
    sourceContext: `Inspired by ${saint.name} and ${scripture.passageRef}`,
    basedOn: 'saint',
    childPrompt: 'What is your favorite prayer or hymn to sing when you are feeling happy?',
    olderKidPrompt: 'If a classmate asked you why being an Orthodox Christian matters to you, what would you share?',
    parentPrompt: 'How has God shown His faithfulness to our family in recent days?',
    suggestedVirtue: saint.virtue || 'Faith & Lovingkindness',
    practicalActionIdea: 'Say the family evening prayer together with reverent bowing and thank God for one blessing.'
  };
}
