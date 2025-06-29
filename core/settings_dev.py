"""
Development settings for core project.
This file extends the main settings with development-specific configurations.
"""

from .settings import *

# Development-specific overrides
DEBUG = True

# Use SQLite for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Allow all origins in development
CORS_ALLOW_ALL_ORIGINS = True

# Disable HTTPS requirements in development
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Add development hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# Disable WhiteNoise compression in development
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

print("🔧 Development settings loaded!") 