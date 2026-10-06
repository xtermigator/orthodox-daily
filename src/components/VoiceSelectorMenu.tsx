import React, { useState, useEffect } from 'react';
import { audioEngine, AudioPlaybackState } from '../services/audioService';
import { VOICE_PROFILES } from '../data/childrenPrayers';
import { VoiceProfileId } from '../types/prayer';
import { Volume2, Check, Sparkles, X, Play, Music, Heart } from 'lucide-react';

interface VoiceSelectorMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
  compact?: boolean;
}

export const VoiceSelectorMenu: React.FC<VoiceSelectorMenuProps> = ({
  isOpen = false,
  onClose,
  compact = false,
}) => {
  const [audioState, setAudioState] = useState<AudioPlaybackState>(audioEngine.getState());
  const [previewLang, setPreviewLang] = useState<'en' | 'el'>('en');

  useEffect(() => {
    return audioEngine.subscribe((s) => setAudioState(s));
  }, []);

  const handleSelectProfile = (profileId: VoiceProfileId) => {
    audioEngine.setProfile(profileId);
  };

  const handlePreviewVoice = (e: React.MouseEvent, profileId: VoiceProfileId) => {
    e.stopPropagation();
    audioEngine.previewVoice(profileId, previewLang);
  };

  const handleSetPacing = (pacing: 'slow' | 'calm' | 'natural') => {
    audioEngine.setPacing(pacing);
  };

  // Explicitly ensure Father Paisios is the first choice, followed by other authentic prayer companions
  const profilesList = [
    VOICE_PROFILES.byzantine,
    VOICE_PROFILES.storyteller,
    VOICE_PROFILES.greek,
    VOICE_PROFILES.child,
  ].filter(Boolean);

  // Compact inline bar view (used in headers and card toolbars)
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-1.5 px-2 text-xs font-bold text-[#475569]">
          <Volume2 className="w-4 h-4 text-[#8B5CF6]" />
          <span className="hidden sm:inline">Voice:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {profilesList.map((p) => {
            const isSelected = audioState.activeProfileId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProfile(p.id as VoiceProfileId)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? `${p.pastelTheme.badgeBg} ${p.pastelTheme.badgeText} shadow-sm ring-2 ${p.pastelTheme.glowRing}`
                    : 'bg-white hover:bg-slate-100 text-[#475569] border border-slate-200'
                }`}
                title={p.description}
              >
                <span className="text-sm">{p.avatarEmoji}</span>
                <span>{p.name.split(' ')[0]}</span>
                {isSelected && <Check className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Full interactive Modal
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[#E9D5FF] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#EDE9FE] via-[#F5F3FF] to-[#E0F2FE] p-5 border-b border-[#DDD6FE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#C4B5FD] flex items-center justify-center text-2xl">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#1E1B4B]">
                  Choose Your Prayer Companion
                </h3>
                <span className="bg-[#DDD6FE] text-[#5B21B6] text-xs font-bold px-2 py-0.5 rounded-full">
                  4 Audio Profiles
                </span>
              </div>
              <p className="text-xs text-[#5B21B6]/80 mt-0.5">
                Switch seamlessly between storyteller, Greek accent, young child, and monastic cantor voices
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/80 text-[#4B5563] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Speech Pacing & Enunciation Controls */}
        <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#F1E5D5] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Pacing Speed Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[#64748B] font-bold">Speech Pacing:</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleSetPacing('slow')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  audioState.pacing === 'slow'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Slower pace for young children and learning Greek pronunciation"
              >
                🐢 0.75x Slow & Clear
              </button>
              <button
                type="button"
                onClick={() => handleSetPacing('calm')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  audioState.pacing === 'calm'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sacred prayer cadence"
              >
                🕊️ 0.85x Reverent
              </button>
              <button
                type="button"
                onClick={() => handleSetPacing('natural')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  audioState.pacing === 'natural'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Standard conversational speed"
              >
                ⚡ 1.0x Natural
              </button>
            </div>
          </div>

          {/* Language switch for preview samples */}
          <div className="flex items-center gap-2">
            <span className="text-[#64748B] font-bold">Audition Language:</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setPreviewLang('en')}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  previewLang === 'en'
                    ? 'bg-[#8B5CF6] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setPreviewLang('el')}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  previewLang === 'el'
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ελληνικά (Greek)
              </button>
            </div>
          </div>
        </div>

        {/* Voice Cards */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-[#FAF8F5]">
          {profilesList.map((profile) => {
            const isSelected = audioState.activeProfileId === profile.id;
            const isCurrentlySpeakingThis =
              audioState.isPlaying &&
              audioState.activePrayerId === `preview-${profile.id}`;

            return (
              <div
                key={profile.id}
                onClick={() => handleSelectProfile(profile.id)}
                className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? `bg-white ${profile.pastelTheme.border} shadow-lg ring-3 ${profile.pastelTheme.glowRing}`
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Active Indicator Ribbon */}
                {isSelected && (
                  <div className="absolute -top-3 right-5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Active Voice</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Avatar & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-3xl shadow-inner shrink-0">
                      {profile.avatarEmoji}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {profile.name}
                        </h4>
                        {profile.id === 'byzantine' && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full border border-amber-300">
                            ★ Recommended Default
                          </span>
                        )}
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${profile.pastelTheme.badgeBg}`}>
                          {profile.badge}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        {profile.title} • <span className="font-cinzel">{profile.greekName}</span>
                      </p>

                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-md">
                        {profile.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Preview Button */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => handlePreviewVoice(e, profile.id)}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
                        isCurrentlySpeakingThis
                          ? 'bg-[#E11D48] text-white animate-pulse'
                          : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-slate-800 border border-slate-300'
                      }`}
                    >
                      {isCurrentlySpeakingThis ? (
                        <>
                          <Music className="w-4 h-4 animate-spin" />
                          <span>Speaking...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current text-[#8B5CF6]" />
                          <span>Hear Sample</span>
                        </>
                      )}
                    </button>

                    <div className="text-[11px] text-slate-400 font-medium">
                      Pacing: {Math.round(profile.speechRate * 100)}%
                    </div>
                  </div>
                </div>

                {/* Sample Text Quote */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs italic text-slate-600 bg-slate-50/70 p-2.5 rounded-xl">
                  <span className="text-[#8B5CF6] font-bold text-sm not-italic">“</span>
                  <p className="flex-1">
                    {previewLang === 'el' ? profile.previewSampleEl : profile.previewSampleEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>High contrast, gentle pacing & kid-friendly vocal clarity</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl shadow-sm transition-colors cursor-pointer"
          >
            Done & Pray
          </button>
        </div>
      </div>
    </div>
  );
};
