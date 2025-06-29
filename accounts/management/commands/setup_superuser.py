from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth import get_user_model
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Remove existing superusers and create a new one with environment variables or interactively'

    def add_arguments(self, parser):
        parser.add_argument(
            '--non-interactive',
            action='store_true',
            help='Use environment variables for superuser creation',
        )

    def handle(self, *args, **options):
        try:
            # Check if superusers exist
            existing_superusers = User.objects.filter(is_superuser=True)
            
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
            
            # Create new superuser
            if options['non_interactive']:
                # Use environment variables for non-interactive creation
                username = os.getenv('SUPERUSER_USERNAME', 'admin')
                email = os.getenv('SUPERUSER_EMAIL', 'admin@samayee.com')
                password = os.getenv('SUPERUSER_PASSWORD', 'admin123456')
                first_name = os.getenv('SUPERUSER_FIRST_NAME', 'Admin')
                last_name = os.getenv('SUPERUSER_LAST_NAME', 'User')
                
                # Create superuser non-interactively
                user = User.objects.create_superuser(
                    username=username,
                    email=email,
                    password=password,
                    first_name=first_name,
                    last_name=last_name,
                    is_active=True,
                    is_staff=True,
                    is_superuser=True
                )
                
                self.stdout.write(
                    self.style.SUCCESS(f'Superuser created successfully!')
                )
                self.stdout.write(f'Username: {username}')
                self.stdout.write(f'Email: {email}')
                self.stdout.write(f'Password: {password}')
                self.stdout.write(
                    self.style.WARNING('Please change the password after first login!')
                )
                
            else:
                # Interactive creation
                self.stdout.write(
                    self.style.SUCCESS('Now creating a new superuser interactively...')
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