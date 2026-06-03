export const CONSENT_STORAGE_KEY = "cookie_consent_preferences";
export const CONSENT_VERSION = "1.0";
export const CONSENT_EVENT = "cookie-consent-updated";
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

export interface ConsentPreferences {
  version: string;
  timestamp: string | null;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const defaultConsent: ConsentPreferences = {
  version: CONSENT_VERSION,
  timestamp: null,
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export function getConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const prefs = JSON.parse(raw) as ConsentPreferences;
    if (prefs.version !== CONSENT_VERSION) return null;
    return prefs;
  } catch {
    return null;
  }
}

export function saveConsent(prefs: Partial<ConsentPreferences>): ConsentPreferences {
  const data: ConsentPreferences = {
    ...defaultConsent,
    ...prefs,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true,
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: data }));
  } catch {
    /* ignore */
  }
  return data;
}
