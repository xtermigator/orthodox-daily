import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// App port resolution:
// AI Studio dev environment routes traffic through Nginx (port 8080) to the dev server on port 3000.
function resolvePort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const parsed = parseInt(process.argv[portArgIndex + 1], 10);
    if (!isNaN(parsed)) return parsed;
  }
  if (process.env.NODE_ENV === 'production' && process.env.PORT) {
    const parsed = parseInt(process.env.PORT, 10);
    if (!isNaN(parsed)) return parsed;
  }
  return 3000;
}

const PORT = resolvePort();

app.use(express.json({ limit: '10mb' }));

// In-memory audio cache for instant playback of common prayers
const audioCache = new Map<string, string>();

// Helper to convert 24kHz 16-bit mono PCM into standard WAV
function pcmToWav(
  pcmBuffer: Buffer,
  sampleRate: number = 24000,
  numChannels: number = 1,
  bitsPerSample: number = 16
): Buffer {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  header.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmBuffer.length, 40);
  return Buffer.concat([header, pcmBuffer]);
}

// Secure TTS endpoint
app.post('/api/tts', async (req, res) => {
  const { text, profile = 'storyteller', lang = 'en' } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text parameter' });
  }

  const cacheKey = `${profile}:${lang}:${text.trim()}`;
  if (audioCache.has(cacheKey)) {
    return res.json({
      success: true,
      audioUrl: audioCache.get(cacheKey),
      cached: true,
      profile,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // API key not configured yet; instruct client to use high-fidelity Web Speech fallback
    return res.json({
      success: false,
      fallback: true,
      reason: 'GEMINI_API_KEY not configured on server',
      profile,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const isGreekText = lang === 'el' || /[\u0370-\u03FF]/.test(text);

    let voiceName = 'Kore';
    let stylePrompt = isGreekText
      ? 'A soothing, warm, maternal storyteller speaking in crystal-clear modern and liturgical Greek with gentle breath pauses, pristine vowels, and reverent tenderness.'
      : 'A soothing, authentic maternal storyteller for children speaking with crystalline clarity, warm cadence, gentle breath pauses, and zero rushing.';

    if (profile === 'greek') {
      voiceName = 'Charon';
      stylePrompt = isGreekText
        ? 'A warm authentic Greek Orthodox elder speaking reverently in clear liturgical Greek with melodic tone, distinct syllables, and grandfatherly warmth.'
        : 'A warm authentic Greek Orthodox elder speaking in English with a gentle, distinct Greek accent, reverent melodic cadence, and clear pronunciation.';
    } else if (profile === 'child') {
      voiceName = 'Puck';
      stylePrompt = isGreekText
        ? 'A bright, sweet, cheerful 7-year-old child speaking clear Greek happily, like reciting prayers alongside a best friend.'
        : 'A bright, sweet, cheerful 7-year-old child peer voice speaking with crisp, friendly clarity and joyful Sunday school encouragement.';
    } else if (profile === 'byzantine') {
      voiceName = 'Fenrir';
      stylePrompt = isGreekText
        ? 'A deep, reverent, crystal-clear Orthodox monastic cantor voice speaking sacred Greek liturgy with steady, calm, peaceful enunciation.'
        : 'A deep, reverent, crystal-clear monastic voice speaking sacred prayers with steady pacing, calm dignity, and distinct diction.';
    }

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.trim(),
              speechMetadata: {
                style: stylePrompt,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TTS generation timeout')), 25000)
    );

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;

    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    const base64Data = inlineData?.data;

    if (!base64Data) {
      return res.json({
        success: false,
        fallback: true,
        reason: 'No audio data returned by model',
        profile,
      });
    }

    const mimeType = inlineData?.mimeType || 'audio/pcm;rate=24000';
    let finalAudioUrl: string;

    if (mimeType.includes('pcm') || !mimeType.includes('wav')) {
      const rawPcm = Buffer.from(base64Data, 'base64');
      const wavBuffer = pcmToWav(rawPcm, 24000);
      finalAudioUrl = `data:audio/wav;base64,${wavBuffer.toString('base64')}`;
    } else {
      finalAudioUrl = `data:${mimeType};base64,${base64Data}`;
    }

    audioCache.set(cacheKey, finalAudioUrl);

    return res.json({
      success: true,
      audioUrl: finalAudioUrl,
      cached: false,
      profile,
    });
  } catch (error: any) {
    console.warn('Backend TTS generation warning:', error?.message || error);
    // Graceful fallback response so client immediately switches to Web Speech API
    return res.json({
      success: false,
      fallback: true,
      reason: error?.message || 'TTS generation unavailable',
      profile,
    });
  }
});

// Gospel & Child Prayer Matcher endpoint: matches user's personal prayer intention to Gospel & Orthodox prayer
app.post('/api/match-prayer', async (req, res) => {
  const { intention, lang = 'en' } = req.body;

  if (!intention || typeof intention !== 'string' || intention.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or empty prayer intention' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      success: false,
      fallback: true,
      reason: 'GEMINI_API_KEY not configured on server',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `A child or family member is offering this personal prayer intention to God:
"${intention.trim()}"

You are an Orthodox Christian pastoral educator. Find the closest Gospel passage spoken by Jesus Christ or the Holy Apostles, and compose a warm, comforting child-friendly Orthodox prayer.

Respond with ONLY a JSON object having this exact structure:
{
  "gospelPassage": {
    "citation": "Book chapter:verse (e.g. Matthew 6:26 or John 14:27)",
    "englishText": "Scripture verse in English (NKJV/Orthodox Study Bible style)",
    "greekText": "Original Greek scripture verse text",
    "kidExplanation": "Gentle, kid-friendly takeaway explaining what Jesus is telling them"
  },
  "matchedPrayer": {
    "titleEn": "Child-friendly prayer title in English",
    "titleEl": "Prayer title in Greek",
    "englishText": "Comforting 2-4 sentence prayer in English",
    "greekText": "Warm prayer in modern/liturgical Greek",
    "greekPhonetic": "Greek phonetic guide for English-speaking children to pronounce",
    "comfortMessage": "Short uplifting encouragement for the child's heart"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);

    return res.json({
      success: true,
      ...parsed,
    });
  } catch (error: any) {
    console.warn('Prayer matching model warning:', error?.message || error);
    return res.json({
      success: false,
      fallback: true,
      reason: error?.message || 'Prayer matching unavailable',
    });
  }
});

// App server setup with Vite in dev, static files in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: any) => {
    console.error('Server listen error:', err);
  });
}

startServer();
