#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Navigate to React app directory and install dependencies
cd react_app
npm install

# Build the React app
npm run build

# Go back to root directory
cd ..

# Collect static files
python manage.py collectstatic --noinput

# Run database migrations
python manage.py migrate 