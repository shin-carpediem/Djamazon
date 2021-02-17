from rest_framework import routers
# from django.urls import path
# from django.conf.urls import url, include
from .views import UserViewSet, UserPointHistoryViewSet, ProductViewSet, SaleViewSet
# from . import router


# Create your tests here.
# app_name = 'api'

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'userpointhistory', UserPointHistoryViewSet)
router.register(r'product', ProductViewSet)
router.register(r'sale', SaleViewSet)

# urlpatterns = [
#     # path('good/', views.CreateGoodView.as_view(), name='create_good')
#     # url(r'^api/', include(router.urls)),
#     # url(r'^api/', include('rest_framework.urls', namespace='rest_framework'))
# ]
