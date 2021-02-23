from rest_framework import routers
from .views import UserViewSet, UserPointHistoryViewSet, ProductViewSet, SaleViewSet, LikesViewSet


# Create your tests here.
router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'userpointhistory', UserPointHistoryViewSet)
router.register(r'product', ProductViewSet)
router.register(r'sale', SaleViewSet)
router.register(r'likes', LikesViewSet)
