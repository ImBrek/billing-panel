from django.db import models;
from django.contrib.auth.models import User as CommonUser;


class User(CommonUser):
    test_field = models.CharField(max_length=10)
    pass
