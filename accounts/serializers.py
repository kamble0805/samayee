from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils import timezone
import logging
from .models import CustomUser

logger = logging.getLogger(__name__)

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = [
            'username', 'email', 'password', 'confirm_password',
            'first_name', 'last_name', 'phone_number', 'address'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        
        # Check if email already exists
        if CustomUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        
        # Check if username already exists
        if CustomUser.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        # Create user with is_active=False initially
        user = CustomUser.objects.create_user(
            **validated_data,
            is_active=True  # Keep active but pending approval
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        logger.info(f"Validating login for email: {email}")
        
        if email and password:
            try:
                # Find user by email
                user = CustomUser.objects.get(email=email)
                logger.info(f"Found user: {user.username}, is_approved: {user.is_approved}, is_active: {user.is_active}")
                
                # Authenticate using email as username (since USERNAME_FIELD = 'email')
                authenticated_user = authenticate(username=email, password=password)
                logger.info(f"Authentication result: {authenticated_user}")
                
                if not authenticated_user:
                    logger.error("Authentication failed - invalid credentials")
                    raise serializers.ValidationError('Invalid email or password')
                
                if not authenticated_user.is_approved == 'approved':
                    logger.error(f"User not approved: {authenticated_user.is_approved}")
                    raise serializers.ValidationError('Your account is not approved yet. Please contact admin.')
                
                if not authenticated_user.is_active:
                    logger.error("User account is deactivated")
                    raise serializers.ValidationError('Your account is deactivated. Please contact admin.')
                
                attrs['user'] = authenticated_user
                logger.info("Login validation successful")
            except CustomUser.DoesNotExist:
                logger.error(f"User not found with email: {email}")
                raise serializers.ValidationError('Invalid email or password')
        else:
            logger.error("Missing email or password")
            raise serializers.ValidationError('Must include email and password')
        
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'address', 'is_approved', 'created_at'
        ]
        read_only_fields = ['id', 'is_approved', 'created_at']

class AdminUserSerializer(serializers.ModelSerializer):
    approved_by_name = serializers.CharField(source='approved_by.get_full_name', read_only=True)
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'address', 'is_approved', 'approved_by',
            'approved_by_name', 'approved_at', 'rejection_reason',
            'created_at', 'updated_at', 'is_active'
        ]
        read_only_fields = ['id', 'approved_by_name', 'approved_at', 'created_at', 'updated_at']

class UserApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['is_approved', 'rejection_reason']
    
    def update(self, instance, validated_data):
        if validated_data.get('is_approved') == 'approved':
            instance.approved_by = self.context['request'].user
            instance.approved_at = timezone.now()
            instance.rejection_reason = ''
        elif validated_data.get('is_approved') == 'rejected':
            instance.rejection_reason = validated_data.get('rejection_reason', '')
        
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)
        instance.save()
        return instance 