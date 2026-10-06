import React, { useState } from 'react';
import { FEATURED_SAINTS, FeaturedSaint } from '../data/pdfSaints';
import { SaintIconIllustration } from './SaintIconIllustration';
import { SaintOfTheDay } from '../types';
import { getSaintIconUrl } from '../data/orthodoxSaintsCalendar';
import { 
  X, 
  Search, 
  Award, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Music, 
  Heart,
  BookOpen,
  Info
} from 'lucide-react';

interface SaintsExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSaintDate: (month: number, day: number) => void;
}

export const SaintsExplorerModal: React.FC<SaintsExplorerModalProps> = ({
  isOpen,
  onClose,
  onSelectSaintDate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSaintId, setExpandedSaintId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All 18 Saints' },
    { id: 'martyrs', label: 'Martyrs & Soldiers' },
    { id: 'bishops', label: 'Holy Bishops & Fathers' },
    { id: 'women', label: 'Holy Women of Faith' },
    { id: 'prophets_angels', label: 'Prophets & Angels' }
  ];

  const getIconType = (name: string): SaintOfTheDay['iconType'] => {
    const lower = name.toLowerCase();
    if (lower.includes('john the baptist') || lower.includes('forerunner') || lower.includes('prophet') || lower.includes('elias')) return 'prophet';
    if (lower.includes('nicholas') || lower.includes('basil') || lower.includes('chrysostom') || lower.includes('nectarios') || lower.includes('nektarios') || lower.includes('spyridon') || lower.includes('gregory') || lower.includes('athanasios') || lower.includes('three hierarchs')) return 'bishop';
    if (lower.includes('peter') || lower.includes('paul') || lower.includes('andrew') || lower.includes('john the evangelist') || lower.includes('luke') || lower.includes('mark') || lower.includes('matthew')) return 'apostle_evangelist';
    if (lower.includes('george') || lower.includes('demetrios') || lower.includes('theodore') || lower.includes('eustathios')) return 'great_martyr_soldier';
    if (lower.includes('thekla') || lower.includes('catherine') || lower.includes('katherine') || lower.includes('barbara') || lower.includes('paraskevi') || lower.includes('marina') || lower.includes('sophia') || lower.includes('irene') || lower.includes('anna')) return 'woman_martyr';
    if (lower.includes('panteleimon') || lower.includes('cosmas') || lower.includes('damian')) return 'healer_unmercenary';
    if (lower.includes('michael') || lower.includes('gabriel')) return 'archangel';
    if (lower.includes('constantine') || lower.includes('helen') || lower.includes('cross')) return 'holy_cross_feast';
    return 'monk_venerable';
  };

  const filteredSaints = FEATURED_SAINTS.filter(saint => {
    const matchesSearch = 
      saint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saint.teaching.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saint.feastDateText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saint.motto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (saint.liturgicalColorName && saint.liturgicalColorName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    const lower = saint.name.toLowerCase();
    if (selectedCategory === 'martyrs') {
      return lower.includes('george') || lower.includes('demetrios') || lower.includes('paraskevi') || lower.includes('marina') || lower.includes('irene') || lower.includes('katherine') || lower.includes('sophia');
    }
    if (selectedCategory === 'bishops') {
      return lower.includes('nicholas') || lower.includes('basil') || lower.includes('chrysostom') || lower.includes('nektarios') || lower.includes('spyridon') || lower.includes('three hierarchs');
    }
    if (selectedCategory === 'women') {
      return lower.includes('sophia') || lower.includes('katherine') || lower.includes('paraskevi') || lower.includes('marina') || lower.includes('irene') || lower.includes('anna') || lower.includes('helen');
    }
    if (selectedCategory === 'prophets_angels') {
      return lower.includes('michael') || lower.includes('elias') || lower.includes('john the baptist');
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div 
        id="saints-explorer-modal"
        className="bg-[#FFFDFB] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col border-2 border-[#D4AF37] shadow-2xl overflow-hidden"
      >
        {/* Modal Header: Byzantine Imperial Purple & Gold */}
        <div className="bg-gradient-to-r from-[#240F3E] via-[#4C1D95] to-[#240F3E] text-white p-4 sm:p-5 border-b border-[#FDE047]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F59E0B] via-[#EAB308] to-[#B45309] text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-[#FEF08A]">
              ☦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#FDE047] bg-black/40 px-2 py-0.5 rounded-full border border-[#FDE047]/30">
                  Authentic Byzantine Iconography &amp; Lives
                </span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFFBEB] mt-0.5">
                Orthodox Saints &amp; Name Days Gallery
              </h2>
              <p className="text-xs text-[#E9D5FF]">
                Discover sacred colors, holy symbols, troparia hymns, and name day traditions for all 18 commemorated saints.
              </p>
            </div>
          </div>

          <button
            id="close-saints-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#E9D5FF] hover:text-white transition-colors cursor-pointer border border-white/10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Liturgical Filter Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF6F0] border-b border-[#E8DEC9] flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B5A2B]" />
            <input
              type="text"
              placeholder="Search saint, feast date, virtue, or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#DDD0BE] text-xs focus:outline-none focus:border-[#B45309] text-[#2E1C0C] placeholder-[#9C826A]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#B45309] text-white shadow-xs border border-[#FDE047]'
                    : 'bg-[#EFE7D8] hover:bg-[#E2D6C3] text-[#5C432A] border border-[#DDD1BE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Saints Grid List */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-[#FBF9F5]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSaints.map((saint) => {
              const iconType = getIconType(saint.name);
              const iconUrl = getSaintIconUrl(saint.name, iconType);
              const isExpanded = expandedSaintId === saint.id;
              const colorHex = saint.liturgicalColorHex || '#B45309';

              return (
                <div
                  key={saint.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                  style={{ borderColor: isExpanded ? colorHex : '#E8DEC9' }}
                >
                  <div>
                    {/* Top Badges: Feast Date & Liturgical Tone */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold bg-[#FAF2E3] text-[#8B5A2B] px-2.5 py-0.5 rounded-full border border-[#EADBCA] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#B45309]" />
                        {saint.feastDateText}
                      </span>

                      {saint.liturgicalColorName && (
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1"
                          style={{
                            backgroundColor: `${colorHex}12`,
                            color: colorHex,
                            borderColor: `${colorHex}35`
                          }}
                        >
                          <span 
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: colorHex }}
                          />
                          <span>{saint.liturgicalColorName}</span>
                        </span>
                      )}

                      <span className="text-[11px] font-semibold text-[#6D28D9] bg-[#F5F0FF] px-2 py-0.5 rounded border border-[#DDD6FE]">
                        {saint.virtue}
                      </span>
                    </div>

                    {/* Saint Info Header with Authentic Icon */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 mt-0.5">
                        <SaintIconIllustration
                          iconType={iconType}
                          name={saint.name}
                          imageUrl={iconUrl}
                          size="md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2D2115] leading-tight">
                          {saint.name}
                        </h3>
                        {saint.greekName && (
                          <p className="text-[11px] text-[#7A6450] font-serif italic mt-0.5">
                            {saint.greekName}
                          </p>
                        )}
                        <p className="text-xs text-[#523F2C] leading-relaxed mt-1.5">
                          {saint.teaching}
                        </p>
                      </div>
                    </div>

                    {/* Golden Motto Banner */}
                    <div className="bg-gradient-to-r from-[#2E154F] via-[#3B1F70] to-[#2E154F] text-[#FDE047] font-cinzel text-xs font-bold text-center py-2 px-3 rounded-xl border border-[#FDE047]/60 shadow-xs mb-3">
                      {saint.motto}
                    </div>

                    {/* Expandable Section: Icon Symbolism, Troparion Hymn, & Name Day */}
                    {isExpanded && (
                      <div className="space-y-3 mb-3 pt-3 border-t border-[#F0E6D8] animate-fadeIn">
                        {/* Icon Symbolism */}
                        {saint.iconSymbolism && (
                          <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E9DFCE] text-xs">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B5A2B] uppercase tracking-wider mb-1">
                              <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                              <span>Sacred Icon Symbolism &amp; Colors</span>
                            </div>
                            <p className="text-[#453221] leading-relaxed">
                              {saint.iconSymbolism}
                            </p>
                          </div>
                        )}

                        {/* Apolytikion / Troparion Hymn */}
                        {saint.hymnApolytikion && (
                          <div className="bg-[#F6F2FF] p-3 rounded-xl border border-[#E2D8FF] text-xs">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5B21B6] uppercase tracking-wider">
                                <Music className="w-3.5 h-3.5 text-[#6D28D9]" />
                                <span>Feast Day Troparion (Apolytikion)</span>
                              </div>
                              <span className="text-[10px] font-bold bg-[#EDE9FE] text-[#5B21B6] px-2 py-0.2 rounded-full border border-[#DDD6FE]">
                                {saint.hymnApolytikion.tone}
                              </span>
                            </div>
                            <p className="text-[#3C1A74] italic leading-relaxed font-serif">
                              "{saint.hymnApolytikion.englishLyrics}"
                            </p>
                          </div>
                        )}

                        {/* Name Day Celebration Tradition */}
                        {saint.nameDayTradition && (
                          <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#DCFCE7] text-xs">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#166534] uppercase tracking-wider mb-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
                              <span>Name Day Tradition &amp; Custom</span>
                            </div>
                            <p className="text-[#14532D] leading-relaxed">
                              {saint.nameDayTradition}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Controls */}
                  <div className="pt-3 border-t border-[#F0E9DF] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setExpandedSaintId(isExpanded ? null : saint.id)}
                      className="text-xs font-semibold text-[#8B5A2B] hover:text-[#573514] flex items-center gap-1 cursor-pointer py-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide Sacred Details' : 'View Icon Details & Hymn'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectSaintDate(saint.month, saint.day);
                        onClose();
                      }}
                      className="text-xs font-bold text-[#8B5A2B] hover:text-[#573514] flex items-center gap-1 bg-[#FAF4EA] hover:bg-[#F3E8D3] px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-[#E3D1B8]"
                    >
                      <span>View on Calendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSaints.length === 0 && (
            <div className="text-center py-12 text-[#8C7662]">
              <p className="text-sm font-semibold">No saints found matching your search.</p>
              <p className="text-xs mt-1">Try searching for Sophia, Nicholas, George, or Constantine!</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#FAF7F2] border-t border-[#EADFCF] flex items-center justify-between text-xs text-[#7A6450]">
          <span className="font-medium">"Through holy icons, the grace of Christ shines into our homes."</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#4A3723] hover:bg-[#332517] text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
