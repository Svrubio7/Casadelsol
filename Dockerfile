FROM python:3.11-slim

# Install system dependencies and Node.js 20.x
RUN apt-get update && apt-get install -y curl gnupg2 nginx && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build
WORKDIR /app

# Collect static files (if needed)
RUN python manage.py collectstatic --noinput

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx site config
RUN rm /etc/nginx/sites-enabled/default || true

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port 80
EXPOSE 80
CMD ["/app/start.sh"]
