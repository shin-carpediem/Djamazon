from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from . import views
# from . import router


# Create your tests here.
app_name = 'api'

# router = routers.DefaultRouter()
# router.register(r'user', UserListView)
# router.register(r'product', ProductListView)
# router.register(r'sale', SaleListView)

urlpatterns = [
    path('good/', views.CreateGoodView.as_view(), name='create_good')
    # url(r'^api/', include(router.urls)),
    # url(r'^api/', include('rest_framework.urls', namespace='rest_framework'))
]
