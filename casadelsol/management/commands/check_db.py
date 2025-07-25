from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import connection

class Command(BaseCommand):
    help = 'Check database connection and user status'

    def handle(self, *args, **options):
        try:
            # Check database connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                self.stdout.write(self.style.SUCCESS('Database connection successful'))
            
            # Check if users exist
            user_count = User.objects.count()
            self.stdout.write(f'Total users in database: {user_count}')
            
            # List superusers
            superusers = User.objects.filter(is_superuser=True)
            if superusers.exists():
                self.stdout.write('Superusers found:')
                for user in superusers:
                    self.stdout.write(f'  - {user.username} (active: {user.is_active})')
            else:
                self.stdout.write(self.style.WARNING('No superusers found'))
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Database error: {e}')) 