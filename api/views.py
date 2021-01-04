from django.shortcuts import render
import django_filters
from rest_framework import viewsets, filters
from app.models import Product, Sale
from .serializer import ProductSerializer, SaleSerializer


# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
