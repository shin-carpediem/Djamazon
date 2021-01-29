from django.urls import path
from . import views

app_name = 'study'
urlpatterns = [
    path('study', views.index, name='index'),
]
