from django.contrib.auth.models import UserManager
import django_filters
from rest_framework import viewsets, filters
from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from users.models import User, UserPointHistory
from app.models import Product, Sale
from .serializer import UserSerializer, UserPointHistorySerializer, ProductSerializer, SaleSerializer


# Create your views here.
# users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserPointHistoryViewSet(viewsets.ModelViewSet):
    queryset = UserPointHistory.objects.all()
    serializer_class = UserPointHistorySerializer


# # app
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
