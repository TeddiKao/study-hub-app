from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from .managers import AuthUserManager

class AuthUser(AbstractBaseUser):
    email = models.EmailField(null=False, blank=False, unique=True)
    username = models.CharField(max_length=80, null=False, blank=False, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = AuthUserManager()