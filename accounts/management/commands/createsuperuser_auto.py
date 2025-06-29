from django.core.management.base import BaseCommand
from accounts.models import CustomUser

class Command(BaseCommand):
    help = 'Automatically create a superuser for deployment'

    def handle(self, *args, **options):
        try:
            # Check if superuser already exists
            if CustomUser.objects.filter(is_superuser=True).exists():
                self.stdout.write(
                    self.style.WARNING('Superuser already exists. Skipping creation.')
                )
                return
            
            # Create superuser
            admin_user = CustomUser.objects.create_superuser(
                username='admin',
                email='admin@samayee.com',
                password='admin123456',
                first_name='Admin',
                last_name='User',
                is_active=True,
                is_staff=True,
                is_superuser=True
            )
            
            self.stdout.write(
                self.style.SUCCESS('Superuser created successfully!')
            )
            self.stdout.write('Username: admin')
            self.stdout.write('Email: admin@samayee.com')
            self.stdout.write('Password: admin123456')
            self.stdout.write(
                self.style.WARNING('Please change the password after first login!')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating superuser: {e}')
            ) 