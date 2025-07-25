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

# Copy frontend build to staticfiles directory
RUN cp -r frontend/dist/* staticfiles/

# Collect static files
RUN python manage.py collectstatic --noinput

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx site config
RUN rm /etc/nginx/sites-enabled/default || true

EXPOSE 80

# Expose port for Django
EXPOSE 8000

# Entrypoint
CMD ["gunicorn", "casadelsol.wsgi:application", "--bind", "0.0.0.0:8000"]