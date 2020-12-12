from .settings import *

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

STATIC_URL = 'app/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'app/static')
# manage.py collectstaticを実行した時に、STATIC_ROOTに追加で出力するファイルがあるパス」を記述。
# ここに指定したパスが、STATIC_ROOTと重複している場合、The STATICFILES_DIRS setting should not contain the STATIC_ROOT settingというエラーが出る。
# https://7me.nobiki.com/2017/django-collectstatic.html
STATICFILES_DIRS = (
   os.path.join(BASE_DIR, 'static'),
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