import json

from typing import Optional

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework_simplejwt.tokens import Token

from .models import AuthUser

class BeaconJWTAuthentication(JWTAuthentication):
    def authenticate(self, request: Request) -> Optional[tuple[AuthUser, Token]]:
        auth = super().authenticate(request)

        if auth is not None:
            return auth

        if request.method == "POST":
            try:
                data = json.loads(request.body)
                token = data.get("token")
                if token:
                    validated_token = self.get_validated_token(token)
                    user = self.get_user(validated_token)
                    return (user, validated_token)
            except Exception:
                pass

        return None
