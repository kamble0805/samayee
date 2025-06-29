# School Management System

A comprehensive school management system built with Django REST Framework backend and React frontend, featuring student management, fee tracking, and payment processing.

## 🚀 Features

### Backend (Django)
- **User Authentication**: Custom user model with email-based authentication
- **Student Management**: CRUD operations for student records
- **Fee Structure Management**: Flexible fee structure configuration
- **Payment Tracking**: Payment processing with due dates and status tracking
- **RESTful API**: Complete API endpoints for all operations
- **Token Authentication**: Secure API access with JWT tokens
- **CORS Support**: Cross-origin resource sharing for frontend integration

### Frontend (React)
- **Modern UI**: Clean and responsive design with CSS3
- **Authentication Pages**: Login and registration with form validation
- **Dashboard**: Overview of students, payments, and system statistics
- **Student Management**: Add, edit, view, and delete student records
- **Payment Processing**: Fee payment interface with status tracking
- **Protected Routes**: Secure access to authenticated pages
- **Real-time Updates**: Dynamic data loading and state management

## 🛠️ Technology Stack

### Backend
- **Django 4.2+**: Web framework
- **Django REST Framework**: API development
- **SQLite**: Database (can be configured for PostgreSQL/MySQL)
- **Django CORS Headers**: Cross-origin resource sharing
- **Python 3.8+**: Programming language

### Frontend
- **React 18**: Frontend framework
- **React Router**: Client-side routing
- **CSS3**: Styling and responsive design
- **Fetch API**: HTTP requests
- **Context API**: State management

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager

## 🚀 Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd samayee
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv env
   # On Windows
   env\Scripts\activate
   # On macOS/Linux
   source env/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Django development server**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to React app directory**
   ```bash
   cd react_app
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start React development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/accounts/register/
Content-Type: application/json

{
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "confirm_password": "password123",
    "first_name": "John",
    "last_name": "Doe"
}
```

#### Login User
```
POST /api/accounts/login/
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Logout User
```
POST /api/accounts/logout/
Authorization: Token <your-token>
```

#### Get User Profile
```
GET /api/accounts/profile/
Authorization: Token <your-token>
```

### Student Endpoints

#### Get All Students
```
GET /api/students/
Authorization: Token <your-token>
```

#### Create Student
```
POST /api/students/
Authorization: Token <your-token>
Content-Type: application/json

{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@school.com",
    "phone": "+1234567890",
    "date_of_birth": "2005-01-01",
    "address": "123 Main St",
    "grade": "10",
    "parent_name": "Jane Doe",
    "parent_phone": "+1234567891"
}
```

#### Get Student Details
```
GET /api/students/{id}/
Authorization: Token <your-token>
```

#### Update Student
```
PUT /api/students/{id}/
Authorization: Token <your-token>
Content-Type: application/json

{
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@school.com",
    "phone": "+1234567890",
    "date_of_birth": "2005-01-01",
    "address": "456 Oak St",
    "grade": "11",
    "parent_name": "Jane Smith",
    "parent_phone": "+1234567891"
}
```

#### Delete Student
```
DELETE /api/students/{id}/
Authorization: Token <your-token>
```

### Fee Structure Endpoints

#### Get All Fee Structures
```
GET /api/students/fee-structures/
Authorization: Token <your-token>
```

#### Create Fee Structure
```
POST /api/students/fee-structures/
Authorization: Token <your-token>
Content-Type: application/json

{
    "grade": "10",
    "fee_type": "Tuition",
    "amount": 500.00,
    "frequency": "Monthly"
}
```

### Payment Endpoints

#### Get All Payments
```
GET /api/students/payments/
Authorization: Token <your-token>
```

#### Create Payment
```
POST /api/students/payments/
Authorization: Token <your-token>
Content-Type: application/json

{
    "student": 1,
    "fee_structure": 1,
    "amount_paid": 500.00,
    "payment_date": "2024-01-15",
    "payment_method": "Cash",
    "payment_term": "January 2024",
    "amount_due": 0.00,
    "due_date": "2024-01-31",
    "notes": "Tuition payment for January"
}
```

## 🏗️ Project Structure

```
samayee/
├── accounts/                 # Django app for user authentication
│   ├── models.py            # Custom user model
│   ├── serializers.py       # User serializers
│   ├── views.py             # Authentication views
│   └── urls.py              # Authentication URLs
├── students/                # Django app for student management
│   ├── models.py            # Student, FeeStructure, Payment models
│   ├── serializers.py       # Student serializers
│   ├── views.py             # Student views
│   └── urls.py              # Student URLs
├── core/                    # Django project settings
│   ├── settings.py          # Django settings
│   ├── urls.py              # Main URL configuration
│   └── wsgi.py              # WSGI configuration
├── react_app/               # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context for state management
│   │   ├── services/        # API service functions
│   │   └── App.js           # Main App component
│   ├── public/              # Static files
│   └── package.json         # Node.js dependencies
├── requirements.txt         # Python dependencies
└── manage.py               # Django management script
```

## 🔧 Configuration

### Django Settings

Key settings in `core/settings.py`:

- **Database**: SQLite (default), can be configured for PostgreSQL/MySQL
- **CORS**: Configured for React development server
- **Authentication**: Token-based authentication
- **Static Files**: Configured for production deployment

### Environment Variables

Create a `.env` file in the root directory for sensitive configuration:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## 🧪 Testing

### Backend Testing
```bash
python manage.py test
```

### Frontend Testing
```bash
cd react_app
npm test
```

## 🚀 Deployment

### Backend Deployment

1. **Set DEBUG=False in settings.py**
2. **Configure production database**
3. **Collect static files:**
   ```bash
   python manage.py collectstatic
   ```
4. **Deploy to your preferred hosting service (Heroku, AWS, etc.)**

### Frontend Deployment

1. **Build the production version:**
   ```bash
   cd react_app
   npm run build
   ```
2. **Deploy the `build` folder to your hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔄 Version History

- **v1.0.0**: Initial release with basic CRUD operations
- **v1.1.0**: Added payment tracking and fee structures
- **v1.2.0**: Enhanced UI/UX and form validation
- **v1.3.0**: Added authentication and protected routes

---

**Note**: This is a development version. For production use, ensure proper security measures, database optimization, and comprehensive testing. 