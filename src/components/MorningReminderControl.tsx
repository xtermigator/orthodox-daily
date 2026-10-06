import React, { useState, useEffect, useCallback, useId } from 'react';
import { 
  Bell, 
  BellOff, 
  BellRing, 
  Clock, 
  Check, 
  Sparkles, 
  Volume2, 
  AlertCircle, 
  Info,
  ChevronDown,
  ChevronUp,
  Sun,
  X
} from 'lucide-react';
import { 
  ReminderSettings, 
  getSavedReminderSettings, 
  saveReminderSettings, 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  showMorningNotification, 
  playGentleBellChime,
  format12HourTime
} from '../utils/reminderService';

interface MorningReminderControlProps {
  onSelectMorningPrayer?: () => void;
  className?: string;
  isCompact?: boolean;
}

const COMMON_PRESET_TIMES = [
  { label: '6:30 AM', value: '06:30' },
  { label: '7:00 AM', value: '07:00' },
  { label: '7:30 AM', value: '07:30' },
  { label: '8:00 AM', value: '08:00' },
  { label: '8:30 AM', value: '08:30' },
  { label: '9:00 AM', value: '09:00' },
];

export const MorningReminderControl: React.FC<MorningReminderControlProps> = ({
  onSelectMorningPrayer,
  className = '',
  isCompact = false
}) => {
  const switchId = useId();
  const [settings, setSettings] = useState<ReminderSettings>(getSavedReminderSettings);
  const [permission, setPermission] = useState<NotificationPermission>(getNotificationPermission);
  const [supported, setSupported] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [inAppToast, setInAppToast] = useState<{ visible: boolean; message: string; title: string } | null>(null);

  // Sync supported state on mount
  useEffect(() => {
    setSupported(isNotificationSupported());
    setPermission(getNotificationPermission());
  }, []);

  // Update storage whenever settings change
  const updateSettings = useCallback((newPartial: Partial<ReminderSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newPartial };
      saveReminderSettings(updated);
      return updated;
    });
  }, []);

  // Check reminder time every 20 seconds while user is on the site
  useEffect(() => {
    if (!settings.enabled) return;

    const checkTimeAndTrigger = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      // Check if scheduled time has arrived or passed today, and has not yet triggered today
      if (currentTimeStr >= settings.time && settings.lastNotifiedDate !== todayStr) {
        // Trigger reminder
        if (settings.playChime) {
          playGentleBellChime();
        }

        // Browser notification
        showMorningNotification(
          '☦ Orthodox Morning Prayer & Reading',
          "Good morning! It's time to begin your family's day in peace with today's morning prayer and holy scripture.",
          () => {
            if (onSelectMorningPrayer) onSelectMorningPrayer();
            const el = document.getElementById('daily-prayer-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        );

        // In-app visual toast
        setInAppToast({
          visible: true,
          title: '🌅 Morning Prayer & Scripture Time',
          message: 'Begin your family\'s day in God\'s peace with today\'s morning devotion.'
        });

        // Mark today as notified
        updateSettings({ lastNotifiedDate: todayStr });
      }
    };

    // Run immediate check and interval
    checkTimeAndTrigger();
    const interval = setInterval(checkTimeAndTrigger, 20000);
    return () => clearInterval(interval);
  }, [settings.enabled, settings.time, settings.lastNotifiedDate, settings.playChime, onSelectMorningPrayer, updateSettings]);

  // Handle master toggle switch
  const handleToggleReminder = async () => {
    if (!settings.enabled) {
      // User is enabling reminder
      if (supported && permission !== 'granted') {
        const result = await requestNotificationPermission();
        setPermission(result);
        if (result === 'denied') {
          // Still enable in-app reminder
          updateSettings({ enabled: true });
          return;
        }
      }
      updateSettings({ enabled: true });
    } else {
      // User is disabling reminder
      updateSettings({ enabled: false });
    }
  };

  // Handle Test Notification
  const handleTestReminder = () => {
    setTestStatus('testing');

    if (settings.playChime) {
      playGentleBellChime();
    }

    if (supported && permission === 'granted') {
      showMorningNotification(
        '☦ Test: Morning Prayer & Reading Reminder',
        `This is how your daily reminder will arrive at ${format12HourTime(settings.time)}. May God bless your family's morning!`,
        () => {
          if (onSelectMorningPrayer) onSelectMorningPrayer();
          const el = document.getElementById('daily-prayer-card');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      );
    }

    // Always show in-app banner preview
    setInAppToast({
      visible: true,
      title: '☦ Morning Prayer & Reading Reminder',
      message: `Gentle reminder active for ${format12HourTime(settings.time)}. Start your family's morning in prayer!`
    });

    setTimeout(() => {
      setTestStatus('success');
      setTimeout(() => setTestStatus('idle'), 3000);
    }, 600);
  };

  // If in compact mode, render a streamlined pill toggle for card headers
  if (isCompact) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={handleToggleReminder}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
            settings.enabled
              ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] hover:bg-[#FDE68A]'
              : 'bg-[#F4EDE2] text-[#8C7662] border-[#E3D6C3] hover:text-[#5B3E1F]'
          }`}
          title={settings.enabled ? `Morning Reminder Active (${format12HourTime(settings.time)})` : 'Click to enable Morning Prayer reminder'}
        >
          {settings.enabled ? (
            <BellRing className="w-3.5 h-3.5 text-[#D97706] animate-bounce" />
          ) : (
            <Bell className="w-3.5 h-3.5 text-[#9A7D60]" />
          )}
          <span>{settings.enabled ? `Reminder: ${format12HourTime(settings.time)}` : 'Reminder Off'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* In-App Toast / Gentle Banner Alert */}
      {inAppToast?.visible && (
        <div 
          role="alert"
          aria-live="polite"
          className="mb-4 bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FFFBEB] border-2 border-[#F59E0B] rounded-2xl p-4 shadow-md flex items-center justify-between gap-4 animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-inner">
              <Sun className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-bold text-[#78350F] flex items-center gap-1.5">
                <span>{inAppToast.title}</span>
                <span className="text-[10px] bg-[#FDE68A] text-[#92400E] px-2 py-0.5 rounded-full font-sans font-semibold">
                  Today's Reading
                </span>
              </h4>
              <p className="text-xs text-[#92400E] mt-0.5">
                {inAppToast.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onSelectMorningPrayer && (
              <button
                type="button"
                onClick={() => {
                  onSelectMorningPrayer();
                  const el = document.getElementById('daily-prayer-card');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setInAppToast(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Begin Prayer Now
              </button>
            )}
            <button
              type="button"
              onClick={() => setInAppToast(null)}
              className="p-1 rounded-lg text-[#92400E] hover:bg-[#FDE68A] transition-colors cursor-pointer"
              aria-label="Dismiss reminder banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Morning Reminder Box */}
      <div 
        id="morning-prayer-reminder-box"
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          settings.enabled
            ? 'bg-gradient-to-br from-[#FFFDF8] via-[#FEFBF2] to-[#FFF9ED] border-[#EADBB8] shadow-xs'
            : 'bg-[#FAF7F2] border-[#E8DFC8]'
        }`}
      >
        {/* Header Strip with Master Toggle */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              settings.enabled
                ? 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#B45309] border-[#FCD34D] shadow-xs'
                : 'bg-[#EFE7D8] text-[#8C7662] border-[#E0D4C0]'
            }`}>
              {settings.enabled ? (
                <BellRing className="w-5 h-5 text-[#B45309]" />
              ) : (
                <BellOff className="w-5 h-5 text-[#8C7662]" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#2D2115]">
                  Morning Prayer &amp; Reading Reminder
                </h3>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  settings.enabled
                    ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                    : 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
                }`}>
                  {settings.enabled ? `Active • ${format12HourTime(settings.time)}` : 'Off'}
                </span>
              </div>
              <p className="text-xs text-[#7A6450] mt-0.5">
                {settings.enabled 
                  ? `Gently notifies your family at ${format12HourTime(settings.time)} every morning to pray and read together.`
                  : 'Toggle to receive a gentle daily notification when it is time for your family\'s morning reading.'}
              </p>
            </div>
          </div>

          {/* Toggle Switch and Settings Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* The Master Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#5B4228] hidden xs:inline">
                {settings.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <label 
                htmlFor={switchId}
                className="relative inline-flex items-center cursor-pointer select-none"
              >
                <input
                  id={switchId}
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={handleToggleReminder}
                  className="sr-only peer"
                  aria-label="Toggle Morning Prayer reminder"
                />
                <div className="w-12 h-6 bg-[#D8CCB8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309] shadow-inner"></div>
              </label>
            </div>

            {/* Expand / Customize button */}
            <button
              type="button"
              id="reminder-options-toggle-btn"
              onClick={() => setIsExpanded(prev => !prev)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#7C5A32] hover:text-[#4A3215] bg-[#EFE6D7] hover:bg-[#E5D9C4] transition-colors flex items-center gap-1 cursor-pointer border border-[#DECEB6]"
              title="Customize reminder time and sound"
            >
              <span>{isExpanded ? 'Less' : 'Settings'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Configuration Drawer */}
        {isExpanded && (
          <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#EADBCA] bg-[#FAF5EC]/70 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Time Selector */}
            <div>
              <label className="block text-xs font-bold text-[#4F361F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Scheduled Reminder Time</span>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {COMMON_PRESET_TIMES.map(preset => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => updateSettings({ time: preset.value })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                      settings.time === preset.value
                        ? 'bg-[#B45309] text-white border-[#92400E] shadow-2xs font-bold'
                        : 'bg-white hover:bg-[#F5ECE0] text-[#6A4D2E] border-[#DFCFB8]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}

                {/* Custom Time Input */}
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#DFCFB8] text-xs">
                  <span className="text-[#8C7662] text-[11px] font-medium">Custom:</span>
                  <input
                    type="time"
                    value={settings.time}
                    onChange={(e) => {
                      if (e.target.value) {
                        updateSettings({ time: e.target.value });
                      }
                    }}
                    className="text-xs font-semibold text-[#2D2115] bg-transparent outline-none cursor-pointer"
                    aria-label="Custom reminder time"
                  />
                </div>
              </div>
            </div>

            {/* Sound Chime Toggle & Browser Permission Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EADBCA]">
              {/* Chime Option */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#4F361F] bg-white p-2.5 rounded-xl border border-[#DFCFB8]">
                <input
                  type="checkbox"
                  checked={settings.playChime}
                  onChange={(e) => updateSettings({ playChime: e.target.checked })}
                  className="rounded text-[#B45309] focus:ring-[#B45309] w-4 h-4 cursor-pointer"
                />
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#B45309]" />
                  <span className="font-semibold">Gentle Church Bell Chime</span>
                </div>
                <span className="text-[10px] text-[#8C7662] ml-auto">Reverent tone</span>
              </label>

              {/* Browser Permission Badge */}
              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-[#DFCFB8]">
                <div className="flex items-center gap-1.5 text-[#4F361F]">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span className="font-semibold">Browser Alert:</span>
                </div>

                {permission === 'granted' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                    <Check className="w-3 h-3" />
                    <span>Enabled</span>
                  </span>
                ) : permission === 'denied' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B91C1C] bg-[#FEE2E2] px-2 py-0.5 rounded-full border border-[#FECACA]" title="Please allow notifications in browser site permissions">
                    <AlertCircle className="w-3 h-3" />
                    <span>Blocked in Browser</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      const res = await requestNotificationPermission();
                      setPermission(res);
                    }}
                    className="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Click to Grant</span>
                  </button>
                )}
              </div>
            </div>

            {/* Helper explanation and Test button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#7A6450]">
              <div className="flex items-start gap-1.5 text-[11px] max-w-md">
                <Info className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                <span>
                  The notification includes today's morning prayer reference and a gentle chime. Even if notifications are blocked, you will see an in-app morning banner while visiting.
                </span>
              </div>

              {/* Test Button */}
              <button
                type="button"
                id="test-morning-reminder-btn"
                onClick={handleTestReminder}
                disabled={testStatus === 'testing'}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-[#FAF3E5] hover:bg-[#F3E7D0] text-[#7C5A32] hover:text-[#4A3215] font-bold border border-[#DCCBB1] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                {testStatus === 'testing' ? (
                  <>
                    <BellRing className="w-3.5 h-3.5 text-[#B45309] animate-spin" />
                    <span>Testing Chime &amp; Notification...</span>
                  </>
                ) : testStatus === 'success' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Reminder Sent!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Send Test Reminder</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
