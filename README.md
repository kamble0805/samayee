# 🏫 Samayee - School Management System

[![Django](https://img.shields.io/badge/Django-5.1.4-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A modern, comprehensive school management system designed to streamline student and fee management operations. Built with Django REST API backend and React frontend for optimal performance and user experience.

## ✨ Features

### 🔐 Authentication & Security
- **Secure User Authentication**: JWT token-based authentication system
- **Role-based Access Control**: Different permissions for administrators and staff
- **Password Security**: Encrypted password storage and validation
- **Session Management**: Secure session handling and logout functionality

### 👨‍🎓 Student Management
- **Student Registration**: Complete student profile creation with personal details
- **Student Search**: Advanced search functionality with filters
- **Profile Management**: Edit and update student information
- **Student Records**: Comprehensive student database with academic history

### 💰 Fee Management
- **Payment Tracking**: Real-time payment status monitoring
- **Fee Structure**: Flexible fee configuration and management
- **Payment History**: Detailed payment records and receipts
- **Due Date Management**: Automated due date tracking and reminders
- **Outstanding Balance**: Real-time calculation of pending payments

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern UI/UX**: Clean, intuitive interface design
- **Cross-browser Compatibility**: Works seamlessly across all modern browsers
- **Accessibility**: WCAG compliant design for better accessibility

## 🛠️ Tech Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Django** | 5.1.4 | Web framework |
| **Django REST Framework** | 3.14.0 | API development |
| **PostgreSQL** | Latest | Production database |
| **SQLite** | 3.x | Development database |
| **Gunicorn** | Latest | Production server |
| **WhiteNoise** | Latest | Static file serving |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | Frontend framework |
| **React Router DOM** | 7.6.3 | Client-side routing |
| **Axios** | Latest | HTTP client |
| **Bootstrap** | 5.3.7 | UI framework |
| **CSS3** | Latest | Styling |

## 🚀 Quick Start

### Prerequisites
- **Python** 3.11 or higher
- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/samayee.git
cd samayee
```

#### 2. Backend Setup

**Create Virtual Environment**
```bash
# Windows
python -m venv env
env\Scripts\activate

# macOS/Linux
python3 -m venv env
source env/bin/activate
```

**Install Dependencies**
```bash
pip install -r requirements.txt
```

**Database Setup**
```bash
python manage.py migrate
python manage.py createsuperuser
```

**Start Development Server**
```bash
python manage.py runserver
```

#### 3. Frontend Setup

**Navigate to React App**
```bash
cd react_app
```

**Install Dependencies**
```bash
npm install
```

**Start Development Server**
```bash
npm start
```

### 🎯 Access Points
- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **API Documentation**: http://localhost:8000/api/

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/accounts/register/` | User registration | `username`, `email`, `password` |
| `POST` | `/api/accounts/login/` | User login | `username`, `password` |
| `POST` | `/api/accounts/logout/` | User logout | None |
| `GET` | `/api/accounts/profile/` | Get user profile | None |
| `PUT` | `/api/accounts/profile/` | Update user profile | User data |

### Student Management Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/students/` | List all students | `page`, `page_size` |
| `POST` | `/api/students/` | Create new student | Student data |
| `GET` | `/api/students/{id}/` | Get student details | `id` |
| `PUT` | `/api/students/{id}/` | Update student | `id`, Student data |
| `DELETE` | `/api/students/{id}/` | Delete student | `id` |
| `GET` | `/api/students/search/` | Search students | `q` (query) |

### Payment Management Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/students/{id}/payments/` | Get student payments | `id` |
| `POST` | `/api/students/{id}/payments/` | Add payment | `id`, Payment data |
| `GET` | `/api/students/{id}/payment_summary/` | Get payment summary | `id` |
| `PUT` | `/api/students/{id}/payments/{payment_id}/` | Update payment | `id`, `payment_id` |
| `DELETE` | `/api/students/{id}/payments/{payment_id}/` | Delete payment | `id`, `payment_id` |

## 🌐 Deployment

### Render Deployment

This application is pre-configured for easy deployment on Render.

#### Automatic Deployment
1. **Fork/Clone** the repository to your GitHub account
2. **Connect** to [Render Dashboard](https://dashboard.render.com/)
3. **Create New Blueprint** and select your repository
4. **Apply** the configuration - Render will automatically:
   - Set up PostgreSQL database
   - Configure environment variables
   - Deploy both backend and frontend

#### Environment Variables
The following variables are automatically configured:
- `SECRET_KEY`: Django secret key
- `DATABASE_URL`: PostgreSQL connection string
- `DEBUG`: Set to `false` for production
- `ALLOWED_HOSTS`: Render domain configuration
- `CORS_ALLOWED_ORIGINS`: Frontend URL

### Manual Deployment
For other platforms (Heroku, DigitalOcean, AWS), refer to the deployment guides in the `docs/` directory.

## 📁 Project Structure

```
samayee/
├── 📁 accounts/                    # User authentication app
│   ├── models.py                  # User models
│   ├── views.py                   # Authentication views
│   ├── serializers.py             # User serializers
│   └── urls.py                    # Auth URL patterns
├── 📁 students/                    # Student management app
│   ├── models.py                  # Student and Payment models
│   ├── views.py                   # Student views
│   ├── serializers.py             # Student serializers
│   └── urls.py                    # Student URL patterns
├── 📁 core/                        # Django project settings
│   ├── settings.py                # Project configuration
│   ├── urls.py                    # Main URL patterns
│   └── wsgi.py                    # WSGI configuration
├── 📁 react_app/                   # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable components
│   │   ├── 📁 pages/              # Page components
│   │   ├── 📁 services/           # API services
│   │   ├── 📁 context/            # React context
│   │   └── App.js                 # Main app component
│   ├── package.json               # Frontend dependencies
│   └── public/                    # Static files
├── 📄 requirements.txt            # Python dependencies
├── 📄 render.yaml                 # Render deployment config
├── 📄 build.sh                    # Build script
└── 📄 README.md                   # This file
```

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test students
python manage.py test accounts
```

### Frontend Testing
```bash
cd react_app
npm test
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript/React code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- 📖 **Documentation**: Check the `docs/` directory
- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/samayee/issues)
- 💡 **Feature Requests**: [Create a feature request](https://github.com/yourusername/samayee/issues)
- 💬 **Discussions**: [Join our discussions](https://github.com/yourusername/samayee/discussions)

### Common Issues
- **Database Connection**: Ensure PostgreSQL is running and credentials are correct
- **Port Conflicts**: Check if ports 3000 and 8000 are available
- **Dependencies**: Make sure all requirements are installed correctly

## 🙏 Acknowledgments

- Django community for the excellent web framework
- React team for the powerful frontend library
- Bootstrap team for the responsive UI components
- All contributors who have helped improve this project

---

**Made with ❤️ for better education management** 