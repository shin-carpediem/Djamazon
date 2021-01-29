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
            'app:result',
            'app:signup',
            'app:welcome',
            'app:policy',
            'app:terms',
            'study:index',
        ]

    def location(self, obj):
        return resolve_url(obj)

    def changefreq(self, obj):
        if obj == 'app:index' or 'study:index':
            return 'always'
        return 'never'

    def priority(self, obj):
        if obj == 'app:index':
            return 0.8
        elif obj == 'app:policy':
            return 0.1
        elif obj == 'app:terms':
            return 0.1
        return 0.5


class ProductViewSitemap(Sitemap):
    priority = 0.3
    changefreq = 'always'

    def items(self):
        return Product.objects.all()

    def location(self, obj):
        return resolve_url('app:detail', product_id=obj.id)
