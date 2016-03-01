from common.serializers import DynamicModelSerializer
from .models import OptionValue, Option
from rest_framework import serializers
from rest_framework.fields import IntegerField, BooleanField

from .models import Service, Category, Option, OptionValue


class OptionValueSerializer(DynamicModelSerializer):
    id = IntegerField(required=False)
    _deleted = BooleanField(write_only=True, required=True)

    class Meta:
        model = OptionValue


class OptionSerializer(DynamicModelSerializer):
    values = OptionValueSerializer(many=True, required=False)

    def create(self, validated_data):
        values = validated_data.pop('values', None)
        option = Option.objects.create(**validated_data)
        if values is not None:
            for val in values:
                OptionValue.objects.create(option=option, **val)

        return option

    def update(self, instance, validated_data):
        values = validated_data.pop('values', None)
        if values is not None:
            for opt in values:
                try:
                    value_inst = OptionValue.objects.get(pk=opt['id'], option=instance)
                except OptionValue.DoesNotExist:
                    continue

                if opt.get('_deleted') is True:
                    value_inst.delete()
                    continue

                for attr, value in opt.items():
                    setattr(value_inst, attr, value)
                value_inst.save()

        return super().update(instance, validated_data)

    class Meta:
        model = Option


class ServiceSerializer(DynamicModelSerializer):
    # options = OptionSerializer(many=True,required=False)

    class Meta:
        model = Service
        fields = ('category', 'id', 'title', 'cost', 'options')
        depth = 2


class CategorySerializer(DynamicModelSerializer):
    services = ServiceSerializer(many=True)

    class Meta:
        model = Category


# ServiceSerializer._declared_fields['category'] = CategorySerializer()
OptionValueSerializer._declared_fields['option'] = OptionSerializer(required=False)
