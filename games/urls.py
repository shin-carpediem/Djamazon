from django.urls import path
from . import views

app_name = 'games'
urlpatterns = [
    path('games', views.index, name='index'),
]
