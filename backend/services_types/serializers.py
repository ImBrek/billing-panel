from rest_framework import serializers, exceptions
from common.serializers import DynamicModelSerializer

from .models import Service, Category, Option, OptionValue


class OptionValueSerializer(DynamicModelSerializer):
    class Meta:
        model = OptionValue


class OptionSerializer(DynamicModelSerializer):
    values = OptionValueSerializer(many=True)

    class Meta:
        model = Option


class ServiceSerializer(DynamicModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Service


class CategorySerializer(DynamicModelSerializer):
    services = ServiceSerializer(many=True)

    class Meta:
        model = Category





ServiceSerializer._declared_fields['type'] = CategorySerializer()
