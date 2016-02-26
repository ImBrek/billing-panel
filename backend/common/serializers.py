from rest_framework import serializers


class DynamicModelSerializer(serializers.ModelSerializer):
    def expand(self, expand, *args, **kwargs):
        for field_name, field in self.fields.items():
            if isinstance(field, serializers.BaseSerializer):
                if expand.get(field_name, None) is None:
                    self.fields.pop(field_name)
                else:
                    if isinstance(field, serializers.ListSerializer):
                        field.child.expand(expand[field_name])
                    else:
                        field.expand(expand[field_name])

    def __init__(self, *args, **kwargs):
        expand = kwargs.pop('expand', None)
        if expand is not None:
            self.expand(expand)
        super(DynamicModelSerializer, self).__init__(*args, **kwargs)
