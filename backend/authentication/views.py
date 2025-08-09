from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import get_user_model

from .serializers import UserSerializer

class CreateUserEndpoint(CreateAPIView):
    user_model = get_user_model()

    queryset = user_model.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetCredentialsEndpoint(APIView):
    def post(self, request):
        user = request.data.user

        return Response({
            "username": user.username,
            "email": user.email
        })