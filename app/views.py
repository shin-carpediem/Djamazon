from typing import overload
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import send_mail
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.template.loader import get_template
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.utils.translation import gettext as _
from django.views.decorators.http import require_POST
from django.views.generic import ListView
from django.db.models import Q
from functools import reduce
from operator import and_
from email.mime.text import MIMEText
import os
import smtplib
import json
import requests
from users.models import User, UserPointHistory
from .forms import CustomUserCreationForm, AddToCartForm, PurchaseForm
from .models import Product, Sale
from ecsite.settings import DEBUG


# Create your views here.
class CacheRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'django_cache':
            return 'cache_replica'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'django_cache':
            return 'cache_primary'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'django_cache':
            return db == 'cache_primary'
        return None


def paginate_queryset(request, queryset, count):
    paginator = Paginator(queryset, count)
    page = request.GET.get('page')
    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return page_obj


def login(request):
    return render(request, 'app/login.html')


@login_required
def top(request):
    products = Product.objects.all().order_by('-id')
    page_obj = paginate_queryset(request, products, 16)
    ctx = {
        'products': page_obj.object_list,
        'page_obj': page_obj,
    }
    return render(request, 'app/top.html', ctx)


@login_required
def top_filtered(request):
    filter = request.POST.getlist('filter')
    if filter == [u'2000']:
        products_filtered = Product.objects.filter(
            price__gte=2000).order_by('price')
    elif filter == [u'1999']:
        products_filtered = Product.objects.filter(
            price__range=(1000, 1999)).order_by('price')
    elif filter == [u'999']:
        products_filtered = Product.objects.filter(
            price__range=(500, 999)).order_by('price')
    elif filter == [u'499']:
        products_filtered = Product.objects.filter(
            price__lte=499).order_by('price')
    else:
        return render(request, 'app/top.html')
    return render(request, 'app/top_filtered.html', {'products_filtered': products_filtered})


def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            input_email = form.cleaned_data['email']
            input_password = form.cleaned_data['password1']
            new_user = authenticate(email=input_email, password=input_password)
            if new_user is not None:
                login(request, new_user)
            EMAIL = settings.DEFAULT_FROM_EMAIL
            PASSWORD = os.getenv("GMAIL_HOST_PASSWORD")
            TO = form.cleaned_data['email']
            msg = MIMEText(
                'Hello.\n'
                'Welcome to Djamazon.\n'
                '\n'
                'You created your own account on Djamazon.\n'
                'From now on, you will get awesome experience!\n'
                '\n'
                'https: // djamazonapp.pythonanywhere.com /\n'
                '\n'
                'If you have a question, feel free to contact with us.\n'
                '\n'
                '\n'
                'Sincerely,\n'
                '\n'
                '---------------------------------------------\n'
                'Djamazon.Corporation\n'
                '\n'
                'Email: buru.aoshin@gmail.com\n'
                '---------------------------------------------\n'
            )
            msg['Subject'] = '【Djamazon】Your account is created now'
            msg['From'] = EMAIL
            msg['To'] = TO
            s = smtplib.SMTP(host='smtp.gmail.com', port=587)
            s.starttls()
            s.login(EMAIL, PASSWORD)
            s.sendmail(EMAIL, TO, msg.as_string())
            s.quit()
            return render(request, 'app/welcome.html')
    else:
        form = CustomUserCreationForm()
    return render(request, 'app/signup.html', {'form': form})


@login_required
def welcome(request):
    return render(request, 'app/welcome.html')


@login_required
def password_reset(request):
    user_mail = request.user.email
    EMAIL = settings.DEFAULT_FROM_EMAIL
    PASSWORD = os.getenv("GMAIL_HOST_PASSWORD")
    TO = user_mail
    msg = MIMEText(
        'Hello.\n'
        '\n'
        'You offered to change your password.\n'
        'Follow the link below:\n'
        'From now on, you will get awesome experience!\n'
        '\n'
        'https://djamazonapp.pythonanywhere.com/admin/password_reset/\n'
        '\n'
        'If clicking the link above doesn’t work, please copy and paste the UR in a new browser window instead.\n'
        '\n'
        'If you’ve received this mail in error, it’s likely that another user entered your email address by mistake while trying to reset a password. If you didn’t initiate the request, you don’t need to take any further action and can safely disregard this email.\n'
        '\n'
        'Sincerely,\n'
        '\n'
        '---------------------------------------------\n'
        'Djamazon.Corporation\n'
        '\n'
        'Email: buru.aoshin@gmail.com\n'
        '---------------------------------------------\n'
    )
    msg['Subject'] = '【Djamazon】You are just to change your password'
    msg['From'] = EMAIL
    msg['To'] = TO
    s = smtplib.SMTP(host='smtp.gmail.com', port=587)
    s.starttls()
    s.login(EMAIL, PASSWORD)
    s.sendmail(EMAIL, TO, msg.as_string())
    s.quit()
    return render(request, 'app/account.html')


def detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    add_to_cart_form = AddToCartForm(request.POST or None)
    if add_to_cart_form.is_valid():
        num = add_to_cart_form.cleaned_data['num']
        if 'cart' in request.session:
            if str(product_id) in request.session['cart']:
                request.session['cart'][str(product_id)] += num
            else:
                request.session['cart'][str(product_id)] = num
        else:
            request.session['cart'] = {str(product_id): num}
        messages.success(request, f"You added {num} {product.name} !")
        return redirect('app:detail', product_id=product_id)
    ctx = {
        'product': product,
        'add_to_cart_form': add_to_cart_form,
    }
    return render(request, 'app/detail.html', ctx)


@login_required
@require_POST
def toggle_fav_product_status(request):
    product = get_object_or_404(Product, pk=request.POST["product_id"])
    user = request.user
    if product in user.fav_products.all():
        user.fav_products.remove(product)
        product.like -= 1
        product.save()
        messages.warning(
            request, f"You removed {product.name} from Favorite.")
    else:
        user.fav_products.add(product)
        product.like += 1
        product.save()
        messages.success(
            request, f"You added {product.name} to Favorite.")
    return redirect('app:detail', product_id=product.id)


@login_required
def fav_products(request):
    user = request.user
    products = user.fav_products.all().order_by('-id')
    return render(request, 'app/top.html', {'products': products})


@login_required
def cart(request):
    user = request.user
    cart = request.session.get('cart', {})
    cart_products = dict()
    total_price = 0
    for product_id, num in cart.items():
        product = Product.objects.get(id=product_id)
        cart_products[product] = num
        total_price += product.price * num

    purchase_form = PurchaseForm(request.POST or None)
    if purchase_form.is_valid():
        if 'search_address' in request.POST:
            zip_code = request.POST['zip_code']
            address = get_address(zip_code)
            if not address:
                messages.warning(request, "could not get the adrress...")
                return redirect('app:cart')
            purchase_form = PurchaseForm(
                initial={'zip_code': zip_code, 'address': address})
        if 'buy_product' in request.POST:
            if not purchase_form.cleaned_data['address']:
                messages.warning(request, "Address needs.")
                return redirect('app:cart')
            if not bool(cart):
                messages.warning(request, "Cart is empty.")
                return redirect('app:cart')
            if total_price > user.point:
                messages.warning(request, "You do not have enough points...")
                return redirect('app:cart')
            for product_id, num in cart.items():
                if not Product.objects.filter(pk=product_id).exists():
                    del cart[product_id]
                product = Product.objects.get(pk=product_id)
                sale = Sale(product=product, user=user, amount=num,
                            price=product.price, total_price=num*product.price)
                sale.save()
            user.point -= total_price
            user.save()
            userpointhistory = UserPointHistory(
                point_history=user.point, user=user)
            userpointhistory.save()
            del request.session['cart']
            messages.success(request, "You purchased items!")
            return redirect('app:cart')
    ctx = {
        'purchase_form': purchase_form,
        'cart_products': cart_products,
        'total_price': total_price,
    }
    return render(request, 'app/cart.html', ctx)


@login_required
@require_POST
def change_item_amount(request):
    product_id = request.POST["product_id"]
    cart_session = request.session['cart']
    if product_id in cart_session:
        if 'action_remove' in request.POST:
            cart_session[product_id] -= 1
        if 'action_add' in request.POST:
            cart_session[product_id] += 1
        if cart_session[product_id] <= 0:
            del cart_session[product_id]
    return redirect('app:cart')


def get_address(zip_code):
    REQUEST_URL = f'http://zipcloud.ibsnet.co.jp/api/search?zipcode={zip_code}'
    address = ''
    response = requests.get(REQUEST_URL)
    response = json.loads(response.text)
    result, api_status = response['results'], response['status']
    if (result != None) and (api_status == 200):
        result = result[0]
        address = result['address1'] + result['address2'] + result['address3']
    return address


@login_required
def order_history(request):
    user = request.user
    sales = Sale.objects.filter(user=user).order_by('-created_at')
    return render(request, 'app/order_history.html', {'sales': sales})


class SearchResultView(ListView):
    template_name = 'app/result.html'
    context_object_name = 'result_list'

    def get_queryset(self):
        if self.request.GET.get('q', ''):
            params = self.parse_search_params(self.request.GET['q'])
            query = reduce(and_, [Q(name__icontains=p) for p in params])
            results = Product.objects.filter(query).order_by('-id')
            return results
        else:
            return None

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['query'] = self.request.GET.get('q', '')
        return ctx

    def parse_search_params(self, words: str):
        search_words = words.replace(' ', ' ').split()
        return search_words

    def results(self):
        return render(request, 'app/result.html', {'results': results})


@login_required
def account(request):
    return render(request, 'app/account.html')


@login_required
def is_img(request):
    if request.method == 'POST':
        user = User.objects.get(id=request.user.id)
        user.is_img.delete(False)
        user.is_img = request.FILES.get("is_img")
        if user.is_img == None:
            return redirect('app:account')
        user.save()
        return redirect('app:account')
    ctx = {
        'profile_is_img': is_img,
        'icon_is_img': is_img,
    }
    return render(request, 'app/account.html', ctx)


def policy(request):
    return render(request, 'app/policy.html')


def terms(request):
    return render(request, 'app/terms.html')


@login_required
def logout(request):
    return render(request, 'app/signup.html')
