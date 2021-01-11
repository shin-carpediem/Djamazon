from rest_framework import serializers
from users.models import User
from app.models import Product, Sale


# Create your models here.
# users
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('initial_point', 'email', 'point',
                  'fav_products', 'is_staff', 'is_active', 'date_joined')


# app
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'price', 'image')


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('product', 'user', 'amount',
                  'price', 'total_price', 'created_at')
