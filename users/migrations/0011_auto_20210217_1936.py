# Generated by Django 3.0.10 on 2021-02-17 10:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_userpointhistroy'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserPointHistroy',
            new_name='UserPointHistory',
        ),
    ]