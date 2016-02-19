from django.shortcuts import render
from django.http import HttpResponse
from .models import Orders

def index(request):
    order = Orders.objects.get(pk=1)
    return HttpResponse("Hello, world. %s You're at the polls index." % order.title)
