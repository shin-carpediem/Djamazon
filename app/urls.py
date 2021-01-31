from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


app_name = 'app'
urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    #     path('go_to_your_mail/', views.go_to_your_mail, name='go_to_your_mail'),
    #     path('authsignup/', views.authsignup, name='authsignup'),
    path('welcome/', views.welcome, name='welcome'),
    path('login/', auth_views.LoginView.as_view(template_name='app/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password_reset', views.password_reset, name='password_reset'),
    path('product/<int:product_id>/', views.detail, name='detail'),
    path('fav_products/', views.fav_products, name='fav_products'),
    path('toggle_fav_product_status/', views.toggle_fav_product_status,
         name='toggle_fav_product_status'),
    path('like/', views.like, name='like'),
    path('cart/', views.cart, name='cart'),
    path('change_item_amount/', views.change_item_amount,
         name='change_item_amount'),
    path('order_history/', views.order_history, name='order_history'),
    path('search/', views.SearchResultView.as_view(), name='result'),
    path('account', views.account, name='account'),
    path('owner_profile/', views.owner_profile, name='owner_profile'),
    path('policy/', views.policy, name='policy'),
    path('terms/', views.terms, name='terms'),
]
