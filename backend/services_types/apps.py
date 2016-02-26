from django.apps import AppConfig


class ServicesTypesConfig(AppConfig):
    name = 'services_types'

    def ready(self):
        super().ready()
        import services_types.signals
