from django.conf.urls import url, include
from rest_framework import routers
from .views import UserListView, ProductListView, SaleListView
from . import router


# Create your tests here.
app_name = 'api'

router = routers.DefaultRouter()
router.register(r'user', UserListView)
router.register(r'product', ProductListView)
router.register(r'sale', SaleListView)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/', include('rest_framework.urls', namespace='rest_framework'))
]
