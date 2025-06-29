#!/usr/bin/env python
"""
Script to create a superuser automatically during deployment.
This will be run during the build process.
"""

import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import CustomUser

def create_superuser():
    """Create a superuser if it doesn't exist."""
    try:
        # Check if superuser already exists
        if CustomUser.objects.filter(is_superuser=True).exists():
            print("Superuser already exists. Skipping creation.")
            return
        
        # Create superuser
        admin_user = CustomUser.objects.create_superuser(
            username='admin',
            email='admin@samayee.com',
            password='admin123456',
            first_name='Admin',
            last_name='User',
            is_active=True,
            is_staff=True,
            is_superuser=True
        )
        
        print(f"Superuser created successfully!")
        print(f"Username: admin")
        print(f"Email: admin@samayee.com")
        print(f"Password: admin123456")
        print("Please change the password after first login!")
        
    except Exception as e:
        print(f"Error creating superuser: {e}")

if __name__ == '__main__':
    create_superuser() 