from rest_framework.generics import GenericAPIView,RetrieveAPIView,CreateAPIView,ListAPIView,DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework import viewsets

from .serializers import ServiceSerializer,TypeSerializer,OptionSerializer,OptionValueSerializer
from .models import Service,Type,Option,OptionValue;


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_deleted=False).all()
    serializer_class = ServiceSerializer


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.filter(is_deleted=False).all()
    serializer_class = TypeSerializer


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.filter(is_deleted=False).all()
    serializer_class = OptionSerializer


class OptionValueViewSet(viewsets.ModelViewSet):
    queryset = OptionValue.objects.filter(is_deleted=False).all()
    serializer_class = OptionValueSerializer


