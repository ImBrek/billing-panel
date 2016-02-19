from django.conf.urls import url,include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'services', views.ServiceViewSet)
router.register(r'types', views.TypeViewSet)
router.register(r'options', views.OptionViewSet)
router.register(r'option-values', views.OptionValueViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
