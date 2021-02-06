from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from django.core.mail import send_mail
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
from users.models import UserManager, User
from .forms import CustomUserCreationForm, AddToCartForm, PurchaseForm, AddUserImgForm
from .models import Product, Sale, GoodManager, Good
from ecsite.settings import DEBUG


# Create your views here.
class CacheRouter:
    # A router to control all database cache operations

    def db_for_read(self, model, **hints):
        # All cache read operations go to the replica
        if model._meta.app_label == 'django_cache':
            return 'cache_replica'
        return None

    def db_for_write(self, model, **hints):
        # All cache write operations go to primary
        if model._meta.app_label == 'django_cache':
            return 'cache_primary'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        # Only install the cache model on primary
        if app_label == 'django_cache':
            return db == 'cache_primary'
        return None


def paginate_queryset(request, queryset, count):
    # Pageオブジェクトを返す。countは、1ページに表示する件数。
    paginator = Paginator(queryset, count)
    page = request.GET.get('page')
    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return page_obj


def index(request):
    products = Product.objects.all().order_by('-id')
    page_obj = paginate_queryset(request, products, 16)
    context = {
        'products': page_obj.object_list,
        'page_obj': page_obj,
    }
    return render(request, 'app/index.html', context)


# [pending] tried to separate authentication, but i did not know how to get the exact user's info,
# so, i swicthed to use the latter signup view.

# def signup(request):
#     if request.method == 'POST':
#         form = CustomUserCreationForm(request.POST)
#         if form.is_valid():
#             new_user = form.save()
#             # 仮登録と本登録の切り替えは、is_active属性を使うと簡単です。
#             # 退会処理も、is_activeをFalseにするだけにしておくと捗ります。
#             new_user.is_active = False
#             new_user.save()
#             input_email = form.cleaned_data['email']
#             input_password = form.cleaned_data['password1']
#             new_user = authenticate(email=input_email, password=input_password)
#             if new_user is not None:
#                 login(request, new_user)
#             # メース送信処理
#             template = get_template('app/mail/pleasecheckmail.txt')
#             mail_ctx = {
#                 'user_email': form.cleaned_data['email'],
#             }
#             EmailMessage(
#                 subject='【Djamazon】Please confirm your mail address',
#                 body=template.render(mail_ctx),
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 to=[
#                     'fke129@icloud.com',
#                 ],
#                 bcc=[
#                     'buru.aoshin@gmail.com',
#                 ]
#             ).send()
#             return render(request, 'app/go_to_your_mail.html')
#     else:
#         form = CustomUserCreationForm()
#     return render(request, 'app/signup.html', {'form': form})


# def go_to_your_mail(request):
#     return render(request, 'app/go_to_your_mail')


# def authsignup(request):
#     authsignup_user = User.objects.all()
#     authsignup_user.is_active = True
#     authsignup_user.update()
#     # メース送信処理
#     template = get_template('app/mail/welcome.txt')
#     mail_ctx = {
#         # 'user_email': User.email.all(),
#     }
#     EmailMessage(
#         subject='【Djamazon】Your account is created now',
#         body=template.render(mail_ctx),
#         from_email=settings.DEFAULT_FROM_EMAIL,
#         to=[
#             'fke129@icloud.com',
#         ],
#         bcc=[
#             'buru.aoshin@gmail.com',
#         ]
#     ).send()
#     return render(request, 'app/welcome.html')

# End [pending]


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
            # send mail
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
                'https: // shinac.pythonanywhere.com /\n'
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

            # access to the socket
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
    # send mail
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
        'https://shinac.pythonanywhere.com/admin/password_reset/\n'
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


# ---------------------from here--------------------------
def detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    add_to_cart_form = AddToCartForm(request.POST or None)
    if add_to_cart_form.is_valid():
        num = add_to_cart_form.cleaned_data['num']
        # whether the key named 'cart' exists in session or not
        if 'cart' in request.session:
            # if the number of product already exist, add the number, if not, add new key
            if str(product_id) in request.session['cart']:
                request.session['cart'][str(product_id)] += num
            else:
                request.session['cart'][str(product_id)] = num
        else:
            # add new session key named 'cart'
            request.session['cart'] = {str(product_id): num}
        messages.success(request, f"You added {num} {product.name} !")
        return redirect('app:detail', product_id=product_id)
    context = {
        'product': product,
        'add_to_cart_form': add_to_cart_form,
    }
    return render(request, 'app/detail.html', context)
# -------------------------to here------------------------------


@login_required
@require_POST
def toggle_fav_product_status(request):
    product = get_object_or_404(Product, pk=request.POST["product_id"])
    user = request.user
    if product in user.fav_products.all():
        user.fav_products.remove(product)
        messages.warning(
            request, f"You removed {product.name} from your Favorite!")
    else:
        user.fav_products.add(product)
        messages.success(
            request, f"You added {product.name} to your Favorite!")
    return redirect('app:detail', product_id=product.id)


@login_required
@require_POST
def like(request):
    product = get_object_or_404(Product, pk=request_POST["product_id"])
    product.like += 1
    product.save()
    return redirect('app:detail', product_id=product.id)


@login_required
def fav_products(request):
    user = request.user
    products = user.fav_products.all().order_by('-id')
    return render(request, 'app/index.html', {'products': products})


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
        # 住所検索ボタンが押された場合
        if 'search_address' in request.POST:
            zip_code = request.POST['zip_code']
            address = get_address(zip_code)
            # 住所が取得できなかった場合はメッセージを出してリダイレクト
            if not address:
                messages.warning(request, "You could not get the adrress.")
                return redirect('app:cart')
            # 住所が取得できたらフォームに入力してあげる
            purchase_form = PurchaseForm(
                initial={'zip_code': zip_code, 'address': address})
        # 購入ボタンが押された場合
        if 'buy_product' in request.POST:
            # 住所が入力済みか確認する
            if not purchase_form.cleaned_data['address']:
                messages.warning(request, "You need to input address.")
                return redirect('app:cart')
            # カートが空じゃないか確認
            if not bool(cart):
                messages.warning(request, "Your cart is empty.")
                return redirect('app:cart')
            # 所持ポイントが十分にあるか確認
            if total_price > user.point:
                messages.warning(request, "You do not have enough points.")
                return redirect('app:cart')
            # 各プロダクトの Sale 情報を保存
            for product_id, num in cart.items():
                if not Product.objects.filter(pk=product_id).exists():
                    del cart[product_id]
                product = Product.objects.get(pk=product_id)
                sale = Sale(product=product, user=request.user, amount=num,
                            price=product.price, total_price=num*product.price)
                sale.save()
            # ポイントを削減
            user.point -= total_price
            user.save()
            del request.session['cart']
            messages.success(request, "You purchased items!")
            return redirect('app:cart')
        # for checking bug is happening here.
        else:
            print('add_to_cart_form is not valid.')
            return redirect('app:index')
        # end/for checking bug is happening here.
    context = {
        'purchase_form': purchase_form,
        'cart_products': cart_products,
        'total_price': total_price,
    }
    return render(request, 'app/cart.html', context)


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


# 郵便番号検索の API を利用する関数
def get_address(zip_code):
    REQUEST_URL = f'http://zipcloud.ibsnet.co.jp/api/search?zipcode={zip_code}'
    address = ''
    response = requests.get(REQUEST_URL)
    response = json.loads(response.text)
    result, api_status = response['results'], response['status']
    if api_status == 200:
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
@require_POST
def is_img(request):
    form = AddUserImgForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        return redirect('app/account.html')
    return render(request, 'app/account.html')


def count_good(self):
    # ctx = super().get_context_data()
    ctx = User().get_context_data()
    ctx['good_number'] = ip_address.annotate(good_count=Count('good'))
    return ctx


def owner_profile(request):
    return render(request, 'app/owner_profile.html')


def policy(request):
    return render(request, 'app/policy.html')


def terms(request):
    return render(request, 'app/terms.html')


def logout(request):
    return render(request, 'app/signup.html')
