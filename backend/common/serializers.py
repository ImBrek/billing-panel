from rest_framework import serializers
from rest_framework.utils.field_mapping import get_nested_relation_kwargs


class D(serializers.ModelSerializer):
    def build_field(self, field_name, info, model_class, nested_depth):
        """
        Return a two tuple of (cls, kwargs) to build a serializer field with.
        """
        if field_name in info.fields_and_pk:
            model_field = info.fields_and_pk[field_name]
            return self.build_standard_field(field_name, model_field)

        elif field_name in info.relations:
            relation_info = info.relations[field_name]
            if not nested_depth or field_name not in self.Meta.expand:
                return self.build_relational_field(field_name, relation_info)
            else:
                return self.build_nested_field(field_name, relation_info, nested_depth, self.Meta.expand)

        elif hasattr(model_class, field_name):
            return self.build_property_field(field_name, model_class)

        elif field_name == self.url_field_name:
            return self.build_url_field(field_name, model_class)

        return self.build_unknown_field(field_name, model_class)

    def build_nested_field(self, field_name, relation_info, nested_depth, ex=[]):
        """
        Create nested fields for forward and reverse relationships.
        """

        class NestedSerializer(D):
            class Meta:
                model = relation_info.related_model
                depth = nested_depth - 1
                expand = ex[field_name]

        field_class = NestedSerializer
        field_kwargs = get_nested_relation_kwargs(relation_info)

        return field_class, field_kwargs


class DynamicModelSerializer(D):
    def __init__(self, *args, **kwargs):
        super(DynamicModelSerializer, self).__init__(*args, **kwargs)
        expand = self.context['request'].query_params.get('expand')
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

        self.Meta.expand = result
