from django.contrib import admin
from .models import Type, Option, Service, OptionValue

admin.site.register(Type)
admin.site.register(Service)
admin.site.register(Option)
admin.site.register(OptionValue)
