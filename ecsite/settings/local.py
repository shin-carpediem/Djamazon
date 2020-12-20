from .settings import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '2wg520dum$jg5&=q5)etp7v3%9=1ywakh(q663yt062bd$!)-h'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

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

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')
STATICFILES_DIRS = (
   os.path.join(BASE_DIR, 'app/static'),
)

# #誤ってHTTPによってCSRFクッキーを送信してしまうのを防ぐにはTrueをセットしてください。
CSRF_COOKIE_SECURE = False
# #誤ってHTTPによってセッションクッキーを送信してしまうのを防ぐにはTrueをセットしてください。
SESSION_COOKIE_SECURE = False

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

# クライアントID
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '1861949194-g3f66d9pv0i3gegf9t49ftu41aboo4i3.apps.googleusercontent.com'
# クライアント シークレット
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'YDronu00agggNDNXgiyYX5eY'