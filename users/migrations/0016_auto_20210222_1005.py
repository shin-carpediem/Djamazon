# Generated by Django 3.0.10 on 2021-02-22 01:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20210222_1003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpointhistory',
            name='user',
            field=models.ForeignKey(default='550e8400e29b41d4a716446655440000', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]