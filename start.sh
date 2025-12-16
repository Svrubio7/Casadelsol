#!/bin/bash
set -e

echo "=== Starting Casa del Sol ==="

# Ensure staticfiles directory exists
mkdir -p /app/staticfiles

# Generate runtime config for frontend
# Path mapping: /static/config.js -> /app/staticfiles/config.js (nginx alias)
echo "Generating runtime config..."

if [ -n "$VITE_MAPBOX_TOKEN" ]; then
    echo "VITE_MAPBOX_TOKEN: [SET] (${#VITE_MAPBOX_TOKEN} chars)"
else
    echo "VITE_MAPBOX_TOKEN: [NOT SET] - Map will not work!"
fi

cat > /app/staticfiles/config.js << EOF
window.__RUNTIME_CONFIG__ = {
  MAPBOX_TOKEN: "${VITE_MAPBOX_TOKEN:-}",
  API_BASE_URL: "${VITE_API_BASE_URL:-/api/}"
};
console.log('[RuntimeConfig] Loaded - Token:', window.__RUNTIME_CONFIG__.MAPBOX_TOKEN ? 'configured' : 'missing');
EOF

echo "Config written to /app/staticfiles/config.js"
cat /app/staticfiles/config.js

# Start nginx
echo "Starting nginx..."
service nginx start

# Start gunicorn
echo "Starting gunicorn..."
exec gunicorn casadelsol.wsgi:application --bind 127.0.0.1:8000 --workers 3
