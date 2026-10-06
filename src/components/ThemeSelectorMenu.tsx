import React from 'react';
import { BackgroundThemeId, BACKGROUND_THEMES } from '../types/theme';
import { Sparkles, Check, X, Palette, Moon, Sun, Shield } from 'lucide-react';

interface ThemeSelectorMenuProps {
  currentTheme: BackgroundThemeId;
  onSelectTheme: (themeId: BackgroundThemeId) => void;
  isOpen?: boolean;
  onClose?: () => void;
  compact?: boolean;
}

export const ThemeSelectorMenu: React.FC<ThemeSelectorMenuProps> = ({
  currentTheme,
  onSelectTheme,
  isOpen = false,
  onClose,
  compact = false,
}) => {
  const themeList = Object.values(BACKGROUND_THEMES);

  // Compact bar (used in Header and Dashboard bars)
  if (compact) {
    return (
      <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md p-1 rounded-xl border border-white/10">
        <span className="text-[11px] font-bold text-white/80 px-1.5 hidden md:flex items-center gap-1">
          <Palette className="w-3 h-3 text-amber-300" />
          <span>Atmosphere:</span>
        </span>
        <div className="flex items-center gap-1">
          {themeList.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTheme(t.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm ring-2 ring-amber-400'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title={`${t.name} • ${t.greekName} (${t.timeOfDayHint})`}
              >
                <span>{t.emoji}</span>
                <span className="hidden xl:inline">{t.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Full Interactive Modal
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDFB] w-full max-w-xl rounded-3xl shadow-2xl border-2 border-[#EAD7BA] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FAF2E6] via-[#F4E6D2] to-[#EFE0C9] p-5 border-b border-[#E3D1B4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#D9C4A1] flex items-center justify-center text-2xl">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-[#2D2115]">
                  Prayer Space Atmosphere
                </h3>
                <span className="text-xs bg-[#E8D7B8] text-[#5C3E1B] font-bold px-2 py-0.5 rounded-full border border-[#D9C4A1]">
                  5 Sacred Themes
                </span>
              </div>
              <p className="text-xs text-[#7A634E] mt-0.5">
                Shift the visual atmosphere between traditional Byzantine gold, peaceful twilight, or Aegean blue
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#5C3E1B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Theme List */}
        <div className="p-5 space-y-3.5 overflow-y-auto flex-1 bg-[#FAF7F2]">
          {themeList.map((theme) => {
            const isSelected = currentTheme === theme.id;

            return (
              <div
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                  if (onClose) onClose();
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isSelected
                    ? `bg-white ${theme.previewBorder} shadow-md ring-3 ring-amber-400/50 scale-[1.01]`
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Active Pill */}
                {isSelected && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Active Atmosphere</span>
                  </div>
                )}

                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl ${theme.previewBg} border-2 ${theme.previewBorder} flex items-center justify-center text-2xl shadow-inner shrink-0`}
                  >
                    {theme.emoji}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-slate-900">
                        {theme.name}
                      </h4>
                      <span className="text-xs font-semibold text-slate-500 font-cinzel">
                        • {theme.greekName}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-sm">
                      {theme.description}
                    </p>

                    <div className="text-[11px] font-bold text-amber-700 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{theme.timeOfDayHint}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Apply Theme'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Theme applies across the entire app and persists automatically</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
