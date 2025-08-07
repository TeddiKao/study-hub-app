from django.contrib.auth.models import BaseUserManager

class AuthUserManager(BaseUserManager):
    def create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError("Email must be set!")
        
        if not username:
            raise ValueError("Username must be set!")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save()

        return user
