from rest_framework.generics import GenericAPIView,RetrieveAPIView,CreateAPIView,ListAPIView,DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework import viewsets

from .serializers import LoginSerializer,TokenSerializer,UserSerializer
from .utils import create_token
from .models import User


class TokenView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    #
    def login(self):
        self.user = self.serializer.validated_data['user']
        self.token = create_token(self.user)

    def get_response(self):
        return Response(
            TokenSerializer(self.token).data, status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        self.serializer = LoginSerializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.login()
        return self.get_response()

    def delete(self, request, *args, **kwargs):
        pass


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
