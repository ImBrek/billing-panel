from rest_framework import serializers, exceptions
from common.serializers import DynamicModelSerializer

from .models import Service, Type, Option, OptionValue


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ('title', 'services')
        depth = 2


class ServiceSerializer(DynamicModelSerializer):
    class Meta:
        model = Service
        fields = ('title', 'options')
        #        extra_fields = ('type', 'options')
        depth = 2


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option


class OptionValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionValue
