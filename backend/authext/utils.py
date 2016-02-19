from rest_framework.authtoken.models import Token


def create_token(user):
    token, _ = Token.objects.get_or_create(user=user)
    return token

