// Runtime configuration loader
// In production, this reads from window.__RUNTIME_CONFIG__ (injected at container start)
// In development, it falls back to Vite's import.meta.env

const getRuntimeConfig = () => {
  // Check for runtime config first (production)
  if (typeof window !== 'undefined' && window.__RUNTIME_CONFIG__) {
    return {
      MAPBOX_TOKEN: window.__RUNTIME_CONFIG__.MAPBOX_TOKEN || '',
      API_BASE_URL: window.__RUNTIME_CONFIG__.API_BASE_URL || '/api/'
    };
  }
  
  // Fall back to Vite env vars (development)
  return {
    MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_TOKEN || '',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api/'
  };
};

export const config = getRuntimeConfig();

// Debug logging
console.log('[Config] Source:', window.__RUNTIME_CONFIG__ ? 'runtime' : 'build-time');
console.log('[Config] API URL:', config.API_BASE_URL);
console.log('[Config] Mapbox:', config.MAPBOX_TOKEN ? `configured (${config.MAPBOX_TOKEN.substring(0, 10)}...)` : 'not set');
