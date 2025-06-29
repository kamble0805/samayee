# Development Setup Guide

## Quick Start (Recommended)

### 1. Start Django Backend
```bash
# Terminal 1 - Start Django server
python manage.py runserver
```
This will start the Django API at `http://localhost:8000`

### 2. Start React Frontend
```bash
# Terminal 2 - Start React development server
cd react_app
npm start
```
This will start React at `http://localhost:3000`

## Why This Setup?

- **No CORS Issues**: Both frontend and backend run locally
- **Faster Development**: No network latency
- **Better Debugging**: Direct access to both servers
- **Hot Reload**: Changes reflect immediately

## Alternative: Using Production API

If you want to use the production API during development:

### 1. Set Environment Variable
Create a `.env` file in the `react_app` directory:
```env
REACT_APP_API_URL=https://samayee.onrender.com
```

### 2. Start Only React
```bash
cd react_app
npm start
```

**Note**: This will use the production API and may have CORS issues if not properly configured.

## Development URLs

### Local Development
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin/

### Production
- **Frontend**: https://samayee.onrender.com
- **Backend API**: https://samayee.onrender.com
- **Admin Panel**: https://samayee.onrender.com/admin/

## Troubleshooting

### CORS Errors
If you see CORS errors:
1. Make sure Django server is running on `localhost:8000`
2. Make sure React is running on `localhost:3000`
3. Check that both servers are accessible

### API Connection Issues
1. Check if Django server is running
2. Verify the API URL in browser console
3. Check Django server logs for errors

### Database Issues
```bash
python manage.py migrate
python manage.py setup_superuser
```

## Environment Variables

### For Local Development
```env
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOW_ALL_ORIGINS=True
```

### For Production
```env
DEBUG=False
DATABASE_URL=postgresql://...
CORS_ALLOWED_ORIGINS=https://samayee.onrender.com
``` 