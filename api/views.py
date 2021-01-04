from django.shortcuts import render
from users.models import User
from app.models import Product, Sale
from .serializers import UserSerializer, ProductSerializer, SaleSerializer
from rest_framework.generics import ListAPIView
# Create your views here.
# users


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# app
class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SaleListView(ListAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
