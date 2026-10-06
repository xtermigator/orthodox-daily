import React, { useState, useEffect } from 'react';
import { CHILDREN_PRAYERS, VOICE_PROFILES } from '../data/childrenPrayers';
import { audioEngine, AudioPlaybackState } from '../services/audioService';
import { PrayerCard } from './PrayerCard';
import { VoiceSelectorMenu } from './VoiceSelectorMenu';
import { PrayerMatcher } from './PrayerMatcher';
import { VoiceProfileId } from '../types/prayer';
import { 
  Sparkles, 
  Volume2, 
  Heart, 
  BookOpen, 
  Sliders, 
  Languages, 
  Star, 
  Award,
  Sun,
  Moon,
  Shield,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

import { BackgroundThemeId, BACKGROUND_THEMES } from '../types/theme';

interface PrayerDashboardProps {
  onBackToCalendar?: () => void;
  currentTheme?: BackgroundThemeId;
  onOpenThemeModal?: () => void;
}

export const PrayerDashboard: React.FC<PrayerDashboardProps> = ({ 
  onBackToCalendar,
  currentTheme = 'parchment',
  onOpenThemeModal
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'morning' | 'evening' | 'short' | 'matcher'>('all');
  const [globalLang, setGlobalLang] = useState<'en' | 'el' | 'both'>('en');
  const [fontSize, setFontSize] = useState<'large' | 'xlarge'>('large');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [audioState, setAudioState] = useState<AudioPlaybackState>(audioEngine.getState());

  // Interactive Komboskini counter for Jesus prayer
  const [komboskiniCount, setKomboskiniCount] = useState<number>(0);

  const activeThemeObj = BACKGROUND_THEMES[currentTheme] || BACKGROUND_THEMES.parchment;

  useEffect(() => {
    return audioEngine.subscribe((s) => setAudioState(s));
  }, []);

  const handleSelectVoiceProfile = (profileId: VoiceProfileId) => {
    audioEngine.setProfile(profileId);
  };

  const handlePreviewVoice = (profileId: VoiceProfileId) => {
    audioEngine.previewVoice(profileId, globalLang === 'el' ? 'el' : 'en');
  };

  const handleSetPacing = (pacing: 'slow' | 'calm' | 'natural') => {
    audioEngine.setPacing(pacing);
  };

  const filteredPrayers = CHILDREN_PRAYERS.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'core') return p.category === 'core';
    if (activeCategory === 'morning') return p.category === 'morning';
    if (activeCategory === 'evening') return p.category === 'evening';
    if (activeCategory === 'short') return p.category === 'short' || p.category === 'protection';
    return true;
  });

  const currentProfile = VOICE_PROFILES[audioState.activeProfileId] || VOICE_PROFILES.byzantine;

  const handleIncrementKomboskini = () => {
    setKomboskiniCount((prev) => (prev + 1) % 34); // traditional small 33-knot prayer rope
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Top Playful & Soothing Hero Header */}
      <section className="bg-gradient-to-b from-[#F3E8FF] via-[#EDE9FE]/70 to-[#FAF7F2] border-b border-[#E9D5FF] px-4 pt-8 pb-10">
        <div className="max-w-5xl mx-auto">
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-purple-200 shadow-xs text-xs font-bold text-purple-900">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Children’s Daily Prayer Garden • Παιδική Γωνιά Προσευχής</span>
            </div>

            {onBackToCalendar && (
              <button
                onClick={onBackToCalendar}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
              >
                ← Back to Calendar
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Daily Prayers for Children
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mt-2 font-medium max-w-2xl leading-relaxed">
                Learn to talk to God with love, reverent peace, and joy. Listen line-by-line with soothing storytelling, an authentic Greek accent, or a friendly peer child voice!
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="bg-white/95 rounded-2xl p-3 border border-purple-200 shadow-sm flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                {currentProfile.avatarEmoji}
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Speaker
                </div>
                <div className="text-sm font-black text-slate-900">
                  {currentProfile.name}
                </div>
              </div>
            </div>
          </div>

          {/* Voice Selection Cards Section */}
          <div className="mt-8 bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-purple-200 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-black text-slate-900">
                  Select Your Prayer Voice Companion
                </h2>
                <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  4 Audio Profiles
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {onOpenThemeModal && (
                  <button
                    onClick={onOpenThemeModal}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Change Atmosphere Background"
                  >
                    <span>{activeThemeObj.emoji}</span>
                    <span>{activeThemeObj.name.split(' ')[0]}</span>
                  </button>
                )}

                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Speech Tuning</span>
                </button>
              </div>
            </div>

            {/* Pacing Speed Quick Controller */}
            <div className="mb-4 p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Speech Pacing & Clarity:</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSetPacing('slow')}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    audioState.pacing === 'slow'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                  title="0.75x Slow & Clear for young children and learning Greek pronunciation"
                >
                  🐢 0.75x Slow & Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPacing('calm')}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    audioState.pacing === 'calm'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                  title="0.85x Sacred prayer cadence"
                >
                  🕊️ 0.85x Reverent
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPacing('natural')}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    audioState.pacing === 'natural'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                  title="1.0x Standard conversational speed"
                >
                  ⚡ 1.0x Natural
                </button>
              </div>
            </div>

            {/* 4 Distinct Profile Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(VOICE_PROFILES).map((profile) => {
                const isSelected = audioState.activeProfileId === profile.id;
                const isSpeakingThis =
                  audioState.isPlaying &&
                  audioState.activePrayerId === `preview-${profile.id}`;

                return (
                  <div
                    key={profile.id}
                    onClick={() => handleSelectVoiceProfile(profile.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? `bg-white ${profile.pastelTheme.border} shadow-md ring-3 ${profile.pastelTheme.glowRing}`
                        : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 right-4 bg-purple-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                          {profile.avatarEmoji}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 text-base">
                            {profile.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1 mt-0.5">
                            {profile.id === 'byzantine' && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded-full border border-amber-300">
                                ★ Default
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${profile.pastelTheme.badgeBg}`}
                            >
                              {profile.badge}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {profile.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewVoice(profile.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSpeakingThis
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isSpeakingThis ? 'Speaking...' : 'Hear Voice'}</span>
                      </button>

                      <span className="text-[11px] font-medium text-slate-400">
                        {profile.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        {/* Filter and Control Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Prayers ({CHILDREN_PRAYERS.length})
            </button>

            <button
              onClick={() => setActiveCategory('core')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'core'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-800'
              }`}
            >
              Lord’s Prayer & Our Father
            </button>

            <button
              onClick={() => setActiveCategory('morning')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'morning'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 inline mr-1" />
              Morning
            </button>

            <button
              onClick={() => setActiveCategory('evening')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'evening'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 inline mr-1" />
              Bedtime
            </button>

            <button
              onClick={() => setActiveCategory('short')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'short'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5 inline mr-1" />
              Guardian Angel & Komboskini
            </button>

            <button
              onClick={() => setActiveCategory('matcher')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'matcher'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>💖 My Heart’s Prayer</span>
            </button>
          </div>

          {/* Accessibility Controls: Font Size & Default Language */}
          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto text-xs">
            {/* Global Language Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 px-1.5 hidden sm:inline flex items-center gap-1">
                <Languages className="w-3 h-3 text-purple-600" />
                Lang:
              </span>
              <button
                onClick={() => setGlobalLang('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  globalLang === 'en'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch prayers to English"
              >
                English
              </button>
              <button
                onClick={() => setGlobalLang('el')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  globalLang === 'el'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch prayers to Greek"
              >
                Ελληνικά
              </button>
              <button
                onClick={() => setGlobalLang('both')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  globalLang === 'both'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Bilingual Side-by-Side view"
              >
                Both
              </button>
            </div>

            {/* Font Size Scaling */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  fontSize === 'large' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
                title="Comfortable child text"
              >
                Text L
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  fontSize === 'xlarge' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
                title="Extra large text for early readers"
              >
                Text XL
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic View: Heart's Prayer Matcher vs Standard Prayer Cards Stack */}
        {activeCategory === 'matcher' ? (
          <PrayerMatcher onBack={() => setActiveCategory('all')} />
        ) : (
          <>
            {/* Banner inviting kids to match their own prayer */}
            <div className="mb-8 p-5 bg-gradient-to-r from-amber-100 via-rose-50 to-purple-100 rounded-3xl border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-300 flex items-center justify-center text-2xl shrink-0">
                  ✨
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    Have a special prayer in your heart today?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Enter whatever you are feeling, and we will find the closest words spoken by Jesus in the Gospel!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveCategory('matcher')}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rose-600" />
                <span>Try Prayer Matcher →</span>
              </button>
            </div>

            {/* Prayer Cards Stack */}
            <div className="space-y-8">
              {filteredPrayers.map((prayer) => (
                <PrayerCard
                  key={prayer.id}
                  prayer={prayer}
                  onOpenVoiceMenu={() => setIsVoiceModalOpen(true)}
                  defaultLang={globalLang}
                  fontSizeLevel={fontSize}
                />
              ))}
            </div>

            {/* Interactive Kids Prayer Rope (Komboskini) Widget */}
            <div className="mt-12 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-black px-3 py-1 rounded-full">
                    <span>📿 Interactive Practice</span>
                  </div>
                  <h3 className="text-2xl font-black text-rose-950">
                    Children’s Wool Komboskini (Prayer Rope)
                  </h3>
                  <p className="text-sm text-rose-900/80 max-w-lg leading-relaxed">
                    Tap the wooden bead each time you whisper: <em>"Lord Jesus Christ, Son of God, have mercy on me."</em> In Greece and worldwide, monastics and children pray this continuously!
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleIncrementKomboskini}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-amber-600 text-white font-black text-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center border-4 border-white cursor-pointer"
                  >
                    <span>{komboskiniCount}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                      / 33 Knots
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setKomboskiniCount(0)}
                      className="text-xs font-bold text-rose-700 hover:text-rose-900 underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Count</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Voice Selection Full Modal */}
      <VoiceSelectorMenu
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
};
