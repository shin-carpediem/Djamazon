from django.urls import path
from . import views

app_name = 'games'
urlpatterns = [
    path('games', views.index, name='index'),
    path('games/counter/', views.counter, name='counter'),
    path('games/omikuji/', views.omikuji, name='omikuji'),
    path('games/bingo/', views.bingo, name='bingo'),
    path('games/typing/', views.typing, name='typing'),
    path('games/quiz/', views.quiz, name='quiz'),
    path('games/slot/', views.slot, name='slot'),
]
