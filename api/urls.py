from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from . import views
from .urls import router as app_router

app_name = 'api'
urlpatterns = [
    url(r'^api/', include(app_router.urls)),
]
