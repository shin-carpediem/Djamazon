"""
Django settings for ecsite project.

Generated by 'django-admin startproject' using Django 3.0.10.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
from django.utils.translation import ugettext_lazy as _

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

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
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'users',
    'app',
    'social_django',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'api',
    'rest_framework',
]

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
# if DEBUG:
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         }
#     }
# else:
#     DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': os.environ.get('DB_NAME'),
#         'USER': os.environ.get('DB_USER'),
#         'PASSWORD': os.environ.get('DB_PASSWORD'),
#         'HOST': os.environ.get('DB_HOST'),
#     }
# }

MIDDLEWARE = [
    # Django can also be configured to email errors about broken links
    #  (404 "page not found" errors).
    # Django sends emails about 404 errors
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

if DEBUG:
    ALLOWED_HOSTS = ['127.0.0.1']
else:
    ALLOWED_HOSTS = ['.elasticbeanstalk.com', 'shinac.pythonanywhere.com']

ROOT_URLCONF = 'ecsite.urls'

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
# enable translations
USE_I18N = True
# 日付フォーマット設定
USE_L10N = True
USE_TZ = True
LANGUAGES = [
    ('en', _('English')),
    ('ja', _('Japanese')),
]
LOCALE_PATHS = [os.path.join(BASE_DIR, 'locale')]

NUMBER_GROUPING = 3

# セッションを毎回更新
SESSION_SAVE_EVERY_REQUEST = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]
STATIC_ROOT = 'assets'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
print("MEDIA_ROOT", MEDIA_ROOT)

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# メールサーバーへの接続設定
# Gmailサーバーを経由
EMAIL_HOST = os.environ.get('GMAIL_HOST')
EMAIL_HOST_USER = os.environ.get('GMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('GMAIL_HOST_PASSWORD')
EMAIL_POST = os.environ.get('GMAIL_POST')
EMAIL_USE_TLS = True
# mailtrapで擬似的にSMTPバックエンドでメールを受信
# https://mailtrap.io/inboxes/1181697/messages
# if DEBUG:
#     EMAIL_HOST = os.environ.get('MAILTRAP_HOST')
#     EMAIL_HOST_USER = os.environ.get('MAILTRAP_HOST_USER')
#     EMAIL_HOST_PASSWORD = os.environ.get('MAILTRAP_HOST_PASSWORD')
#     EMAIL_PORT = os.environ.get('MAILTRAP_POST')

# --アカウント認証設定------------------------------------------
# django-allauthで利用するdjango.contrib.sitesを使うためにサイト識別用IDを設定
SITE_ID = 1
# 認証バックエンド-ログイン時に何でログインするかを配列の先頭から順に認証する
# https://nmomos.com/tips/2019/07/05/django-social-auth/
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    # メールアドレス認証
    'allauth.account.auth_backends.AuthenticationBackend',
    # ユーザー名認証
    'django.contrib.auth.backends.ModelBackend',
)
# メールアドレス認証に変更する設定
ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ユーザー名の入力を必要とする設定
ACCOUNT_USERNAME_REQUIRED = False
# サインアップにメールアドレス確認をはさむよう設定
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_EMAIL_REQUIRED = True
DEFAULT_FROM_EMAIL = 'buru.aoshin@gmail.com'

# Google認証
# クライアントID
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ.get('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
# クライアント シークレット
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.environ.get(
    'SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')

AUTH_USER_MODEL = 'users.User'

# ログイン/ログアウト後の遷移先を設定
LOGIN_URL = 'app:login'
LOGIN_REDIRECT_URL = 'app:index'
LOGOUT_REDIRECT_URL = 'app:login'

# パフォーマンスの最適化
# DEBUG = False をセットすることで、開発向けの複数の機能が無効化。
# 加えて、以下の設定をチューンすることもできます。
# 永続的なデータベース接続を有効化すると、リクエストのプロセス時間の多くの部分に対するデータベースアカウントへの接続において、高速になります。
# 限られたネットワーク性能の仮想化ホストにおいて、とても効果的。
CONN_MAX_AGE = 0

if DEBUG:
    # 誤ってHTTPによってCSRFクッキーを送信してしまうのを防ぐにはTrueをセット。
    CSRF_COOKIE_SECURE = False
    # 誤ってHTTPによってセッションクッキーを送信してしまうのを防ぐにはTrueをセット。
    SESSION_COOKIE_SECURE = False
else:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True

CACHES = {
    'default': {
        'BACKEND': 'django.core.chache.backends.db.DatabaseCache',
        'LOCATION': 'cache',
    }
}

if DEBUG:
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
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'simple'    # どの出力フォーマットで出すかを名前で指定
            },
        },
        'loggers': {    # ロガーを設定、ここに設定した名前を呼び出す
            'django': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': True,
            },
            # 自分で追加したアプリケーション全般のログを拾うロガー
            '': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': False,
            },
        }
    }
else:
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
