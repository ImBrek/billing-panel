from django.contrib import admin
from .models import Category, Option, Service, OptionValue

admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Option)
admin.site.register(OptionValue)
