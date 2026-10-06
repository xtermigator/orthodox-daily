import React, { useState, useEffect } from 'react';
import { ChildPrayer, PrayerVerse, VoiceProfileId } from '../types/prayer';
import { audioEngine, AudioPlaybackState } from '../services/audioService';
import { VOICE_PROFILES } from '../data/childrenPrayers';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Check, 
  Languages, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

interface PrayerCardProps {
  prayer: ChildPrayer;
  onOpenVoiceMenu?: () => void;
  defaultLang?: 'en' | 'el' | 'both';
  fontSizeLevel?: 'large' | 'xlarge';
}

export const PrayerCard: React.FC<PrayerCardProps> = ({
  prayer,
  onOpenVoiceMenu,
  defaultLang = 'en',
  fontSizeLevel = 'large',
}) => {
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'el' | 'both'>(
    prayer.id === 'our-father-greek' ? 'el' : defaultLang
  );
  const [showPhonetics, setShowPhonetics] = useState(true);
  const [showKidMeanings, setShowKidMeanings] = useState(true);
  const [showVocabExplorer, setShowVocabExplorer] = useState(false);
  const [audioState, setAudioState] = useState<AudioPlaybackState>(audioEngine.getState());

  useEffect(() => {
    if (defaultLang === 'both') {
      setActiveLangTab('both');
    } else if (defaultLang === 'el') {
      setActiveLangTab('el');
    } else if (defaultLang === 'en') {
      setActiveLangTab(prayer.id === 'our-father-greek' ? 'el' : 'en');
    }
  }, [defaultLang, prayer.id]);

  useEffect(() => {
    return audioEngine.subscribe((s) => setAudioState(s));
  }, []);

  const isCurrentPrayerActive = audioState.activePrayerId === prayer.id;
  const isPlaying = isCurrentPrayerActive && audioState.isPlaying && !audioState.isPaused;

  const currentProfile = VOICE_PROFILES[audioState.activeProfileId] || VOICE_PROFILES.storyteller;

  const getAudioLanguage = (): 'en' | 'el' => {
    if (activeLangTab === 'el') return 'el';
    if (activeLangTab === 'en') return 'en';
    // For 'both', prefer el if it's the Greek prayer, else en
    return prayer.id === 'our-father-greek' ? 'el' : 'en';
  };

  const handleToggleFullAudio = () => {
    if (isCurrentPrayerActive) {
      if (isPlaying) {
        audioEngine.pause();
      } else if (audioState.isPaused) {
        audioEngine.resume();
      } else {
        startPlayAll();
      }
    } else {
      startPlayAll();
    }
  };

  const startPlayAll = () => {
    const lang = getAudioLanguage();
    const verseList = prayer.verses.map((v) => ({
      id: v.id,
      text: lang === 'el' ? v.greek : v.english,
    }));
    audioEngine.playPrayer(prayer.id, verseList, lang, 0);
  };

  const handlePlaySingleVerse = (verse: PrayerVerse, index: number) => {
    const lang = getAudioLanguage();
    const text = lang === 'el' ? verse.greek : verse.english;
    audioEngine.playSingleVerse(prayer.id, verse.id, index, text, lang);
  };

  const handleQuickSwitchVoice = (profileId: VoiceProfileId) => {
    audioEngine.setProfile(profileId);
  };

  // Typography scale for accessible child readability
  const textSizeClass =
    fontSizeLevel === 'xlarge'
      ? 'text-2xl sm:text-3xl leading-relaxed'
      : 'text-xl sm:text-2xl leading-relaxed';

  return (
    <article
      id={`prayer-card-${prayer.id}`}
      className={`rounded-3xl border-2 shadow-sm transition-all overflow-hidden ${prayer.pastelTheme.cardBg} ${prayer.pastelTheme.border}`}
    >
      {/* Top Header */}
      <div className="p-5 sm:p-6 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Icon */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-black/10 flex items-center justify-center text-3xl shrink-0">
            {prayer.iconType === 'cross' && '☦️'}
            {prayer.iconType === 'dove' && '🕊️'}
            {prayer.iconType === 'sun' && '☀️'}
            {prayer.iconType === 'angel' && '👼'}
            {prayer.iconType === 'heart' && '💖'}
            {prayer.iconType === 'moon' && '🌙'}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {activeLangTab === 'el' ? prayer.titleEl : prayer.titleEn}
              </h3>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${prayer.pastelTheme.badgeBg} ${prayer.pastelTheme.badgeText}`}
              >
                {prayer.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 max-w-xl">
              {prayer.subtitle}
            </p>
          </div>
        </div>

        {/* Language Tabs & Quick Voice Bar */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Language Switcher Tabs */}
          <div className="flex items-center p-1 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveLangTab('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLangTab === 'en'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              English
            </button>

            <button
              onClick={() => setActiveLangTab('el')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLangTab === 'el'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Ελληνικά (Greek)
            </button>

            <button
              onClick={() => setActiveLangTab('both')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLangTab === 'both'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Side-by-side bilingual view"
            >
              Side-by-Side
            </button>
          </div>
        </div>
      </div>

      {/* Audio Playback Dock for this card */}
      <div className={`px-5 sm:px-6 py-3 border-b border-black/5 flex flex-wrap items-center justify-between gap-3 ${prayer.pastelTheme.audioBarBg}`}>
        <div className="flex items-center gap-3">
          {/* Main Play / Pause Button */}
          <button
            onClick={handleToggleFullAudio}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 scale-102'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Prayer</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-amber-300" />
                <span>
                  {isCurrentPrayerActive && audioState.isPaused
                    ? 'Resume'
                    : 'Listen to Prayer'}
                </span>
              </>
            )}
          </button>

          {isCurrentPrayerActive && (
            <button
              onClick={startPlayAll}
              className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-colors cursor-pointer"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Voice Profile Indicator chip with quick switch */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
            <span className="text-base">{currentProfile.avatarEmoji}</span>
            <span className="hidden sm:inline">{currentProfile.name}</span>
            {audioState.activeProfileId === 'byzantine' && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-black">
                Default
              </span>
            )}
            <div className="flex items-center gap-1 ml-1 pl-1.5 border-l border-slate-200">
              <button
                onClick={() => handleQuickSwitchVoice('byzantine')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${
                  audioState.activeProfileId === 'byzantine'
                    ? 'bg-amber-200 ring-2 ring-amber-500 font-bold'
                    : 'hover:bg-slate-100'
                }`}
                title="Father Paisios (Default • Monastic Cantor)"
              >
                🕯️
              </button>
              <button
                onClick={() => handleQuickSwitchVoice('storyteller')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${
                  audioState.activeProfileId === 'storyteller'
                    ? 'bg-purple-100 ring-2 ring-purple-400'
                    : 'hover:bg-slate-100'
                }`}
                title="Storyteller Sophia"
              >
                🦉
              </button>
              <button
                onClick={() => handleQuickSwitchVoice('greek')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${
                  audioState.activeProfileId === 'greek'
                    ? 'bg-sky-100 ring-2 ring-sky-400'
                    : 'hover:bg-slate-100'
                }`}
                title="Elder Yiannis (Greek Accent)"
              >
                🌿
              </button>
              <button
                onClick={() => handleQuickSwitchVoice('child')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${
                  audioState.activeProfileId === 'child'
                    ? 'bg-amber-100 ring-2 ring-amber-400'
                    : 'hover:bg-slate-100'
                }`}
                title="Little Nikos (Peer Kid)"
              >
                🌟
              </button>
            </div>
          </div>
        </div>

        {/* Toggles: Phonetics & Kid Explanations */}
        <div className="flex items-center gap-3 text-xs">
          {(activeLangTab === 'el' || activeLangTab === 'both') && (
            <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <input
                type="checkbox"
                checked={showPhonetics}
                onChange={(e) => setShowPhonetics(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 accent-sky-600 cursor-pointer"
              />
              <span>Phonetics Guide</span>
            </label>
          )}

          <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <input
              type="checkbox"
              checked={showKidMeanings}
              onChange={(e) => setShowKidMeanings(e.target.checked)}
              className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
            />
            <span>Kid Meanings</span>
          </label>
        </div>
      </div>

      {/* Main Prayer Body: Verses with Karaoke Highlighting */}
      <div className="p-5 sm:p-7 space-y-4">
        {prayer.verses.map((verse, index) => {
          const isLordsPrayer = prayer.id === 'lords-prayer' || prayer.id === 'our-father-greek';
          const isVerseActive =
            isCurrentPrayerActive &&
            (audioState.isPlaying || audioState.isPaused) &&
            audioState.activeVerseId === verse.id;

          return (
            <div
              key={verse.id}
              onClick={() => handlePlaySingleVerse(verse, index)}
              className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer relative group ${
                isVerseActive
                  ? isLordsPrayer
                    ? 'bg-gradient-to-r from-amber-100/95 via-amber-50 to-amber-100/95 border-2 border-amber-400 ring-4 ring-amber-300/40 shadow-lg scale-[1.015] border-l-8 border-l-amber-500'
                    : `${prayer.pastelTheme.highlightBg} shadow-md scale-[1.01] ring-2 ring-amber-400/80`
                  : 'bg-white/80 hover:bg-white border border-black/5 hover:border-black/10'
              }`}
            >
              {/* Karaoke Active Glow Marker */}
              {isVerseActive && (
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-bounce border border-amber-300">
                  <Volume2 className="w-3.5 h-3.5 fill-current animate-pulse text-amber-950" />
                  <span>
                    👉 Reciting Line {index + 1} {activeLangTab === 'both' ? '(English & Greek)' : activeLangTab === 'el' ? '(Ελληνικά)' : '(English)'}
                  </span>
                  {audioState.isPaused && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 rounded-full font-bold">
                      Paused
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2.5">
                  {/* English Version */}
                  {(activeLangTab === 'en' || activeLangTab === 'both') && (
                    <div className={isVerseActive && isLordsPrayer ? 'bg-amber-100/60 p-2 rounded-xl border border-amber-200/50' : ''}>
                      {activeLangTab === 'both' && (
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1 ${
                          isVerseActive ? 'bg-amber-400 text-amber-950 font-black shadow-xs' : 'text-purple-700 bg-purple-100'
                        }`}>
                          English
                        </span>
                      )}
                      <p className={`font-semibold ${isVerseActive ? 'text-slate-950 font-black' : 'text-slate-900'} ${textSizeClass}`}>
                        {verse.english}
                      </p>
                    </div>
                  )}

                  {/* Greek Version */}
                  {(activeLangTab === 'el' || activeLangTab === 'both') && (
                    <div className={`${activeLangTab === 'both' ? 'pt-2 border-t border-slate-200/60' : ''} ${
                      isVerseActive && isLordsPrayer ? 'bg-sky-50/70 p-2 rounded-xl border border-sky-200/60 mt-2' : ''
                    }`}>
                      {activeLangTab === 'both' && (
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1 ${
                          isVerseActive ? 'bg-sky-500 text-white font-black shadow-xs' : 'text-sky-700 bg-sky-100'
                        }`}>
                          Ελληνικά (Greek)
                        </span>
                      )}
                      <p className={`font-serif font-bold ${isVerseActive ? 'text-sky-950 font-black drop-shadow-2xs' : 'text-sky-900'} ${textSizeClass}`}>
                        {verse.greek}
                      </p>

                      {/* Phonetic Pronunciation for Kids */}
                      {showPhonetics && (
                        <p className={`text-xs sm:text-sm font-mono px-3 py-1.5 rounded-xl border mt-1.5 italic ${
                          isVerseActive ? 'text-sky-950 bg-sky-100/90 border-sky-300 font-bold' : 'text-sky-800/80 bg-sky-50/80 border-sky-100'
                        }`}>
                          🗣️ {verse.greekPhonetic}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Child-Friendly Meaning Drawer */}
                  {showKidMeanings && verse.kidMeaning && (
                    <div className="flex items-start gap-2 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-amber-900 mt-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-amber-950 font-bold">Kid Meaning: </strong>
                        {verse.kidMeaning}
                      </p>
                    </div>
                  )}
                </div>

                {/* Single Verse Play Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySingleVerse(verse, index);
                  }}
                  className={`p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                    isVerseActive
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                  title="Listen to this line"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Greek Vocabulary Explorer (for Lord's Prayer / Our Father) */}
      {prayer.vocabularyExplorers && prayer.vocabularyExplorers.length > 0 && (
        <div className="px-5 sm:px-7 pb-6">
          <div className="bg-white/90 rounded-2xl border border-sky-200 p-4 shadow-xs">
            <button
              onClick={() => setShowVocabExplorer(!showVocabExplorer)}
              className="w-full flex items-center justify-between text-left text-sky-950 font-bold text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>Learn Greek Words in This Prayer (4 Words)</span>
              </div>
              {showVocabExplorer ? (
                <ChevronUp className="w-4 h-4 text-sky-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-sky-600" />
              )}
            </button>

            {showVocabExplorer && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-3 border-t border-sky-100">
                {prayer.vocabularyExplorers.map((vocab) => (
                  <div
                    key={vocab.greekWord}
                    className="p-3 bg-sky-50 rounded-xl border border-sky-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{vocab.emoji}</span>
                        <span className="text-[11px] font-mono text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full font-bold">
                          {vocab.phonetic}
                        </span>
                      </div>
                      <h5 className="text-lg font-bold font-serif text-sky-950 mt-1">
                        {vocab.greekWord}
                      </h5>
                      <p className="text-xs font-bold text-sky-800">
                        = {vocab.englishMeaning}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2 leading-tight">
                      {vocab.childNote}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kid Takeaway Footer Banner */}
      <div className="p-4 sm:p-5 bg-white/70 border-t border-black/5 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
          💡
        </div>
        <div className="flex-1">
          <strong className="text-slate-900 font-bold">Kid Takeaway: </strong>
          <span>{prayer.kidTakeaway}</span>
        </div>
      </div>
    </article>
  );
};
