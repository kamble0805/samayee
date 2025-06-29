from django.core.management.base import BaseCommand
from django.core.management import call_command
from accounts.models import CustomUser

class Command(BaseCommand):
    help = 'Remove existing superusers and create a new one interactively'

    def handle(self, *args, **options):
        try:
            # Check if superusers exist
            existing_superusers = CustomUser.objects.filter(is_superuser=True)
            
            if existing_superusers.exists():
                self.stdout.write(
                    self.style.WARNING(f'Found {existing_superusers.count()} existing superuser(s). Removing them...')
                )
                
                # Remove all existing superusers
                for user in existing_superusers:
                    self.stdout.write(f'Removing superuser: {user.username} ({user.email})')
                    user.delete()
                
                self.stdout.write(
                    self.style.SUCCESS('All existing superusers have been removed.')
                )
            else:
                self.stdout.write('No existing superusers found.')
            
            # Prompt for new superuser creation
            self.stdout.write(
                self.style.SUCCESS('Now creating a new superuser...')
            )
            
            # Call Django's built-in createsuperuser command interactively
            call_command('createsuperuser', interactive=True)
            
            self.stdout.write(
                self.style.SUCCESS('Superuser creation completed!')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error during superuser management: {e}')
            ) 