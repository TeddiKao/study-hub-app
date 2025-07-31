from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView as TokenObtainPairEndpoint
from rest_framework_simplejwt.views import TokenRefreshView as TokenRefreshEndpoint

from .views import CreateUserEndpoint

urlpatterns = [
    path("token/get/", TokenObtainPairEndpoint.as_view(), name="get_token_pair"),
    path("token/refresh/", TokenRefreshEndpoint.as_view(), name="refresh_token"),
    path("create-user/", CreateUserEndpoint.as_view(), name="create_user")
]