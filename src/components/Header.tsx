import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  Award, 
  Heart, 
  Volume2,
  Palette
} from 'lucide-react';
import { BackgroundThemeId, BACKGROUND_THEMES } from '../types/theme';
import { audioEngine, AudioPlaybackState } from '../services/audioService';
import { VOICE_PROFILES } from '../data/childrenPrayers';

interface HeaderProps {
  currentMode: 'daily' | 'prayers' | 'holy-week';
  onSelectMode: (mode: 'daily' | 'prayers' | 'holy-week') => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onResetToday: () => void;
  isToday: boolean;
  onOpenSaintsModal: () => void;
  onOpenGoarchModal: () => void;
  onOpenVoiceMenu?: () => void;
  currentTheme?: BackgroundThemeId;
  onSelectTheme?: (themeId: BackgroundThemeId) => void;
  onOpenThemeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  selectedDate,
  onDateChange,
  onResetToday,
  isToday,
  onOpenSaintsModal,
  onOpenGoarchModal,
  onOpenVoiceMenu,
  currentTheme = 'parchment',
  onSelectTheme,
  onOpenThemeModal,
}) => {
  const [audioState, setAudioState] = useState<AudioPlaybackState>(audioEngine.getState());

  useEffect(() => {
    return audioEngine.subscribe((s) => setAudioState(s));
  }, []);

  const activeProfile = VOICE_PROFILES[audioState.activeProfileId] || VOICE_PROFILES.byzantine;
  const activeThemeObj = BACKGROUND_THEMES[currentTheme] || BACKGROUND_THEMES.parchment;
  const handlePrevDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() - 1);
    onDateChange(next);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    onDateChange(next);
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const [year, month, day] = e.target.value.split('-').map(Number);
      const newDate = new Date(year, month - 1, day);
      onDateChange(newDate);
    }
  };

  const formattedIsoDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  return (
    <header id="app-header" className="bg-[#1F1710] text-[#FDFBFA] border-b border-[#3E2F20] sticky top-0 z-40 shadow-md">
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#78540E] flex items-center justify-center shadow-inner text-[#1F1710] font-bold text-lg border border-[#F3E5AB]">
            ☦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel tracking-wider text-lg font-bold text-[#F3E5AB]">
                Orthodox Daily Companion
              </span>
              <span className="text-[11px] bg-[#3B2A18] text-[#E2C799] px-2 py-0.5 rounded-full font-medium border border-[#523C24]">
                Kids & Families
              </span>
            </div>
            <p className="text-xs text-[#BBAA99]">
              Reverent daily prayers, scripture, and saints of the Church
            </p>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-[#2D2115] p-1.5 rounded-xl border border-[#483522]">
          <button
            id="nav-daily-calendar-btn"
            onClick={() => onSelectMode('daily')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentMode === 'daily'
                ? 'bg-[#D4AF37] text-[#1F1710] shadow-sm font-bold'
                : 'text-[#D1C2B0] hover:text-white hover:bg-[#3E2F20]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Daily Calendar</span>
            {currentMode === 'daily' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F1710]"></span>
            )}
          </button>

          <button
            id="nav-prayers-dashboard-btn"
            onClick={() => onSelectMode('prayers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentMode === 'prayers'
                ? 'bg-[#8B5CF6] text-white shadow-md border border-[#A78BFA] font-bold'
                : 'text-[#D1C2B0] hover:text-[#DDD6FE] hover:bg-[#3E2F20]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#F472B6]" />
            <span>Prayer Dashboard</span>
            <span className="text-[9px] uppercase tracking-wide bg-[#6D28D9] text-white px-1.5 py-0.5 rounded-full font-bold">
              Kids
            </span>
          </button>

          <button
            id="nav-holy-week-btn"
            onClick={() => onSelectMode('holy-week')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentMode === 'holy-week'
                ? 'bg-[#5B21B6] text-white shadow-md border border-[#8B5CF6] font-bold'
                : 'text-[#D1C2B0] hover:text-[#C4B5FD] hover:bg-[#3E2F20]'
            }`}
          >
            <span className="text-[#C4B5FD] font-bold">☦</span>
            <span>Holy Week</span>
          </button>
        </div>

        {/* Quick Links: Atmosphere, Voice Engine, Saints & GOARCH */}
        <div className="flex items-center gap-2">
          {onOpenThemeModal && (
            <button
              id="header-theme-btn"
              onClick={onOpenThemeModal}
              className="px-2.5 py-1.5 bg-[#2B231A] hover:bg-[#3D3124] text-amber-200 hover:text-white rounded-lg text-xs font-bold border border-[#4E3E2C] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Change Background Atmosphere (Byzantine Gold, Twilight, Aegean Blue, Olive, Candlelight)"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeThemeObj.emoji}</span>
              <span className="hidden sm:inline">Atmosphere</span>
            </button>
          )}

          {onOpenVoiceMenu && (
            <button
              id="header-voice-menu-btn"
              onClick={onOpenVoiceMenu}
              className="px-3 py-1.5 bg-[#3B2848] hover:bg-[#4E3560] text-[#E9D5FF] hover:text-white rounded-lg text-xs font-bold border border-[#6B4785] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title={`Voice Engine: ${activeProfile.name} (Active: ${activeProfile.title}). Click to change.`}
            >
              <Volume2 className="w-3.5 h-3.5 text-[#C084FC]" />
              <span>{activeProfile.avatarEmoji}</span>
              <span className="hidden sm:inline">{activeProfile.name.split(' ')[0]}</span>
              {audioState.activeProfileId === 'byzantine' && (
                <span className="text-[9px] bg-amber-300 text-slate-950 px-1 py-0.2 rounded font-black hidden md:inline">
                  Default
                </span>
              )}
            </button>
          )}

          <button
            id="open-saints-gallery-btn"
            onClick={onOpenSaintsModal}
            className="px-3 py-1.5 bg-[#2E2217] hover:bg-[#423120] text-[#E8D9C5] hover:text-white rounded-lg text-xs font-medium border border-[#4F3B28] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Explore Saints & Name Days"
          >
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Saints</span>
          </button>

          <button
            id="header-goarch-btn"
            onClick={onOpenGoarchModal}
            className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#254B82] text-[#E0EBF7] hover:text-white rounded-lg text-xs font-semibold border border-[#2B548F] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Official Greek Orthodox Archdiocese of America"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#93C5FD]" />
            <span>GOARCH</span>
          </button>
        </div>
      </div>

      {/* Date Navigation Bar (shown when in Daily Mode) */}
      {currentMode === 'daily' && (
        <div className="bg-[#281D13] border-t border-[#3D2D1D] px-4 py-2">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Day Switcher Controls */}
            <div className="flex items-center gap-2">
              <button
                id="btn-prev-day"
                onClick={handlePrevDay}
                className="p-1.5 rounded-lg bg-[#3A2A1A] hover:bg-[#4E3924] text-[#E8D9C5] transition-colors border border-[#523D26] cursor-pointer"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 bg-[#1A120B] px-3 py-1.5 rounded-lg border border-[#483522]">
                <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold text-[#F4E8D8] text-xs">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <input
                  type="date"
                  value={formattedIsoDate}
                  onChange={handleDateInput}
                  className="w-4 h-4 opacity-0 cursor-pointer absolute"
                  title="Pick a date"
                />
              </div>

              <button
                id="btn-next-day"
                onClick={handleNextDay}
                className="p-1.5 rounded-lg bg-[#3A2A1A] hover:bg-[#4E3924] text-[#E8D9C5] transition-colors border border-[#523D26] cursor-pointer"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Today Button */}
              <button
                id="btn-reset-today"
                onClick={onResetToday}
                disabled={isToday}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  isToday
                    ? 'bg-[#3A2A1B] text-[#9E8B79] cursor-default opacity-60'
                    : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#1F1710] shadow-sm font-bold'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Today</span>
              </button>
            </div>

            {/* Quick Status Note */}
            <div className="text-[#C4B29E] flex items-center gap-2 text-[11px]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>Showing actual calendar day for today</span>
            </div>
          </div>
        </div>
      )}

      {/* Holy Week Active Notice (shown when in Holy Week mode) */}
      {currentMode === 'holy-week' && (
        <div className="bg-[#4C1D95] border-t border-[#6D28D9] px-4 py-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-xs text-[#EDE9FE]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FDE047]" />
              <span className="font-semibold">Special Mode: Great & Holy Week</span>
              <span className="hidden md:inline text-[#DDD6FE]">
                • Isolated special journey, regular calendar remains untouched
              </span>
            </div>
            <button
              id="return-to-calendar-btn"
              onClick={() => onSelectMode('daily')}
              className="px-3 py-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1710] font-bold rounded-lg transition-colors cursor-pointer text-xs"
            >
              Return to Today’s Calendar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
