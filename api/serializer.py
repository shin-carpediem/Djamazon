from rest_framework import serializers
from app.models import Product, Sale


# ecsite
# app
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'price', 'image')


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ('product', 'user', 'amount',
                 'price', 'total_price', 'created_at')
