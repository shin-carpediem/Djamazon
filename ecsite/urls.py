from django import urls
import debug_toolbar
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from .sitemaps import StaticViewSitemap, ProductViewSitemap
from api.urls import router as api_router


sitemaps = {
    'app': StaticViewSitemap,
    'product': ProductViewSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/password_reset/', auth_views.PasswordResetView.as_view(), name='admin_password_reset'),
    path('admin/password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('oauth/', include('social_django.urls', namespace='social')),
    path('', include('users.urls')),
    path('', include('study.urls')),
    path('', include('games.urls')),
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
