# Samayee - School Management System

A comprehensive school management system built with Django REST API backend and React frontend for efficient student and fee management.

## Features

- **User Authentication**: Secure login/register system with token-based authentication
- **Student Management**: Add, edit, delete, and search students
- **Fee Management**: Track student payments, fee structures, and payment history
- **Payment Tracking**: Monitor payment status, due dates, and outstanding amounts
- **Responsive UI**: Modern, mobile-friendly interface built with React and Bootstrap

## Tech Stack

### Backend
- Django 5.1.4
- Django REST Framework 3.14.0
- PostgreSQL (production) / SQLite (development)
- Gunicorn (production server)
- WhiteNoise (static file serving)

### Frontend
- React 19.1.0
- React Router DOM 7.6.3
- Axios for API communication
- Bootstrap 5.3.7 for styling

## Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup
1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the React app directory:
   ```bash
   cd react_app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin

## Deployment on Render

This application is configured for easy deployment on Render. Follow these steps:

### 1. Prepare Your Repository
- Ensure all files are committed to your Git repository
- The `render.yaml` file is already configured for deployment

### 2. Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. Click "Apply" to deploy

### 3. Environment Variables
The following environment variables are automatically configured by Render:
- `SECRET_KEY`: Automatically generated
- `DATABASE_URL`: Automatically linked to PostgreSQL database
- `DEBUG`: Set to `false` for production
- `ALLOWED_HOSTS`: Configured for Render domains
- `CORS_ALLOWED_ORIGINS`: Set to your Render app URL

### 4. Manual Environment Variables (if needed)
If you need to set additional environment variables:
1. Go to your service in Render Dashboard
2. Navigate to "Environment" tab
3. Add any additional variables like:
   - `REACT_APP_API_URL`: Your Render app URL

## API Endpoints

### Authentication
- `POST /api/accounts/register/` - User registration
- `POST /api/accounts/login/` - User login
- `POST /api/accounts/logout/` - User logout
- `GET /api/accounts/profile/` - Get user profile
- `PUT /api/accounts/profile/` - Update user profile

### Students
- `GET /api/students/` - List all students
- `POST /api/students/` - Add new student
- `GET /api/students/{id}/` - Get student details
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student
- `GET /api/students/search/?q={query}` - Search students

### Payments
- `GET /api/students/{id}/payments/` - Get student payments
- `GET /api/students/{id}/payment_summary/` - Get payment summary
- `POST /api/students/{id}/payments/` - Add payment
- `PUT /api/students/{id}/payments/{payment_id}/` - Update payment
- `DELETE /api/students/{id}/payments/{payment_id}/` - Delete payment

## Project Structure

```
samayee/
├── accounts/                 # User authentication app
├── students/                 # Student and payment management app
├── core/                     # Django project settings
├── react_app/               # React frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── context/        # React context providers
│   └── public/             # Static files
├── build.sh                # Build script for deployment
├── render.yaml             # Render deployment configuration
├── requirements.txt        # Python dependencies
└── env.example            # Environment variables template
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository. 