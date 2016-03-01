from rest_framework import serializers
from collections import OrderedDict
from rest_framework.fields import SkipField
from rest_framework.exceptions import APIException,ValidationError

class DynamicModelSerializer(serializers.ModelSerializer):

    def __repr__(self):
        return 'TODO: create repr'

    def expand(self, expand, *args, **kwargs):
        if expand is None:
            return
        self.expand = expand
        for field_name, field in self.fields.items():
            if isinstance(field, serializers.BaseSerializer):
                if expand.get(field_name, None) is None:
                    pass
                else:
                    if isinstance(field, serializers.ListSerializer):
                        field.child.expand(expand[field_name])
                    else:
                        field.expand(expand[field_name])

    def to_representation(self, instance, **kwargs):
        """
        Object instance -> Dict of primitive datatypes.
        """
        ret = OrderedDict()
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            if isinstance(field, serializers.BaseSerializer):
                if isinstance(field, DynamicModelSerializer) and self.expand is not None:
                    if self.expand.get(field.field_name, None) is None:
                        continue
                elif isinstance(field, serializers.ListSerializer) and isinstance(field.child, DynamicModelSerializer) and self.expand is not None:
                    if self.expand.get(field.field_name, None) is None:
                        continue
                else:
                    continue

            if attribute is None:
                ret[field.field_name] = None
            else:
                ret[field.field_name] = field.to_representation(attribute)

        return ret

    def update(self, instance, validated_data):
        validated_data.pop('id',None)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data.pop('id',None)
        return super().create(validated_data)

    def __init__(self, *args, **kwargs):
        self.expand(kwargs.pop('expand', None))
        super(DynamicModelSerializer, self).__init__(*args, **kwargs)
