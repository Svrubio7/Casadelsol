/**
 * Cookie Consent Management Composable
 * Handles GDPR-compliant cookie consent storage and retrieval
 */

const CONSENT_STORAGE_KEY = 'cookie_consent_preferences'
const CONSENT_VERSION = '1.0'

// Cookie categories
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  FUNCTIONAL: 'functional'
}

// Default consent state
const defaultConsent = {
  version: CONSENT_VERSION,
  timestamp: null,
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false
}

/**
 * Get stored consent preferences
 */
export function getConsentPreferences() {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null
    
    const preferences = JSON.parse(stored)
    // Validate version - if version changed, reset preferences
    if (preferences.version !== CONSENT_VERSION) {
      return null
    }
    
    return preferences
  } catch (error) {
    console.error('Error reading consent preferences:', error)
    return null
  }
}

/**
 * Save consent preferences
 */
export function saveConsentPreferences(preferences) {
  try {
    const consentData = {
      ...preferences,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      necessary: true // Always enforce necessary cookies
    }
    
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData))
    return true
  } catch (error) {
    console.error('Error saving consent preferences:', error)
    return false
  }
}

/**
 * Check if user has given consent
 */
export function hasConsent(category = null) {
  const preferences = getConsentPreferences()
  if (!preferences) return false
  
  if (category) {
    return preferences[category] === true
  }
  
  // Check if any consent was given
  return preferences.analytics || preferences.marketing || preferences.functional
}

/**
 * Check if consent banner should be shown
 */
export function shouldShowConsentBanner() {
  const preferences = getConsentPreferences()
  return preferences === null
}

/**
 * Reset consent (for testing or user request)
 */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error resetting consent:', error)
    return false
  }
}

/**
 * Composable function for Vue components
 */
export function useCookieConsent() {
  const preferences = getConsentPreferences()
  const showBanner = shouldShowConsentBanner()
  
  const acceptAll = () => {
    const newPreferences = {
      ...defaultConsent,
      analytics: true,
      marketing: true,
      functional: true
    }
    saveConsentPreferences(newPreferences)
    return newPreferences
  }
  
  const rejectAll = () => {
    const newPreferences = {
      ...defaultConsent
    }
    saveConsentPreferences(newPreferences)
    return newPreferences
  }
  
  const savePreferences = (prefs) => {
    return saveConsentPreferences(prefs)
  }
  
  return {
    preferences: preferences || defaultConsent,
    showBanner,
    hasConsent,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent
  }
}
