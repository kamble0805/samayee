from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = [
        'email', 'username', 'first_name', 'last_name', 
        'is_approved', 'is_active', 'created_at'
    ]
    list_filter = [
        'is_approved', 'is_active', 'is_staff', 'is_superuser', 
        'created_at', 'approved_at'
    ]
    search_fields = ['email', 'username', 'first_name', 'last_name', 'phone_number']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
            'fields': ('username', 'first_name', 'last_name', 'phone_number', 'address')
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'
            ),
        }),
        ('Approval Status', {
            'fields': (
                'is_approved', 'approved_by', 'approved_at', 'rejection_reason'
            ),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'approved_at']
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'username', 'password1', 'password2', 
                'first_name', 'last_name', 'phone_number', 'address'
            ),
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('approved_by')
    
    def save_model(self, request, obj, form, change):
        if change and 'is_approved' in form.changed_data:
            if obj.is_approved == 'approved':
                obj.approved_by = request.user
        super().save_model(request, obj, form, change)
