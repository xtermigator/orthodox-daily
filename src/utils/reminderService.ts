/**
 * Orthodox Morning Prayer Reminder Service
 * Handles Browser Notification API permissions, scheduling checks,
 * local persistence, and gentle multi-harmonic Web Audio chimes.
 */

export interface ReminderSettings {
  enabled: boolean;
  time: string; // "HH:mm", e.g. "08:00"
  playChime: boolean;
  lastNotifiedDate: string; // "YYYY-MM-DD"
}

const STORAGE_KEY = 'orthodox_morning_reminder_settings';

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: false,
  time: '08:00',
  playChime: true,
  lastNotifiedDate: ''
};

export const getSavedReminderSettings = (): ReminderSettings => {
  if (typeof window === 'undefined') return DEFAULT_REMINDER_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_REMINDER_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_REMINDER_SETTINGS.enabled,
      time: typeof parsed.time === 'string' && /^\d{2}:\d{2}$/.test(parsed.time) ? parsed.time : DEFAULT_REMINDER_SETTINGS.time,
      playChime: typeof parsed.playChime === 'boolean' ? parsed.playChime : DEFAULT_REMINDER_SETTINGS.playChime,
      lastNotifiedDate: typeof parsed.lastNotifiedDate === 'string' ? parsed.lastNotifiedDate : ''
    };
  } catch (e) {
    console.warn('Failed to parse reminder settings from localStorage:', e);
    return DEFAULT_REMINDER_SETTINGS;
  }
};

export const saveReminderSettings = (settings: ReminderSettings): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save reminder settings to localStorage:', e);
  }
};

export const isNotificationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) return 'denied';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (e) {
    console.warn('Error requesting notification permission:', e);
    return 'denied';
  }
};

/**
 * Synthesizes a peaceful, reverent Orthodox sanctuary bell chime using Web Audio API.
 * Uses harmonious sine frequencies with smooth attack and exponential decay to evoke
 * a sacred cathedral bell with zero external asset dependencies.
 */
export const playGentleBellChime = (type: 'church-bell' | 'chime-chord' = 'church-bell'): void => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Frequencies of a peaceful Orthodox sanctuary bell: G4 (392Hz), C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
    const tones = type === 'church-bell'
      ? [
          { freq: 392.00, delay: 0.00, volume: 0.16, decay: 2.8 }, // G4 deep bell body
          { freq: 523.25, delay: 0.04, volume: 0.15, decay: 2.5 }, // C5 harmonic
          { freq: 659.25, delay: 0.12, volume: 0.12, decay: 2.2 }, // E5 peaceful third
          { freq: 783.99, delay: 0.22, volume: 0.10, decay: 2.0 }, // G5 pure fifth
          { freq: 1046.50, delay: 0.35, volume: 0.07, decay: 1.8 }  // C6 sacred overtone
        ]
      : [
          { freq: 523.25, delay: 0.00, volume: 0.15, decay: 2.0 },
          { freq: 659.25, delay: 0.10, volume: 0.12, decay: 1.8 },
          { freq: 783.99, delay: 0.20, volume: 0.10, decay: 1.6 }
        ];

    tones.forEach(({ freq, delay, volume, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      // Smooth envelope to prevent any audio pops
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(volume, now + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + decay + 0.05);
    });
  } catch (err) {
    console.warn('Unable to play bell chime via Web Audio:', err);
  }
};

/**
 * Dispatches a native browser notification if permissions are granted.
 */
export const showMorningNotification = (
  customTitle?: string,
  customBody?: string,
  onNotificationClick?: () => void
): Notification | null => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return null;
  }

  const title = customTitle || '☦ Orthodox Morning Prayer & Reading';
  const options: NotificationOptions & { renotify?: boolean } = {
    body: customBody || "Good morning! It's time to begin your family's day in peace with today's morning prayer and holy scripture.",
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'orthodox-morning-prayer-reminder',
    renotify: true,
    requireInteraction: false
  };

  try {
    const notification = new Notification(title, options);
    
    notification.onclick = () => {
      try {
        window.focus();
      } catch {
        // window.focus might be restricted in some browser contexts
      }
      if (onNotificationClick) {
        onNotificationClick();
      } else {
        const prayerCard = document.getElementById('daily-prayer-card');
        if (prayerCard) {
          prayerCard.scrollIntoView({ behavior: 'smooth' });
        }
      }
      notification.close();
    };

    return notification;
  } catch (err) {
    console.warn('Error creating browser notification:', err);
    return null;
  }
};

/**
 * Formats 24h time "08:00" to friendly 12h time "8:00 AM"
 */
export const format12HourTime = (time24: string): string => {
  const parts = time24.split(':');
  if (parts.length !== 2) return time24;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  return `${hours}:${minutes} ${ampm}`;
};
