"""
URL configuration for students app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, FeeStructureViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'fee-structures', FeeStructureViewSet)
router.register(r'payments', PaymentViewSet)

# Add alias for fees
router.register(r'fees', FeeStructureViewSet, basename='fees')

urlpatterns = [
    path('', include(router.urls)),
]
