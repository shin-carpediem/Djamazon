from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Product(models.Model):
    # """商品"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='product')

    def __str__(self):
        return self.name


class Sale(models.Model):
    # """売上情報"""
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    user = models.ForeignKey('users.User', on_delete=models.PROTECT)
    amount = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField("Product unit price")
    total_price = models.PositiveIntegerField("subtotal")
    created_at = models.DateTimeField(auto_now=True)
