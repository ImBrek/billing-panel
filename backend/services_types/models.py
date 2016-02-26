from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Category(models.Model):
    """
    Category type e.g. Dedicated Servers, VPS, etc
    """
    title = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Service(models.Model):
    """
    Service
    """
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    is_deleted = models.BooleanField(default=False)
    cost = models.FloatField(default=0)

    def __str__(self):
        return self.title


class Option(models.Model):
    """
    Required options for service
    """

    TYPE_SELECT = 0
    TYPE_INPUT = 1
    TYPES_CHOICES = (
        (TYPE_SELECT, 'select'),
        (TYPE_INPUT, 'input'),
    )

    title = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='options')
    type = models.IntegerField(choices=TYPES_CHOICES, default=TYPE_INPUT)

    def __str__(self):
        return self.title


class OptionValue(models.Model):
    """
    Possible values for options
    """

    is_deleted = models.BooleanField(default=False)
    cost = models.FloatField(default=0)
    option = models.ForeignKey(Option, on_delete=models.CASCADE, related_name='values')
    cost = models.FloatField(default=0)
    value = models.CharField(max_length=200)

    def __str__(self):
        return self.value
