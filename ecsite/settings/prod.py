# from .settings import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'users',
    'app',
    'social_django',
]

MIDDLEWARE = [
# Django can also be configured to email errors about broken links
#  (404 "page not found" errors).
# Django sends emails about 404 errors
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

ALLOWED_HOSTS = ['127.0.0.1', '.elasticbeanstalk.com', '.pythonanywhere.com']
# ALLOWED_HOSTS = ['127.0.0.1', 'Djamazon2-dev.ap-northeast-1.elasticbeanstalk.com']

ROOT_URLCONF = 'ecsite.urls'

# メディアファイル配信URL
MEDIA_URL = '/media/'
# メディアファイルの保存先
MEDIA_ROOT = os.path.join(BASE_DIR, 'app/media')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'ecsite.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True




AUTH_USER_MODEL = 'users.User'

LOGIN_URL = 'app:login'
LOGIN_REDIRECT_URL = 'app:index'
LOGOUT_REDIRECT_URL = 'app:index'

NUMBER_GROUPING = 3

# セッションを毎回更新する
SESSION_SAVE_EVERY_REQUEST = True

# https://nmomos.com/tips/2019/07/05/django-social-auth/
AUTHENTICATION_BACKENDS = (
   'social_core.backends.google.GoogleOAuth2',
   'django.contrib.auth.backends.ModelBackend',
)

# need to cuppling later
#SOCIAL_AUTH_FACEBOOK_KEY = '1067023380377702'
#SOCIAL_AUTH_FACEBOOK_SECRET = '7d3f4a8e9f568e1bd6722296bdfd6c89'






# #あなたのサイトがEメールを送信する場合、設定値が正しくセットされている必要があります。
# #デフォルトでは、Djangoは webmaster@localhost と root@localhost からEメールを送信します。
# #しかし、いくつかのメールプロバイダはこれらのアドレスを拒否します。
# #異なる送信者アドレスを使用するには、DEFAULT_FROM_EMAIL と SERVER_EMAIL 設定を修正してください。
#DEFAULT_FROM_EMAIL = 'buru.aoshin-gmail.com'
#SERVER_EMAIL = 'buru.aoshin-gmail.com'

# from django.core.mail import send_mail

# send_mail(
#     # 'Subject here',
#     'test',
#     # 'Here is the message.',
#     'test',
#     # 'from@example.com',
#     'buru.aoshin-gmail.com',
#     # ['to@example.com'],
#     ['fke129@icloud.com'],
#     fail_silently=False,
# )


# # A list of all the people who get code error notifications.
# # When DEBUG=False and AdminEmailHandler is configured in LOGGING (done by default),
# # Django emails these people the details of exceptions raised in the request/response cycle.
# ADMINS = [('shin_aa', 'buru.aoshin@gmail.com'),]



# # the values for the user,
# # pw and cc variables will be hidden and replaced with stars (**********)
# # n the error reports, whereas the value of the name variable will be disclosed.
# from django.views.decorators.debug import sensitive_variables

# @sensitive_variables('user', 'pw', 'cc')
# def process_info(user):
#     pw = user.pass_word
#     cc = user.credit_card_number
#     name = user.name


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# # パフォーマンスの最適化
# # DEBUG = False をセットすることで、開発向けの複数の機能が無効化されます。
# # 加えて、以下の設定をチューンすることもできます。
# # 永続的なデータベース接続を有効化すると、
# # リクエストのプロセス時間の多くの部分に対するデータベースアカウントへの接続において、
# # 高速になります。
# # 限られたネットワーク性能の仮想化ホストにおいて、とても効果的です。
CONN_MAX_AGE = 0

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/


STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')
# manage.py collectstaticを実行した時に、STATIC_ROOTに追加で出力するファイルがあるパス」を記述。
# ここに指定したパスが、STATIC_ROOTと重複している場合、The STATICFILES_DIRS setting should not contain the STATIC_ROOT settingというエラーが出る。
# https://7me.nobiki.com/2017/django-collectstatic.html
STATICFILES_DIRS = (
   os.path.join(BASE_DIR, '..', 'app/static'),
)

# #誤ってHTTPによってCSRFクッキーを送信してしまうのを防ぐにはTrueをセットしてください。
CSRF_COOKIE_SECURE = True
# #誤ってHTTPによってセッションクッキーを送信してしまうのを防ぐにはTrueをセットしてください。
SESSION_COOKIE_SECURE = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {    # ログの書式を設定
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'mail_admins': {    # メールを送信する
            'level': 'ERROR',    # ERROR以上の場合出力
            'class': 'django.utils.log.AdminEmailHandler',    # ログを出力するクラス
        }
    },
    'loggers': {    # ロガーを設定、ここに設定した名前を呼び出す
        'django': {
            'handlers': ['mail_admins'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
        # 自分で追加したアプリケーション全般のログを拾うロガー
        '': {
            'handlers': ['mail_admins'],
            'level': 'INFO',
            'propagate': False,
        },
    }
}

# クライアントID
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '1861949194-g3f66d9pv0i3gegf9t49ftu41aboo4i3.apps.googleusercontent.com'
# クライアント シークレット
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'YDronu00agggNDNXgiyYX5eY'


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# # パフォーマンスの最適化
# # DEBUG = False をセットすることで、開発向けの複数の機能が無効化されます。
# # 加えて、以下の設定をチューンすることもできます。
# # 永続的なデータベース接続を有効化すると、
# # リクエストのプロセス時間の多くの部分に対するデータベースアカウントへの接続において、
# # 高速になります。
# # 限られたネットワーク性能の仮想化ホストにおいて、とても効果的です。
CONN_MAX_AGE = 0

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/


STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')
# manage.py collectstaticを実行した時に、STATIC_ROOTに追加で出力するファイルがあるパス」を記述。
# ここに指定したパスが、STATIC_ROOTと重複している場合、The STATICFILES_DIRS setting should not contain the STATIC_ROOT settingというエラーが出る。
# https://7me.nobiki.com/2017/django-collectstatic.html
STATICFILES_DIRS = (
   os.path.join(BASE_DIR, '..', 'app/static'),
)

# #誤ってHTTPによってCSRFクッキーを送信してしまうのを防ぐにはTrueをセットしてください。
CSRF_COOKIE_SECURE = True
# #誤ってHTTPによってセッションクッキーを送信してしまうのを防ぐにはTrueをセットしてください。
SESSION_COOKIE_SECURE = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {    # ログの書式を設定
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'mail_admins': {    # メールを送信する
            'level': 'ERROR',    # ERROR以上の場合出力
            'class': 'django.utils.log.AdminEmailHandler',    # ログを出力するクラス
        }
    },
    'loggers': {    # ロガーを設定、ここに設定した名前を呼び出す
        'django': {
            'handlers': ['mail_admins'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
        # 自分で追加したアプリケーション全般のログを拾うロガー
        '': {
            'handlers': ['mail_admins'],
            'level': 'INFO',
            'propagate': False,
        },
    }
}

# クライアントID
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '1861949194-g3f66d9pv0i3gegf9t49ftu41aboo4i3.apps.googleusercontent.com'
# クライアント シークレット
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'YDronu00agggNDNXgiyYX5eY'
