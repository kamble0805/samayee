# Superuser Setup Guide

## Overview
This system automatically removes existing superusers and creates a new one during deployment. You have two options:

## Option 1: Automatic Setup (Recommended for Deployment)
The system automatically creates a superuser with these credentials:
- **Username**: admin
- **Email**: admin@samayee.com
- **Password**: admin123456

### How it works:
1. During deployment, the build script runs `python manage.py setup_superuser --non-interactive`
2. This removes any existing superusers
3. Creates a new superuser with the credentials above
4. You can then login and change the password

## Option 2: Interactive Setup (For Local Development)
If you want to create a superuser interactively:

```bash
# Remove existing superusers and create new one interactively
python manage.py setup_superuser

# Or use the original command
python manage.py createsuperuser_auto
```

## Environment Variables
You can customize the superuser creation by setting these environment variables:

```bash
SUPERUSER_USERNAME=your_username
SUPERUSER_EMAIL=your_email@example.com
SUPERUSER_PASSWORD=your_password
SUPERUSER_FIRST_NAME=Your
SUPERUSER_LAST_NAME=Name
```

## Commands Available

### `python manage.py setup_superuser --non-interactive`
- Removes existing superusers
- Creates new superuser using environment variables
- Used during deployment

### `python manage.py setup_superuser`
- Removes existing superusers
- Prompts for new superuser details interactively
- Used for local development

### `python manage.py createsuperuser_auto`
- Legacy command that does the same as `setup_superuser`

## Security Note
**Always change the default password after first login!**

The default password is set for initial setup only. Change it immediately in the admin panel for security. 