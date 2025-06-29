# Django Backend API Endpoints

## Authentication Endpoints
Base URL: `http://localhost:8000/auth/`

### Public Endpoints
- `POST /auth/register/` - User registration
- `POST /auth/login/` - User login

### Authenticated Endpoints
- `GET /auth/profile/` - Get user profile
- `PUT /auth/profile/` - Update user profile
- `POST /auth/logout/` - User logout

### Admin Endpoints
- `GET /auth/admin/users/` - List all users (admin only)
- `GET /auth/admin/users/<id>/` - Get specific user details (admin only)
- `POST /auth/admin/users/<id>/approve/` - Approve/reject user (admin only)
- `GET /auth/admin/pending-count/` - Get count of pending users (admin only)

## Students API Endpoints
Base URL: `http://localhost:8000/api/`

### Students
- `GET /api/students/` - List all students
- `POST /api/students/` - Create new student
- `GET /api/students/<id>/` - Get specific student
- `PUT /api/students/<id>/` - Update student
- `DELETE /api/students/<id>/` - Delete student
- `GET /api/students/<id>/payments/` - Get all payments for a student
- `GET /api/students/<id>/payment_summary/` - Get payment summary for a student

### Fee Structures
- `GET /api/fee-structures/` - List all fee structures
- `POST /api/fee-structures/` - Create new fee structure
- `GET /api/fee-structures/<id>/` - Get specific fee structure
- `PUT /api/fee-structures/<id>/` - Update fee structure
- `DELETE /api/fee-structures/<id>/` - Delete fee structure
- `GET /api/fee-structures/by_grade_board/?grade=X&board=Y` - Get fee structure by grade and board

### Payments
- `GET /api/payments/` - List all payments
- `POST /api/payments/` - Create new payment
- `GET /api/payments/<id>/` - Get specific payment
- `PUT /api/payments/<id>/` - Update payment
- `DELETE /api/payments/<id>/` - Delete payment
- `GET /api/payments/summary/` - Get payment summary statistics

## Authentication
All API endpoints (except login/register) require authentication using Token Authentication.

Include the token in the Authorization header:
```
Authorization: Token <your_token_here>
```

## Example Usage

### Login
```bash
curl -X POST http://localhost:8000/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Get Students (with authentication)
```bash
curl -X GET http://localhost:8000/api/students/ \
  -H "Authorization: Token <your_token_here>"
```

### Create Student
```bash
curl -X POST http://localhost:8000/api/students/ \
  -H "Authorization: Token <your_token_here>" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "grade": "5",
    "board": "CBSE",
    "parent_name": "Jane Doe",
    "parent_contact_primary": "1234567890"
  }'
```

### Create Payment
```bash
curl -X POST http://localhost:8000/api/payments/ \
  -H "Authorization: Token <your_token_here>" \
  -H "Content-Type: application/json" \
  -d '{
    "student": 1,
    "payment_mode": "Cash",
    "amount_paid": "5000.00"
  }'
``` 