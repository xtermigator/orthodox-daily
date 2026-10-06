import React, { useState, useEffect } from 'react';
import { HOLY_WEEK_DAYS } from '../data/holyWeekData';
import { HolyWeekDay } from '../types';
import { audioEngine } from '../services/audioService';
import { 
  Sparkles, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Heart, 
  ExternalLink, 
  Flame, 
  ShieldCheck,
  Calendar,
  Utensils
} from 'lucide-react';

interface HolyWeekViewProps {
  onReturnToDaily: () => void;
  onOpenGoarchModal: () => void;
}

export const HolyWeekView: React.FC<HolyWeekViewProps> = ({
  onReturnToDaily,
  onOpenGoarchModal
}) => {
  // Load saved Holy Week day from localStorage or default to Palm Sunday
  const [selectedDayId, setSelectedDayId] = useState<string>(() => {
    return localStorage.getItem('orthodox_holy_week_selected_day') || 'holy-thursday';
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Save selected day
  const handleSelectDay = (id: string) => {
    setSelectedDayId(id);
    localStorage.setItem('orthodox_holy_week_selected_day', id);
    audioEngine.stop();
    setIsPlayingAudio(false);
  };

  const activeDay: HolyWeekDay = HOLY_WEEK_DAYS.find(d => d.id === selectedDayId) || HOLY_WEEK_DAYS[0];

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = `${activeDay.dayTitle}. ${activeDay.subtitle}. Theme: ${activeDay.theme}. Hymn: ${activeDay.hymn.title}. ${activeDay.hymn.lyrics}. Gospel: ${activeDay.scriptureSummary.reference}. ${activeDay.scriptureSummary.kidExplanation}. Story: ${activeDay.kidStory}. Family Tradition: ${activeDay.familyTradition}. Prayer: ${activeDay.specialPrayer}`;

    setIsPlayingAudio(true);
    audioEngine.speakPassage(
      `holy-week-${activeDay.id}`,
      textToRead,
      'en',
      () => {
        setIsPlayingAudio(false);
      },
      'byzantine' // Default to Father Paisios
    );
  };

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner Explaining Special Isolated Holy Week Mode */}
      <section 
        id="holy-week-mode-banner"
        className="bg-gradient-to-r from-[#3B1F70] via-[#4C1D95] to-[#2E1065] rounded-2xl p-6 text-white border-2 border-[#A78BFA] shadow-lg relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-widest bg-[#7C3AED] text-white px-2.5 py-0.5 rounded-full uppercase border border-[#A78BFA]">
                Special Mode: Great and Holy Week
              </span>
              <span className="text-xs text-[#DDD6FE] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FDE047]" />
                Isolated from regular daily calendar
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#FDF4FF] leading-tight">
              The Journey of Holy Week & Pascha
            </h1>
            <p className="text-xs sm:text-sm text-[#E9D5FF] max-w-2xl mt-1">
              Follow our Lord Jesus Christ through each holy service, sacred hymn, and family tradition. This section is only entered when chosen, keeping your daily calendar intact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="return-to-daily-btn"
              onClick={onReturnToDaily}
              className="px-4 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1710] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Daily Calendar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Holy Week Day Selector Strip */}
      <div className="bg-[#FAF7F2] p-2 rounded-2xl border border-[#E7DECE] shadow-xs overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {HOLY_WEEK_DAYS.map((day) => {
            const isSelected = day.id === selectedDayId;
            return (
              <button
                key={day.id}
                id={`holy-week-tab-${day.id}`}
                onClick={() => handleSelectDay(day.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#4C1D95] text-[#FDF4FF] border-[#7C3AED] shadow-sm'
                    : 'bg-white hover:bg-[#F3EDE2] text-[#4A3723] border-[#E5D7C2]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FDE047]' : 'bg-[#C4B5FD]'}`}></span>
                <span>{day.dayTitle.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Holy Week Day Content */}
      <div className="space-y-6">
        {/* Day Header Banner */}
        <section 
          id="holy-day-details-card"
          className="bg-[#FFFDFB] rounded-2xl p-6 border-2 border-[#D8B4FE] shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-[#EDE9FE] text-[#5B21B6] px-2.5 py-0.5 rounded-full border border-[#DDD6FE]">
                  {activeDay.dayTitle}
                </span>
                <span className="text-xs text-[#6B507E] font-medium">
                  {activeDay.servicesSummary}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#2E1065]">
                {activeDay.subtitle}
              </h2>
              <p className="text-xs text-[#581C87] font-semibold mt-1">
                Theme: {activeDay.theme}
              </p>
            </div>

            <button
              id="listen-holy-week-audio-btn"
              onClick={handleToggleAudio}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start md:self-center ${
                isPlayingAudio
                  ? 'bg-[#B45309] text-white animate-pulse'
                  : 'bg-[#5B21B6] hover:bg-[#4C1D95] text-white shadow-xs'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Pause Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Holy Week Day</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* 2-Column Grid: Sacred Hymn & Gospel Reading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Sacred Hymn of the Day */}
          <section 
            id="holy-week-hymn-card"
            className="bg-[#FFFDFB] rounded-2xl p-6 border border-[#E7DECE] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] text-[#6B21A8] flex items-center justify-center font-bold border border-[#E9D5FF]">
                  ♫
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#2D2115]">
                    Sacred Hymn of the Day
                  </h3>
                  <p className="text-[11px] text-[#8C7662]">
                    {activeDay.hymn.title}
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#EFE8DC] mb-3">
                <p className="text-sm font-reading text-[#2D2115] leading-relaxed whitespace-pre-line italic">
                  "{activeDay.hymn.lyrics}"
                </p>
              </div>

              {activeDay.hymn.phoneticGreek && (
                <div className="bg-[#FBF8F3] rounded-xl p-3 border border-[#EBDDC9] text-xs text-[#785B3D] mb-3">
                  <span className="font-bold text-[#8C5D2C]">Greek Phrasing: </span>
                  <span className="italic">{activeDay.hymn.phoneticGreek}</span>
                </div>
              )}

              <div className="bg-[#F3E8FF] rounded-xl p-3 border border-[#E9D5FF] text-xs text-[#581C87]">
                <span className="font-bold">What this hymn teaches: </span>
                <span>{activeDay.hymn.meaning}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0E9DF] text-xs text-[#8A7766]">
              Byzantine Liturgical Chant of Holy Week
            </div>
          </section>

          {/* Card B: Scripture Gospel Summary */}
          <section 
            id="holy-week-scripture-card"
            className="bg-[#FFFDFB] rounded-2xl p-6 border border-[#E7DECE] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center font-bold border border-[#DBEAFE]">
                  <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#2D2115]">
                    Holy Gospel Reading
                  </h3>
                  <p className="text-[11px] text-[#8C7662]">
                    {activeDay.scriptureSummary.reference}
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#EFE8DC] mb-3">
                <p className="text-sm font-reading text-[#2D2115] leading-relaxed italic">
                  "{activeDay.scriptureSummary.text}"
                </p>
              </div>

              <div className="bg-[#EFF6FF] rounded-xl p-3 border border-[#BFDBFE] text-xs text-[#1E40AF]">
                <div className="flex items-center gap-1 font-bold mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Kid-Friendly Explanation:</span>
                </div>
                <p>{activeDay.scriptureSummary.kidExplanation}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0E9DF] text-xs text-[#8A7766]">
              Passages of the Passion & Resurrection
            </div>
          </section>
        </div>

        {/* Story for Children's Hearts & Family Tradition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card C: Story for Children */}
          <section 
            id="holy-week-story-card"
            className="bg-[#FFFDFB] rounded-2xl p-6 border border-[#E7DECE] shadow-xs"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold border border-[#FDE68A]">
                <Heart className="w-4 h-4 text-[#B45309]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#2D2115]">
                Story for Children’s Hearts
              </h3>
            </div>

            <p className="text-sm text-[#3E2F20] font-reading leading-relaxed">
              {activeDay.kidStory}
            </p>
          </section>

          {/* Card D: Family Tradition */}
          <section 
            id="holy-week-tradition-card"
            className="bg-[#FFFDFB] rounded-2xl p-6 border border-[#E7DECE] shadow-xs"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#047857] flex items-center justify-center font-bold border border-[#A7F3D0]">
                <Flame className="w-4 h-4 text-[#047857]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#2D2115]">
                Family Tradition to Share
              </h3>
            </div>

            <p className="text-sm text-[#14532D] font-reading leading-relaxed bg-[#F0FDF4] p-4 rounded-xl border border-[#DCFCE7]">
              {activeDay.familyTradition}
            </p>
          </section>
        </div>

        {/* Special Holy Week Prayer */}
        <section 
          id="holy-week-prayer-card"
          className="bg-gradient-to-r from-[#FAF5FF] via-[#F3E8FF] to-[#FAF5FF] rounded-2xl p-6 border-2 border-[#DDD6FE] shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">✝</span>
            <h3 className="font-cinzel text-base font-bold text-[#4C1D95]">
              Family Prayer for {activeDay.dayTitle}
            </h3>
          </div>

          <p className="text-base font-reading text-[#3B0764] leading-relaxed whitespace-pre-line italic">
            "{activeDay.specialPrayer}"
          </p>
        </section>

        {/* Bottom Navigation / Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7DECE]">
          <div className="text-xs text-[#7A6450]">
            Holy Week content stays here. Ready to check today’s calendar?
          </div>
          <div className="flex items-center gap-2">
            <button
              id="bottom-return-daily-btn"
              onClick={onReturnToDaily}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C29D26] text-[#1F1710] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Back to Regular Daily Calendar</span>
            </button>
            <button
              id="bottom-goarch-holyweek-btn"
              onClick={onOpenGoarchModal}
              className="px-3.5 py-2 bg-[#1B365D] hover:bg-[#254B82] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              GOARCH Holy Week Texts
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
