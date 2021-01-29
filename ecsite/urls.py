"""ecsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import debug_toolbar
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
# from django.views.generic import TemplateView
from .sitemaps import StaticViewSitemap, ProductViewSitemap
from api.urls import router as api_router


sitemaps = {
    'app': StaticViewSitemap,
    'product': ProductViewSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('oauth/', include('social_django.urls', namespace='social')),
    path('', include('study.urls')),    # different app: Djamazon Study
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
    path('__debug__/', include(debug_toolbar.urls)),
    url(r'^api/', include(api_router.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += i18n_patterns(
    path('', include('app.urls', 'allauth.urls')),
    path('i18n/', include('django.conf.urls.i18n')),
    prefix_default_language=False
)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
