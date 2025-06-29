from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_migrate)
def check_superuser_after_migrate(sender, **kwargs):
    """Check if superuser exists after migrations and log status."""
    if sender.name == 'accounts':
        try:
            superuser_count = User.objects.filter(is_superuser=True).count()
            if superuser_count == 0:
                print("ℹ️  No superuser found. Run 'python manage.py createsuperuser_auto' to create one interactively.")
            else:
                print(f"ℹ️  Found {superuser_count} superuser(s) in the system.")
        except Exception as e:
            print(f"❌ Error checking superusers: {e}") 