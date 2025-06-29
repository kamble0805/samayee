from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.management import call_command

User = get_user_model()

@receiver(post_migrate)
def create_superuser_on_migrate(sender, **kwargs):
    """Create a superuser automatically after migrations if none exists."""
    if sender.name == 'accounts':
        try:
            # Check if any superuser exists
            if not User.objects.filter(is_superuser=True).exists():
                # Create superuser
                admin_user = User.objects.create_superuser(
                    username='admin',
                    email='admin@samayee.com',
                    password='admin123456',
                    first_name='Admin',
                    last_name='User',
                    is_active=True,
                    is_staff=True,
                    is_superuser=True
                )
                print("✅ Superuser created automatically!")
                print("Username: admin")
                print("Password: admin123456")
                print("Please change the password after first login!")
        except Exception as e:
            print(f"❌ Error creating superuser: {e}") 