from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from users.models import User
from app.models import Product, Sale, Good
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


class CreateGoodView(View):
    # いいねへの処理を行う
    res = {
        'result': False,
        'message': 'You failed to post good.'
    }

    def addgood(self, request, *args, **kwargs):
        ip_address = get_client_ip(request)
    # すでにIP登録があればコンフリクト
        if Good.objects.filter(ip_address=ip_address):
            res['message'] = 'You have already posted good.'
            return JsonResponse(res, status=409)
        return JsonResponse(res, status=201)


def get_client_ip(request):
    # IPアドレスを取得する
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
