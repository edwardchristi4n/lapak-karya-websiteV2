export const CHAT_CONFIG = {
  MODEL: "gemini-3.5-flash-lite",
  MODEL_OPTIONS: [
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-3-flash-preview",
  ],
  MAX_HISTORY_TURNS: 3,
  MAX_INPUT_CHARS: 300,
  AI_LIMIT_PER_VISITOR: 15,
  COOLDOWN_MS: 4000,
  LOCAL_MAX_WORDS: 8,
  SUGGESTIONS: true,
  AI_ENABLED: true,
  OFFLINE_DAILY_MIN: 60,
  OFFLINE_ERROR_MIN: 5,
  SHOW_TEST_PANEL: false,
};

/** String chat (welcome, offline, FAQ lokal, quick reply) ada di i18n dict
 *  (t.chat) karena berbeda per bahasa — regex FAQ lokal juga per-locale. */
