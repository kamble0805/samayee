#!/usr/bin/env python
"""
Development server runner.
This script runs the Django development server with development settings.
"""

import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    # Set Django settings module to development settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings_dev')
    
    # Setup Django
    django.setup()
    
    # Run the development server
    execute_from_command_line(['manage.py', 'runserver']) 