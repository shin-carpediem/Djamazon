from django.db import models
from django.contrib.auth import get_user_model


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='product')
    like = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name + '__' + str(self.price)


class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField("Product unit price")
    total_price = models.PositiveIntegerField("subtotal")
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.created_at)
