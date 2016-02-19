from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^success/', views.index, name='index'),
]
