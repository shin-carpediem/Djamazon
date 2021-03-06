from rest_framework import serializers
from users.models import User, UserPointHistory
from app.models import Product, Sale


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('initial_point', 'email', 'point',
                  'fav_products', 'is_staff', 'is_active', 'date_joined', 'is_img')


class UserPointHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPointHistory
        fields = ('point_history', 'user', 'created_at')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'price', 'image', 'like')


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('product', 'user', 'amount',
                  'price', 'total_price', 'created_at')
