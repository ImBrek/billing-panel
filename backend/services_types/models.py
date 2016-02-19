from django.db import models


class Type(models.Model):
    """
    Service type e.g. Dedicated Servers, VPS, etc
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
    type = models.ForeignKey(Type, on_delete=models.CASCADE, related_name='services')
    is_deleted = models.BooleanField(default=False)
    cost = models.FloatField(default=0)

    def __str__(self):
        return self.title


class Option(models.Model):
    """
    Required options for service
    """
    title = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='options')

    def __str__(self):
        return self.title


class OptionValue(models.Model):
    """
    Possible values for options
    """
    TYPE_SELECT = 0
    TYPE_INPUT = 1
    TYPES_CHOICES = (
        (TYPE_SELECT, 'select'),
        (TYPE_INPUT, 'input'),
    )

    is_deleted = models.BooleanField(default=False)
    cost = models.FloatField(default=0)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    type = models.IntegerField(choices=TYPES_CHOICES, default=TYPE_INPUT)
    cost = models.FloatField(default=0)
    value = models.CharField(max_length=200)

    def __str__(self):
        return self.value
