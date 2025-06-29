"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

def health_check(request):
    return JsonResponse({"status": "healthy", "message": "API is working!"})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def test_auth(request):
    """Test endpoint to verify authentication"""
    if request.method == 'GET':
        return JsonResponse({
            "message": "Authentication working!",
            "user": request.user.username,
            "authenticated": request.user.is_authenticated
        })
    elif request.method == 'POST':
        return JsonResponse({
            "message": "POST request working!",
            "data": request.data,
            "user": request.user.username
        })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health-check'),
    path('api/test-auth/', test_auth, name='test-auth'),
    path('api/accounts/', include('accounts.urls')),
    path('api/students/', include('students.urls')),
]

# Serve React frontend for all non-API routes
if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^(?!api/).*$', TemplateView.as_view(template_name='index.html'), name='home'),
    ]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
