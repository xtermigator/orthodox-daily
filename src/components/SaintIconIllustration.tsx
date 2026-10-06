import React, { useState } from 'react';
import { SaintOfTheDay } from '../types';
import { getSaintIconUrl } from '../data/orthodoxSaintsCalendar';
import { Maximize2, X } from 'lucide-react';

interface SaintIconIllustrationProps {
  iconType: SaintOfTheDay['iconType'];
  name: string;
  imageUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showZoomModal?: boolean;
}

export const SaintIconIllustration: React.FC<SaintIconIllustrationProps> = ({
  iconType,
  name,
  imageUrl,
  className = '',
  size = 'md',
  showZoomModal = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Derive authentic icon photo if not explicitly passed
  const resolvedUrl = imageUrl || getSaintIconUrl(name, iconType);

  const sizeClasses = {
    sm: 'w-16 h-20 text-[8px]',
    md: 'w-24 h-32 text-[10px]',
    lg: 'w-36 h-48 text-xs',
    xl: 'w-48 h-64 text-sm'
  };

  // Helper for Greek inscription
  const getGreekAbbreviation = (saintName: string) => {
    const s = saintName.toLowerCase();
    if (s.includes('theotokos') || s.includes('virgin')) return 'ΜΡ ΘΥ';
    if (s.includes('christ') || s.includes('savior')) return 'ΙC XC';
    if (s.includes('catherine') || s.includes('paraskevi') || s.includes('barbara') || s.includes('sophia') || s.includes('marina')) {
      return 'ἉΓΙΑ';
    }
    return 'Ὁ ἍΓΙΟC';
  };

  return (
    <>
      <div 
        id={`icon-frame-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        onClick={() => showZoomModal && setIsZoomed(true)}
        className={`group relative flex flex-col items-center justify-center select-none rounded-xl overflow-hidden border-[3px] border-[#D4AF37] bg-gradient-to-b from-[#1C1208] via-[#2D1D10] to-[#120B04] shadow-md transition-all duration-300 ${
          showZoomModal ? 'cursor-pointer hover:shadow-xl hover:border-[#FDE047] hover:scale-[1.02]' : ''
        } ${sizeClasses[size]} ${className}`}
        title={`Authentic Byzantine Orthodox Icon of ${name} (Tap to enlarge)`}
        aria-label={`Authentic Byzantine Orthodox Icon of ${name}`}
      >
        {/* Carved Dark Wood Outer Bevel */}
        <div className="absolute inset-0 border border-[#8B5A2B]/40 pointer-events-none z-10" />

        {/* Decorative Traditional Byzantine Corner Crosses */}
        <span className="absolute top-1 left-1.5 text-[#FDE047] opacity-90 font-bold drop-shadow-sm z-20 pointer-events-none">☦</span>
        <span className="absolute top-1 right-1.5 text-[#FDE047] opacity-90 font-bold drop-shadow-sm z-20 pointer-events-none">☦</span>

        {/* Greek Byzantine Inscription Tag at Top */}
        <div className="absolute top-1 inset-x-0 flex justify-center z-20 pointer-events-none">
          <span className="font-cinzel text-[7px] sm:text-[8px] font-extrabold text-[#FDE047] tracking-widest bg-black/60 px-2 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
            {getGreekAbbreviation(name)}
          </span>
        </div>

        {/* Authentic Icon Image Presentation */}
        {!imageError && resolvedUrl ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[#150D06] overflow-hidden">
            <img
              src={resolvedUrl}
              alt={`Orthodox Icon of ${name}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            {/* Luminous Byzantine Gold Leaf Inner Trim & Subtle Bottom Shade for Legibility */}
            <div className="absolute inset-0 border border-[#FDE047]/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent via-50% to-transparent pointer-events-none" />
          </div>
        ) : (
          /* Elevated Byzantine Iconographic Sacred Art Fallback */
          <div className="relative w-full h-full p-1 flex items-center justify-center bg-[#1E1106]">
            <svg
              viewBox="0 0 100 130"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="haloGoldReal" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="45%" stopColor="#FDE047" />
                  <stop offset="80%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
                <linearGradient id="woodBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2E180A" />
                  <stop offset="100%" stopColor="#140803" />
                </linearGradient>
                <linearGradient id="martyrRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="lapisRobe" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="emeraldRobe" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
              </defs>

              <rect width="100" height="130" fill="url(#woodBg)" />
              
              {/* Outer gold and cinnabar icon frame */}
              <rect x="2" y="2" width="96" height="126" stroke="#D4AF37" strokeWidth="1" fill="none" rx="2" />
              <rect x="4" y="4" width="92" height="122" stroke="#DC2626" strokeWidth="0.6" fill="none" rx="1.5" />

              {/* Radiant 24k Gold leaf halo */}
              <circle cx="50" cy="44" r="26" fill="url(#haloGoldReal)" stroke="#FFFBEB" strokeWidth="1.2" />
              <circle cx="50" cy="44" r="23" fill="none" stroke="#78350F" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
              
              {/* Head & Byzantine Features */}
              <path d="M46 50 L46 62 L54 62 L54 50 Z" fill="#E2A676" />
              <ellipse cx="50" cy="44" rx="13" ry="15" fill="#F4C59E" stroke="#A76137" strokeWidth="0.8" />
              
              {/* Distinguish by iconType */}
              {iconType === 'woman_martyr' ? (
                <>
                  {/* Vermilion Red Maphorion Veil */}
                  <path d="M50 24 C38 24 32 36 30 52 C28 66 22 90 20 130 L80 130 C78 90 72 66 70 52 C68 36 62 24 50 24 Z" fill="url(#martyrRed)" stroke="#FDE047" strokeWidth="0.8" />
                  <polygon points="50,30 51,33 54,34 51,35 50,38 49,35 46,34 49,33" fill="#FDE047" />
                  {/* Holding Golden Cross */}
                  <line x1="50" y1="75" x2="50" y2="105" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                  <line x1="44" y1="84" x2="56" y2="84" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : iconType === 'great_martyr_soldier' ? (
                <>
                  {/* Soldier Armor & Red Chlamys */}
                  <path d="M25 80 L35 52 Q50 48 65 52 L75 80 L76 130 L24 130 Z" fill="url(#martyrRed)" stroke="#D4AF37" strokeWidth="0.8" />
                  {/* Golden Cuirass */}
                  <rect x="38" y="70" width="24" height="40" rx="3" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
                  {/* Spear */}
                  <line x1="68" y1="35" x2="68" y2="125" stroke="#E2E8F0" strokeWidth="1.5" />
                  <polygon points="68,28 65,36 71,36" fill="#FDE047" />
                </>
              ) : iconType === 'archangel' ? (
                <>
                  {/* Golden Wings */}
                  <path d="M50 45 Q20 30 10 70 Q30 65 45 60 Z" fill="#F59E0B" stroke="#FEF08A" strokeWidth="0.8" />
                  <path d="M50 45 Q80 30 90 70 Q70 65 55 60 Z" fill="#F59E0B" stroke="#FEF08A" strokeWidth="0.8" />
                  {/* Azure / Emerald Robe */}
                  <path d="M26 80 L36 50 Q50 46 64 50 L74 80 L76 130 L24 130 Z" fill="url(#emeraldRobe)" stroke="#D4AF37" strokeWidth="0.8" />
                  {/* Fiery Sword */}
                  <line x1="50" y1="70" x2="50" y2="115" stroke="#FEF08A" strokeWidth="2" />
                  <line x1="45" y1="78" x2="55" y2="78" stroke="#EF4444" strokeWidth="2" />
                </>
              ) : (
                <>
                  {/* Byzantine Hair & Silver/Dark Beard */}
                  <path d="M37 46 C37 62 63 62 63 46 C60 55 40 55 37 46 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.5" />
                  {/* Vestment (Emerald or Sapphire) */}
                  <path d="M26 80 L36 50 Q50 46 64 50 L74 80 L76 130 L24 130 Z" fill="url(#emeraldRobe)" stroke="#D4AF37" strokeWidth="0.8" />
                  {/* White Omophorion with Bold Byzantine Crosses */}
                  <path d="M43 48 L43 125 L57 125 L57 48 Z" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.8" />
                  <path d="M50 56 L50 68 M45 62 L55 62" stroke="#18181B" strokeWidth="2" />
                  <path d="M50 82 L50 94 M45 88 L55 88" stroke="#18181B" strokeWidth="2" />
                </>
              )}

              {/* Contemplative Serene Almond Eyes */}
              <ellipse cx="46" cy="43" rx="1.8" ry="1.2" fill="#2E1C0C" />
              <ellipse cx="54" cy="43" rx="1.8" ry="1.2" fill="#2E1C0C" />
              <path d="M49 43 L50 48 L52 48" stroke="#78350F" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
        )}

        {/* Interactive Enlarge Indicator Badge on Hover */}
        {showZoomModal && (
          <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-[#FDE047] p-1 rounded-md border border-[#D4AF37]/60">
            <Maximize2 className="w-3 h-3" />
          </div>
        )}

        {/* Saint Name Inscription Banner at Bottom */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-3 pb-1 px-1 text-center border-t border-[#D4AF37]/50 z-20">
          <span className="block font-cinzel text-[8px] sm:text-[9.5px] text-[#FDE047] font-bold truncate tracking-wider leading-tight drop-shadow-sm">
            {name.replace('Saint ', 'St. ')}
          </span>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox Modal */}
      {isZoomed && (
        <div 
          id="saint-icon-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div 
            id="saint-icon-modal-content"
            className="relative max-w-sm sm:max-w-md w-full bg-[#26170B] rounded-2xl p-5 border-2 border-[#D4AF37] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              id="close-icon-zoom-btn"
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 z-30 p-1.5 bg-black/60 hover:bg-black text-[#FDE047] hover:text-white rounded-full border border-[#D4AF37]/50 transition-colors"
              aria-label="Close icon view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sacred Icon Image */}
            <div className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-black shadow-inner aspect-[3/4] mb-4 flex items-center justify-center">
              {resolvedUrl && !imageError ? (
                <img
                  src={resolvedUrl}
                  alt={`Sacred Orthodox Icon of ${name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-[#D4AF37] text-center p-6">
                  <div className="text-4xl mb-2">☦</div>
                  <div className="font-cinzel text-lg font-bold">{name}</div>
                  <div className="text-xs text-[#E5D2B8] mt-1">Holy Orthodox Iconography</div>
                </div>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="text-center">
              <span className="text-[11px] font-bold text-[#FDE047] tracking-widest uppercase block mb-1">
                {getGreekAbbreviation(name)} • Holy Icon
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFFBEB]">
                {name}
              </h3>
              <p className="text-xs text-[#D1B89D] mt-1">
                Authentic traditional Byzantine iconography for veneration, prayer, and family reflection.
              </p>
              <div className="mt-4 pt-3 border-t border-[#8B5A2B]/40 flex items-center justify-center gap-2 text-xs text-[#E5D2B8]">
                <span>"Through the icon, we look upon the heavenly beauty of Christ and His saints."</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
