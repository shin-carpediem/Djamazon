from django.contrib.sitemaps import Sitemap
from django.shortcuts import resolve_url
from app.models import Product


class StaticViewSitemap(Sitemap):

    def items(self):
        return [
            'app:top',
            'app:top_filtered',
            'app:cart',
            'app:login',
            'app:order_history',
            'app:result',
            'app:signup',
            'app:welcome',
            'app:policy',
            'app:terms',
            'study:index',
            'games:index',
            'games:counter',
            'games:omikuji',
            'games:bingo',
            'games:typing',
            'games:quiz',
            'games:slot',
            'games:touch',
            'games:pingpong',
            'games:dungeon',
        ]

    def location(self, obj):
        return resolve_url(obj)

    def changefreq(self, obj):
        if obj == 'app:top':
            return 'always'
        elif obj == 'study:index':
            return 'always'
        elif obj == 'games:index':
            return 'always'
        return 'never'

    def priority(self, obj):
        if obj == 'app:top':
            return 0.8
        elif obj == 'study:index':
            return 0.6
        elif obj == 'games:index':
            return 0.6
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
