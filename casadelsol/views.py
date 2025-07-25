from django.shortcuts import render
from django.conf import settings
import os

def serve_frontend(request):
    """Serve the Vue.js frontend for all non-API routes"""
    return render(request, 'index.html') 