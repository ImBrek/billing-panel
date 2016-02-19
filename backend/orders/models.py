from django.db import models

from rest_framework import status


class Orders(models.Model):
    title = models.CharField(max_length=200)
