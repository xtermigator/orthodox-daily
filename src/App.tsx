import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyCompanionView } from './components/DailyCompanionView';
import { HolyWeekView } from './components/HolyWeekView';
import { PrayerDashboard } from './components/PrayerDashboard';
import { VoiceSelectorMenu } from './components/VoiceSelectorMenu';
import { SaintsExplorerModal } from './components/SaintsExplorerModal';
import { GoarchModal } from './components/GoarchModal';
import { DailyOrthodoxQuoteFooter } from './components/DailyOrthodoxQuoteFooter';
import { ThemeSelectorMenu } from './components/ThemeSelectorMenu';
import { getOrthodoxDay } from './data/orthodoxCalendar';
import { BackgroundThemeId, BACKGROUND_THEMES } from './types/theme';

export default function App() {
  // CRITICAL REQUIREMENT: Home screen defaults to normal daily Orthodox calendar day.
  // Holy Week and Kids Prayer Dashboard are cleanly accessible via navigation.
  const [currentMode, setCurrentMode] = useState<'daily' | 'prayers' | 'holy-week'>('daily');

  // Background Atmosphere Theme State (Parchment, Twilight, Aegean, Olive, Candlelight)
  const [currentTheme, setCurrentTheme] = useState<BackgroundThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_bg_theme') as BackgroundThemeId;
      if (saved && BACKGROUND_THEMES[saved]) return saved;
    }
    return 'parchment';
  });

  const activeTheme = BACKGROUND_THEMES[currentTheme] || BACKGROUND_THEMES.parchment;

  const handleSelectTheme = (themeId: BackgroundThemeId) => {
    setCurrentTheme(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_bg_theme', themeId);
    }
  };

  // Automatically determines today's actual date
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  // Modals
  const [isSaintsModalOpen, setIsSaintsModalOpen] = useState(false);
  const [isGoarchModalOpen, setIsGoarchModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Check if selectedDate matches today
  const isToday = useMemo(() => {
    const today = new Date();
    return (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    );
  }, [selectedDate]);

  // Compute Orthodox calendar data for the active date
  const dayData = useMemo(() => {
    return getOrthodoxDay(selectedDate);
  }, [selectedDate]);

  const handleResetToday = () => {
    setSelectedDate(new Date());
  };

  const handleSelectSaintDate = (month: number, day: number) => {
    // Jump calendar to this saint's feast day
    const year = selectedDate.getFullYear();
    const newDate = new Date(year, month - 1, day);
    setSelectedDate(newDate);
    setCurrentMode('daily'); // Ensure we are on daily calendar
  };

  return (
    <div className={`min-h-screen flex flex-col ${activeTheme.bodyBgClass} text-[#2D241E] transition-colors duration-300`}>
      {/* Universal Navigation Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onResetToday={handleResetToday}
        isToday={isToday}
        onOpenSaintsModal={() => setIsSaintsModalOpen(true)}
        onOpenGoarchModal={() => setIsGoarchModalOpen(true)}
        onOpenVoiceMenu={() => setIsVoiceModalOpen(true)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1">
        {currentMode === 'daily' && (
          <DailyCompanionView
            dayData={dayData}
            onOpenGoarchModal={() => setIsGoarchModalOpen(true)}
            onOpenSaintsGallery={() => setIsSaintsModalOpen(true)}
            onOpenVoiceMenu={() => setIsVoiceModalOpen(true)}
            onNavigateToPrayers={() => setCurrentMode('prayers')}
          />
        )}
        
        {currentMode === 'prayers' && (
          <PrayerDashboard
            onBackToCalendar={() => setCurrentMode('daily')}
            currentTheme={currentTheme}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
          />
        )}

        {currentMode === 'holy-week' && (
          <HolyWeekView
            onReturnToDaily={() => setCurrentMode('daily')}
            onOpenGoarchModal={() => setIsGoarchModalOpen(true)}
          />
        )}
      </div>

      {/* Reverent Footer with Theme Integration */}
      <footer id="app-footer" className={`${activeTheme.footerBgClass} border-t ${activeTheme.borderClass} py-6 px-4 mt-12 text-center text-xs text-[#7A6450] transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#9A7D60] font-cinzel font-bold text-sm">
            <span>☦</span>
            <span>Orthodox Daily Companion for Families</span>
            <span>☦</span>
          </div>
          <p className="text-[11px] text-[#8C7662]">
            Showing current Orthodox calendar day by default • Scripture, prayers, and saint teachings for home devotion
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] pt-1 text-[#66503E]">
            <button
              onClick={() => setCurrentMode('prayers')}
              className="hover:text-[#6D28D9] font-bold text-[#7C3AED] underline cursor-pointer"
            >
              Children's Daily Prayer Garden (The Lord's Prayer & Our Father)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="hover:text-amber-800 font-bold text-amber-700 underline cursor-pointer flex items-center gap-1"
            >
              <span>{activeTheme.emoji}</span>
              <span>Atmosphere: {activeTheme.name}</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="hover:text-[#0284C7] underline cursor-pointer"
            >
              Voice Engine & Audio Profiles
            </button>
            <span>•</span>
            <button
              onClick={() => setIsGoarchModalOpen(true)}
              className="hover:text-[#1B365D] underline cursor-pointer"
            >
              GOARCH
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSaintsModalOpen(true)}
              className="hover:text-[#B45309] underline cursor-pointer"
            >
              Saints & Name Days Guide
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentMode('holy-week')}
              className="hover:text-[#5B21B6] underline cursor-pointer"
            >
              Holy Week Special Mode
            </button>
          </div>

          {/* Daily Orthodox Inspirational Quote or Short Prayer Excerpt */}
          <DailyOrthodoxQuoteFooter selectedDate={selectedDate} />
        </div>
      </footer>

      {/* Modals */}
      <ThemeSelectorMenu
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />

      <SaintsExplorerModal
        isOpen={isSaintsModalOpen}
        onClose={() => setIsSaintsModalOpen(false)}
        onSelectSaintDate={handleSelectSaintDate}
      />

      <GoarchModal
        isOpen={isGoarchModalOpen}
        onClose={() => setIsGoarchModalOpen(false)}
        currentDate={selectedDate}
      />

      <VoiceSelectorMenu
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
}
