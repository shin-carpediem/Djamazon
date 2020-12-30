from django.contrib.sitemaps import Sitemap
from django.shortcuts import resolve_url
from app.models import Product


class StaticViewSitemap(Sitemap):

    def items(self):
        return [
            'app:index',
            'app:cart',
            'app:login',
            'app:order_history',
            'app:policy',
            'app:result',
            'app:signup',
            'app:terms',
        ]

    def location(self, obj):
        return resolve_url(obj)

    def changefreq(self, obj):
        if obj == 'app:index':
            return 'always'
        return 'never'

    def priority(self, obj):
        if obj == 'app:index':
            return 0.8
        return 0.5


class ProductViewSitemap(Sitemap):
    priority = 0.2
    changefreq = 'always'

    def items(self):
        return Product.objects.all()

    def location(self, obj):
        return resolve_url('app/product/<int:product_id>/')