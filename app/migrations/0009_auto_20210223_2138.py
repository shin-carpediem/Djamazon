# Generated by Django 3.0.10 on 2021-02-23 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20210223_2138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='like',
            field=models.PositiveIntegerField(default=5),
        ),
    ]
