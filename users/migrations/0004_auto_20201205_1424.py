# Generated by Django 3.1.4 on 2020-12-05 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20201111_0847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='point',
            field=models.PositiveIntegerField(default=10000),
        ),
    ]
