import React, { useState, useEffect } from 'react';
import { QuestionOfTheDay, SaintOfTheDay, ScriptureReading } from '../types';
import { 
  MessageSquare, 
  Sparkles, 
  Users, 
  Heart, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  Send, 
  Award,
  BookOpen,
  Compass,
  Smile,
  Flame
} from 'lucide-react';

interface QuestionOfTheDaySectionProps {
  questionData: QuestionOfTheDay;
  saint: SaintOfTheDay;
  scripture: ScriptureReading;
  dateString: string;
  isLargeText?: boolean;
  onReadQuestionAudio?: (text: string) => void;
  isAudioSpeaking?: boolean;
}

interface FamilyNote {
  id: string;
  author: string;
  text: string;
  time: string;
}

export const QuestionOfTheDaySection: React.FC<QuestionOfTheDaySectionProps> = ({
  questionData,
  saint,
  scripture,
  dateString,
  isLargeText = false,
  onReadQuestionAudio,
  isAudioSpeaking = false
}) => {
  // Age-prompt tab selection: 'child' | 'older' | 'parent'
  const [activePromptTab, setActivePromptTab] = useState<'child' | 'older' | 'parent'>('child');

  // Family virtue reaction counts
  const [virtueVotes, setVirtueVotes] = useState<Record<string, number>>({
    'Kindness': 0,
    'Courage': 0,
    'Patience': 0,
    'Forgiveness': 0,
    'Generosity': 0
  });

  // Discussion completion state
  const [isCompleted, setIsCompleted] = useState(false);

  // Family sharing notes
  const [familyNotes, setFamilyNotes] = useState<FamilyNote[]>([]);
  const [authorInput, setAuthorInput] = useState('Our Child');
  const [noteInput, setNoteInput] = useState('');

  // Load saved notes and completion for this date
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(`orthodox_notes_${dateString}`);
      if (savedNotes) {
        setFamilyNotes(JSON.parse(savedNotes));
      } else {
        setFamilyNotes([]);
      }

      const savedCompleted = localStorage.getItem(`orthodox_discussed_${dateString}`);
      setIsCompleted(savedCompleted === 'true');

      const savedVotes = localStorage.getItem(`orthodox_votes_${dateString}`);
      if (savedVotes) {
        setVirtueVotes(JSON.parse(savedVotes));
      }
    } catch {
      // Fallback if localStorage unavailable
    }
  }, [dateString]);

  // Handle vote on virtue
  const handleVoteVirtue = (virtueKey: string) => {
    const updated = {
      ...virtueVotes,
      [virtueKey]: (virtueVotes[virtueKey] || 0) + 1
    };
    setVirtueVotes(updated);
    try {
      localStorage.setItem(`orthodox_votes_${dateString}`, JSON.stringify(updated));
    } catch {}
  };

  // Add a family reflection note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;

    const newNote: FamilyNote = {
      id: Date.now().toString(),
      author: authorInput.trim() || 'Family Member',
      text: noteInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newNote, ...familyNotes];
    setFamilyNotes(updated);
    setNoteInput('');
    try {
      localStorage.setItem(`orthodox_notes_${dateString}`, JSON.stringify(updated));
    } catch {}
  };

  // Toggle discussion completed
  const handleToggleCompleted = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    try {
      localStorage.setItem(`orthodox_discussed_${dateString}`, String(nextState));
    } catch {}
  };

  const currentAgePrompt = 
    activePromptTab === 'child'
      ? questionData.childPrompt
      : activePromptTab === 'older'
      ? questionData.olderKidPrompt
      : questionData.parentPrompt;

  return (
    <section 
      id="question-of-the-day-section"
      className="bg-[#FFFDF9] rounded-2xl p-6 border-2 border-[#D4AF37]/50 shadow-sm transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative Golden Cross Watermark */}
      <div className="absolute top-2 right-4 text-[48px] text-[#D4AF37]/10 font-bold pointer-events-none select-none">
        ☦
      </div>

      {/* Top Banner & Context */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5A2B] to-[#5C3A1E] text-[#FDE047] flex items-center justify-center font-bold shadow-xs">
            <MessageSquare className="w-5 h-5 text-[#FDE047]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#2D2115]">
                Question of the Day
              </h2>
              <span className="text-[10px] font-bold bg-[#FAF0DC] text-[#8B5A2B] px-2.5 py-0.5 rounded-full border border-[#E5D2B8] uppercase tracking-wider">
                Family Discussion
              </span>
            </div>
            <p className="text-xs text-[#826953]">
              {questionData.sourceContext}
            </p>
          </div>
        </div>

        {/* Listen Aloud Button */}
        {onReadQuestionAudio && (
          <button
            id="read-question-audio-btn"
            onClick={() => onReadQuestionAudio(questionData.mainQuestion + ' ' + currentAgePrompt)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isAudioSpeaking 
                ? 'bg-[#B91C1C] text-white animate-pulse' 
                : 'bg-[#FAF2E6] hover:bg-[#F3E5D0] text-[#78350F] border border-[#E8D4B0]'
            }`}
            title="Listen to today's question read in a friendly female voice"
          >
            {isAudioSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#D97706]" />
                <span>Listen to Question</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Primary Big Discussion Question Box */}
      <div className="bg-gradient-to-br from-[#FAF5EC] to-[#F5EBD9] rounded-2xl p-5 border border-[#E8D8C0] shadow-xs mb-5">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#D4AF37]/25 text-[#78350F] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] mb-1">
              {questionData.basedOn === 'saint' ? `Based on ${saint.name}` : `Based on Today's Scripture (${scripture.passageRef})`}
            </div>
            <p className={`font-reading text-[#2A1B0E] font-medium leading-relaxed ${
              isLargeText ? 'text-lg leading-loose' : 'text-base sm:text-lg'
            }`}>
              "{questionData.mainQuestion}"
            </p>
          </div>
        </div>
      </div>

      {/* Age-Adapted Interactive Prompts Switcher */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-[#78350F] flex items-center gap-1.5 uppercase tracking-wide">
            <Users className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Choose Your Family Perspective:</span>
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-2 bg-[#F3ECE0] p-1.5 rounded-xl border border-[#E5D7C2] mb-3">
          <button
            id="tab-prompt-child"
            type="button"
            onClick={() => setActivePromptTab('child')}
            className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activePromptTab === 'child'
                ? 'bg-[#FFFDFB] text-[#78350F] shadow-xs border border-[#D4AF37]/50'
                : 'text-[#8A7766] hover:text-[#573514]'
            }`}
          >
            🌟 Little Kids <span className="hidden sm:inline font-normal">(4-8)</span>
          </button>

          <button
            id="tab-prompt-older"
            type="button"
            onClick={() => setActivePromptTab('older')}
            className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activePromptTab === 'older'
                ? 'bg-[#FFFDFB] text-[#78350F] shadow-xs border border-[#D4AF37]/50'
                : 'text-[#8A7766] hover:text-[#573514]'
            }`}
          >
            💡 Youth <span className="hidden sm:inline font-normal">(9-14)</span>
          </button>

          <button
            id="tab-prompt-parent"
            type="button"
            onClick={() => setActivePromptTab('parent')}
            className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activePromptTab === 'parent'
                ? 'bg-[#FFFDFB] text-[#78350F] shadow-xs border border-[#D4AF37]/50'
                : 'text-[#8A7766] hover:text-[#573514]'
            }`}
          >
            🕊️ Parents <span className="hidden sm:inline font-normal">& Elders</span>
          </button>
        </div>

        {/* Active Prompt Card */}
        <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#E9DECD] text-[#33261A] transition-all">
          <div className="text-[11px] font-bold text-[#8C5D19] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-[#D97706]" />
            <span>
              {activePromptTab === 'child' ? 'Prompt for Younger Children:' : activePromptTab === 'older' ? 'Prompt for Growing Kids & Teens:' : 'Heart-to-Heart for Parents:'}
            </span>
          </div>
          <p className={`font-reading leading-relaxed italic ${isLargeText ? 'text-base' : 'text-sm'}`}>
            "{currentAgePrompt}"
          </p>
        </div>
      </div>

      {/* Interactive Virtue Voting Chips */}
      <div className="mb-5 bg-[#FAF7F2] rounded-xl p-4 border border-[#EBE1D2]">
        <div className="text-xs font-bold text-[#6D4C2B] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#B91C1C]" />
            <span>Tap the virtues this question inspired today:</span>
          </span>
          <span className="text-[10px] font-normal text-[#8A7766] italic">
            Tap to vote together
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(virtueVotes).map(([virtue, count]) => (
            <button
              key={virtue}
              id={`vote-virtue-${virtue.toLowerCase()}`}
              type="button"
              onClick={() => handleVoteVirtue(virtue)}
              className="flex items-center gap-1.5 bg-[#FFFDFB] hover:bg-[#FFF8EC] text-[#5C3A1E] hover:text-[#B45309] px-3 py-1.5 rounded-full border border-[#D8C7B0] hover:border-[#D4AF37] text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <span>{virtue}</span>
              {count > 0 && (
                <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  +{count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Family Discussion Journal / Sharing Box */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-[#78350F] flex items-center gap-1.5 uppercase tracking-wide">
            <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Family Answers & Shared Thoughts:</span>
          </span>
          <span className="text-[11px] text-[#8C7662]">
            {familyNotes.length} {familyNotes.length === 1 ? 'thought recorded' : 'thoughts recorded'}
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-2 mb-3">
          <select
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            className="bg-[#FAF7F2] text-xs font-semibold text-[#5C3A1E] rounded-xl px-3 py-2 border border-[#E2D4C0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="Our Child">Our Child</option>
            <option value="Parent">Parent</option>
            <option value="Brother / Sister">Sibling</option>
            <option value="Whole Family">Whole Family</option>
          </select>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Type what was shared in our discussion..."
              className="flex-1 bg-[#FFFDFB] text-xs text-[#2D2115] placeholder-[#9C8B7B] rounded-xl px-3.5 py-2 border border-[#E2D4C0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              id="save-discussion-thought-btn"
              type="submit"
              disabled={!noteInput.trim()}
              className="bg-[#78350F] hover:bg-[#5C270A] disabled:opacity-40 text-[#FFFBEB] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </form>

        {/* Recorded Notes Feed */}
        {familyNotes.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {familyNotes.map((note) => (
              <div 
                key={note.id}
                className="bg-[#FAF7F2] rounded-xl p-3 border border-[#ECE2D2] flex items-start justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-[#78350F] mr-2">
                    {note.author}:
                  </span>
                  <span className="text-[#33261A] italic">
                    "{note.text}"
                  </span>
                </div>
                <span className="text-[10px] text-[#A39281] shrink-0">
                  {note.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Practical Family Action Box */}
      <div className="bg-[#FFF9EE] rounded-xl p-3.5 border border-[#F5E6CC] text-xs text-[#6B4E1B] mb-5">
        <div className="flex items-center gap-1.5 font-bold mb-1 text-[#8C5D19]">
          <Flame className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Practical Action Idea for Today:</span>
        </div>
        <p className="text-[#5C3D18]">
          {questionData.practicalActionIdea}
        </p>
      </div>

      {/* "We Discussed This Together!" Action Card */}
      <div className={`p-4 rounded-xl border-2 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isCompleted 
          ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]' 
          : 'bg-[#FAF7F2] border-[#E8DEC8] text-[#5C3A1E]'
      }`}>
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            isCompleted ? 'bg-[#22C55E] text-white shadow-xs' : 'bg-[#E7DAC7] text-[#8C7662]'
          }`}>
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm">
              {isCompleted ? 'Discussion Completed Together! 🌟' : 'Ready to mark today\'s discussion completed?'}
            </div>
            <p className="text-[11px] opacity-80">
              {isCompleted 
                ? 'May God bless your family\'s shared conversation and holy fellowship.' 
                : 'Spend 2-3 minutes talking through the prompt together before dinner or bedtime.'}
            </p>
          </div>
        </div>

        <button
          id="mark-discussed-together-btn"
          type="button"
          onClick={handleToggleCompleted}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ${
            isCompleted
              ? 'bg-[#15803D] hover:bg-[#166534] text-white'
              : 'bg-[#8B5A2B] hover:bg-[#5C3A1E] text-white hover:shadow-md'
          }`}
        >
          {isCompleted ? 'Discussed! (Tap to reset)' : 'We Discussed This! ✓'}
        </button>
      </div>

      {/* Completed Family Blessing Ribbon */}
      {isCompleted && (
        <div className="mt-3 p-3 bg-gradient-to-r from-[#FEF9C3] via-[#FEF08A] to-[#FEF9C3] rounded-xl text-center border border-[#FACC15] text-[#854D0E] text-xs font-bold animate-fade-in shadow-xs">
          ✝ "Blessed is the home that gathers in Christ's love. Peace be unto this house!"
        </div>
      )}
    </section>
  );
};
