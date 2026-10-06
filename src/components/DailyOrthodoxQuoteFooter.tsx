import React, { useState, useEffect, useMemo } from 'react';
import { ORTHODOX_DAILY_QUOTES, getDailyOrthodoxQuote, OrthodoxQuote } from '../data/orthodoxQuotes';
import { audioEngine } from '../services/audioService';

interface DailyOrthodoxQuoteFooterProps {
  selectedDate?: Date;
}

export const DailyOrthodoxQuoteFooter: React.FC<DailyOrthodoxQuoteFooterProps> = ({ selectedDate = new Date() }) => {
  // Base daily quote for the selected date
  const dailyBaseQuote = useMemo(() => {
    return getDailyOrthodoxQuote(selectedDate);
  }, [selectedDate]);

  // Current quote index (can be cycled by user)
  const [activeQuote, setActiveQuote] = useState<OrthodoxQuote>(dailyBaseQuote);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync when selectedDate changes
  useEffect(() => {
    setActiveQuote(dailyBaseQuote);
  }, [dailyBaseQuote]);

  // Clean up audio on unmount or quote change
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, [activeQuote]);

  const handleNextQuote = () => {
    audioEngine.stop();
    setIsPlayingAudio(false);
    const currentIndex = ORTHODOX_DAILY_QUOTES.findIndex(q => q.id === activeQuote.id);
    const nextIndex = (currentIndex + 1) % ORTHODOX_DAILY_QUOTES.length;
    setActiveQuote(ORTHODOX_DAILY_QUOTES[nextIndex]);
  };

  const handleResetToDaily = () => {
    audioEngine.stop();
    setIsPlayingAudio(false);
    setActiveQuote(dailyBaseQuote);
  };

  const handleCopyQuote = async () => {
    try {
      const textToCopy = `"${activeQuote.quote}" — ${activeQuote.source}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
      return;
    }

    const narrationText = `${activeQuote.quote}. From ${activeQuote.source}.`;
    setIsPlayingAudio(true);
    audioEngine.speakPassage(
      `quote-${activeQuote.id}`,
      narrationText,
      'en',
      () => {
        setIsPlayingAudio(false);
      },
      'byzantine' // Default to Father Paisios
    );
  };

  const isDailyQuote = activeQuote.id === dailyBaseQuote.id;

  return (
    <div className="mt-6 pt-5 border-t border-[#E8DCCB] text-left">
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EA] to-[#F5ECE0] rounded-xl p-4 sm:p-5 border border-[#E4D5C2] shadow-sm relative overflow-hidden">
        {/* Subtle Orthodox decorative watermark */}
        <div className="absolute -right-3 -bottom-4 text-7xl select-none pointer-events-none opacity-5 text-[#8C6D46] font-cinzel">
          ☦
        </div>

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#EADBCA]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EADBCA] text-[#7A5828] flex items-center justify-center font-cinzel text-xs font-bold shadow-inner">
              ☦
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-bold tracking-wider uppercase text-[#73522E]">
                  Daily Orthodox Word of Wisdom
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    activeQuote.type === 'prayer'
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  {activeQuote.type === 'prayer' ? '☦ Prayer Excerpt' : '✦ Holy Father Wisdom'}
                </span>
              </div>
              <span className="text-[10px] text-[#8C7662]">
                {activeQuote.theme} • {isDailyQuote ? "Today's Selection" : 'Devotional Excerpt'}
              </span>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-medium transition cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-700 text-white border-amber-800 animate-pulse'
                  : 'bg-white hover:bg-[#F3EADE] text-[#63482D] border-[#D8C6B1]'
              }`}
              title={isPlayingAudio ? 'Stop reading' : 'Listen to this excerpt'}
              aria-label="Listen to quote"
            >
              <span>{isPlayingAudio ? '⏹ Stop' : '🔊 Listen'}</span>
            </button>

            <button
              onClick={handleCopyQuote}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-[#F3EADE] text-[#63482D] border border-[#D8C6B1] text-[11px] font-medium transition cursor-pointer"
              title="Copy quote to clipboard"
            >
              <span>{copied ? '✓ Copied!' : '📋 Copy'}</span>
            </button>

            <button
              onClick={handleNextQuote}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-[#F3EADE] text-[#63482D] border border-[#D8C6B1] text-[11px] font-medium transition cursor-pointer"
              title="Read another excerpt"
            >
              <span>↻ Next</span>
            </button>

            {!isDailyQuote && (
              <button
                onClick={handleResetToDaily}
                className="px-2 py-1 rounded-md bg-[#EADBCA] hover:bg-[#DBCABA] text-[#553C22] text-[10px] font-semibold transition cursor-pointer"
                title="Return to today's quote"
              >
                Today
              </button>
            )}
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative pl-3 border-l-2 border-[#C9A979]">
          <p className="font-serif italic text-sm sm:text-base text-[#3E2E20] leading-relaxed">
            &ldquo;{activeQuote.quote}&rdquo;
          </p>
          <div className="mt-2 flex items-center justify-between flex-wrap gap-1">
            <span className="text-xs font-semibold text-[#825B30] font-cinzel">
              — {activeQuote.source}
            </span>
            <span className="text-[10px] text-[#A08975] italic">
              Orthodox Spiritual Heritage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
