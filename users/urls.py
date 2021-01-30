from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('owner_prpfile', views.owner_profile, name='owner_profile'),
]
