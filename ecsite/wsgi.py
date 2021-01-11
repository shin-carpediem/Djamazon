"""
WSGI config for ecsite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
# import sys
# import pymysql

from django.core.wsgi import get_wsgi_application
# from django.core.management import execute_from_command_line

# pymysql.install_as_MySQLdb()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecsite.settings')

application = get_wsgi_application()
