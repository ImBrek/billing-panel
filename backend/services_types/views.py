from rest_framework import viewsets

from .serializers import ServiceSerializer, CategorySerializer, OptionSerializer, OptionValueSerializer
from .models import Service, Category, Option, OptionValue
from rest_framework import status
from rest_framework.response import Response


class CustomViewSet(viewsets.ModelViewSet):
    def get_query_params(self):
        expand = self.request.query_params.get('expand')
        if expand:
            expand = expand.split(',')
        else:
            expand = []
        result = {}
        for field in expand:
            field = field.split('.')
            current = result
            for part in field:
                current[part] = current.get(part, {})
                current = current[part]
        return result

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        kwargs['expand'] = self.get_query_params() or {}
        serializer_class = self.get_serializer_class()

        return serializer_class(*args, **kwargs)


class ServiceViewSet(CustomViewSet):
    queryset = Service.objects.filter(is_deleted=False).all()
    serializer_class = ServiceSerializer


class CategoryViewSet(CustomViewSet):
    queryset = Category.objects.filter(is_deleted=False).all()
    serializer_class = CategorySerializer


class OptionViewSet(CustomViewSet):
    queryset = Option.objects.filter(is_deleted=False).all()
    serializer_class = OptionSerializer


class OptionValueViewSet(CustomViewSet):
    queryset = OptionValue.objects.filter(is_deleted=False).all()
    serializer_class = OptionValueSerializer

