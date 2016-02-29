from common.serializers import DynamicModelSerializer
from .models import OptionValue, Option
from rest_framework import serializers
from rest_framework.fields import IntegerField

from .models import Service, Category, Option, OptionValue


class OptionValueSerializer(DynamicModelSerializer):
    id = IntegerField(required=False)
    class Meta:
        model = OptionValue
        # fields = ('id', 'value', 'cost')


class OptionSerializer(DynamicModelSerializer):
    values = OptionValueSerializer(many=True, required=False)
    # id = IntegerField(required=False)

    def create(self, validated_data):
        values = validated_data.pop('values', None)
        option = Option.objects.create(**validated_data)
        if values is not None:
            for val in values:
                OptionValue.objects.create(option=option, **val)

        return option

    def update(self, instance, validated_data):
        values = validated_data.pop('values',None)
        if values is not None:
            for opt in values:
                try:
                    value_inst = OptionValue.objects.get(pk=opt['id'], option=instance)
                except OptionValue.DoesNotExist:
                    continue
                # for attr, value_inst in opt.items():
                #     setattr(value_inst, attr, value_inst)
                value_inst.save()
        return super().update(instance, validated_data)

    class Meta:
        model = Option


class ServiceSerializer(DynamicModelSerializer):
    options = OptionSerializer(many=True)

    def update(self, instance, validated_data):
        options = validated_data.pop('options',None)
        if options is not None:
            for opt in options:
                try:
                    option_instance = Option.objects.get(pk=opt['id'], service=instance)
                except Option.DoesNotExist:
                    continue
                for attr, value in opt.items():
                    setattr(option_instance, attr, value)
                option_instance.save()
        return super().update(instance, validated_data)


    class Meta:
        model = Service


class CategorySerializer(DynamicModelSerializer):
    services = ServiceSerializer(many=True)

    class Meta:
        model = Category


ServiceSerializer._declared_fields['category'] = CategorySerializer()

OptionValueSerializer._declared_fields['option'] = OptionSerializer(required=False)
