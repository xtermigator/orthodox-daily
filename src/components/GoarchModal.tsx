import React from 'react';
import { X, ExternalLink, BookOpen, Calendar, Heart, Shield, Sparkles } from 'lucide-react';

interface GoarchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: Date;
}

export const GoarchModal: React.FC<GoarchModalProps> = ({
  isOpen,
  onClose,
  currentDate
}) => {
  if (!isOpen) return null;

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();

  const goarchCalendarUrl = `https://www.goarch.org/chapel/calendar?month=${month}&year=${year}`;
  const goarchChapelUrl = `https://www.goarch.org/chapel`;
  const goarchReadingsUrl = `https://www.goarch.org/chapel/readings`;
  const goarchSaintsUrl = `https://www.goarch.org/chapel/saints`;
  const goarchMainUrl = `https://www.goarch.org`;
  const y2amUrl = `https://www.y2am.org`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="goarch-info-modal"
        className="bg-[#FFFDFB] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-[#C5D5E8] shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1B365D] via-[#1E40AF] to-[#1B365D] text-white p-5 flex items-center justify-between border-b border-[#3B82F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1B365D] flex items-center justify-center font-bold text-lg shadow-sm">
              ☦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#93C5FD]">
                  Official Orthodox Resource
                </span>
              </div>
              <h2 className="font-cinzel text-xl font-bold text-white">
                Greek Orthodox Archdiocese (GOARCH)
              </h2>
              <p className="text-xs text-[#BFDBFE]">
                Connecting your family directly with official church readings & teachings
              </p>
            </div>
          </div>

          <button
            id="close-goarch-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#BFDBFE] hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#2D241E]">
          {/* About GOARCH */}
          <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#BFDBFE]">
            <h3 className="text-sm font-bold text-[#1E3A8A] mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#2563EB]" />
              <span>What is GOARCH?</span>
            </h3>
            <p className="text-xs text-[#1E40AF] leading-relaxed">
              The Greek Orthodox Archdiocese of America (GOARCH) is the canonical ecclesiastical jurisdiction of the Ecumenical Patriarchate in the United States. Its Online Chapel provides the authoritative liturgical calendar, daily Gospel and Epistle readings, hymns, and lives of the saints.
            </p>
          </div>

          {/* Direct Link Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B5A49]">
              Direct Links to GOARCH Resources
            </h4>

            {/* Link 1: Today's Chapel Calendar */}
            <a
              id="goarch-modal-calendar-link"
              href={goarchCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE7] border border-[#E5DACB] hover:border-[#3B82F6] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A8A] group-hover:text-[#2563EB]">
                    GOARCH Online Chapel Calendar ({currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})
                  </div>
                  <div className="text-[11px] text-[#6B5A49]">
                    Official daily calendar with hymns, icons, and fasting rubrics
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#93C5FD] group-hover:text-[#2563EB]" />
            </a>

            {/* Link 2: Daily Readings */}
            <a
              id="goarch-modal-readings-link"
              href={goarchReadingsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE7] border border-[#E5DACB] hover:border-[#3B82F6] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A8A] group-hover:text-[#2563EB]">
                    Official Daily Gospel & Epistle Pericopes
                  </div>
                  <div className="text-[11px] text-[#6B5A49]">
                    Full unabridged liturgical Bible readings for church & home
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#93C5FD] group-hover:text-[#2563EB]" />
            </a>

            {/* Link 3: Lives of the Saints */}
            <a
              id="goarch-modal-saints-link"
              href={goarchSaintsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE7] border border-[#E5DACB] hover:border-[#3B82F6] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A8A] group-hover:text-[#2563EB]">
                    Synaxarion: Lives of the Saints
                  </div>
                  <div className="text-[11px] text-[#6B5A49]">
                    Detailed accounts of holy men, women, and martyrs
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#93C5FD] group-hover:text-[#2563EB]" />
            </a>

            {/* Link 4: Youth & Family Ministries (Y2AM) */}
            <a
              id="goarch-modal-y2am-link"
              href={y2amUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE7] border border-[#E5DACB] hover:border-[#3B82F6] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A8A] group-hover:text-[#2563EB]">
                    Y2AM (Youth & Young Adult Ministries)
                  </div>
                  <div className="text-[11px] text-[#6B5A49]">
                    Family-friendly Orthodox education videos ("Be the Bee") and articles
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#93C5FD] group-hover:text-[#2563EB]" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E5DACB] flex items-center justify-between">
          <a
            href={goarchMainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
          >
            <span>Visit goarch.org</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#2B4B7C] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
