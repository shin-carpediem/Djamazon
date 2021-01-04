from django.shortcuts import render
from users.models import User
from app.models import Product, Sale
from .serializers import UserSerializer, ProductSerializer, SaleSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
# Create your views here.
# users


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = PageNumberPagination


# app
class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination


class SaleListView(ListAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    pagination_class = PageNumberPagination
