from django.urls import path
from . import views

app_name = 'games'
urlpatterns = [
    path('games', views.index, name='index'),
    path('games/counter/', views.counter, name='counter'),
    path('games/control_counter_point/', views.control_counter_point, name='control_counter_point'),
    path('games/omikuji/', views.omikuji, name='omikuji'),
    path('games/control_omikuji_point/', views.control_omikuji_point, name='control_omikuji_point'),
    path('games/bingo/', views.bingo, name='bingo'),
    path('games/control_bingo_point/', views.control_bingo_point, name='control_bingo_point'),
    path('games/typing/', views.typing, name='typing'),
    path('games/control_typing_point/', views.control_typing_point, name='control_typing_point'),
    path('games/quiz/', views.quiz, name='quiz'),
    path('games/slot/', views.slot, name='slot'),
    path('games/control_slot_point/', views.control_slot_point, name='control_slot_point'),
    path('games/touch/', views.touch, name='touch'),
    path('games/control_touch_point/', views.control_touch_point, name='control_touch_point'),
    path('games/pingpong/', views.pingpong, name='pingpong'),
    path('games/control_pingpong_point/', views.control_pingpong_point, name='control_pingpong_point'),
]
