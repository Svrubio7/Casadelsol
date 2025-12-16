#!/bin/bash

# Generate runtime config for frontend
# This injects environment variables that are available at runtime
cat > /app/staticfiles/static/config.js << EOF
window.__RUNTIME_CONFIG__ = {
  MAPBOX_TOKEN: "${VITE_MAPBOX_TOKEN:-}",
  API_BASE_URL: "${VITE_API_BASE_URL:-/api/}"
};
EOF

echo "Runtime config generated with MAPBOX_TOKEN: ${VITE_MAPBOX_TOKEN:+[SET]}"

# Start nginx and gunicorn
service nginx start
exec gunicorn casadelsol.wsgi:application --bind 127.0.0.1:8000 --workers 3
