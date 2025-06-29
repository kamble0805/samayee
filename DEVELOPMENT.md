# Development Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Migrations
```bash
python manage.py migrate
```

### 3. Create Superuser (Optional)
```bash
python manage.py setup_superuser
```

### 4. Start Development Server
```bash
python manage.py runserver
```

## Development vs Production

### Development Settings
- Uses `core/settings_dev.py`
- DEBUG = True
- SQLite database
- CORS allows all origins
- No HTTPS requirements

### Production Settings
- Uses `core/settings.py`
- DEBUG = False
- PostgreSQL database
- Restricted CORS
- HTTPS required

## Available Commands

### Django Management
```bash
# Check for issues
python manage.py check

# Run migrations
python manage.py migrate

# Create superuser interactively
python manage.py setup_superuser

# Create superuser automatically
python manage.py setup_superuser --non-interactive

# Collect static files
python manage.py collectstatic

# Start development server
python manage.py runserver
```

### React Development
```bash
cd react_app
npm install
npm start
```

## Environment Variables

For local development, you can create a `.env` file in the root directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOW_ALL_ORIGINS=True
```

## Database

### Development
- Uses SQLite (`db.sqlite3`)
- No additional setup required

### Production
- Uses PostgreSQL
- Configured via `DATABASE_URL` environment variable

## API Endpoints

### Development
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- Admin: http://localhost:8000/admin/

### Production
- Backend: https://samayee.onrender.com
- Frontend: https://samayee.onrender.com
- Admin: https://samayee.onrender.com/admin/

## Troubleshooting

### ModuleNotFoundError: No module named 'decouple'
```bash
pip install python-decouple
```

### Database Issues
```bash
python manage.py migrate
```

### Static Files Issues
```bash
python manage.py collectstatic
```

### CORS Issues
Make sure `CORS_ALLOW_ALL_ORIGINS = True` in development settings. 