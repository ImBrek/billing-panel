from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers, exceptions
from rest_framework.authtoken.models import Token

from .models import User


class LoginSerializer(serializers.Serializer):
    """
    Serialize login
    """
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = None

        if not (username and password):
            msg = _('Must include either "username" and "password".')
            raise exceptions.ValidationError(msg)

        user = authenticate(username=username, password=password)

        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """

    class Meta:
        model = Token
        fields = ('key','user','created')


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for extended user model
    """

    class Meta:
        model = User
