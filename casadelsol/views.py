from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
import os

def serve_frontend(request):
    """Serve the Vue.js frontend for all non-API routes"""
    # Serve the frontend index.html from staticfiles
    index_path = os.path.join(settings.STATIC_ROOT, 'index.html')
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return HttpResponse(content, content_type='text/html')
    else:
        # Fallback to a simple message if index.html doesn't exist
        return HttpResponse(f"Frontend not found. Looking for: {index_path}", status=404) 