from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Option, OptionValue


@receiver(post_save, sender=Option)
def create_value_for_input_option(sender, instance, created, **kwargs):
    if created and instance.type == Option.TYPE_INPUT:
        model = OptionValue(option=instance)
        model.save()
