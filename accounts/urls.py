from django.urls import path
from .views import (
    UserRegistrationView, UserLoginView, UserProfileView,
    AdminUserListView, AdminUserDetailView, UserApprovalView,
    pending_users_count, logout
)

urlpatterns = [
    # Public endpoints
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    
    # User endpoints (authenticated)
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('logout/', logout, name='user-logout'),
    
    # Admin endpoints
    path('admin/users/', AdminUserListView.as_view(), name='admin-users'),
    path('admin/users/<int:pk>/', AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('admin/users/<int:user_id>/approve/', UserApprovalView.as_view(), name='user-approval'),
    path('admin/pending-count/', pending_users_count, name='pending-users-count'),
] 