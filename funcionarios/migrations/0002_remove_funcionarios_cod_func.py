# Generated by Django 4.1.7 on 2023-03-28 22:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('funcionarios', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='funcionarios',
            name='cod_func',
        ),
    ]
