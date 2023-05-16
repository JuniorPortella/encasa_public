# Generated by Django 4.1.7 on 2023-02-22 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fone', models.CharField(max_length=11)),
                ('nome', models.CharField(max_length=50)),
                ('aniversario', models.DateField(max_length=11)),
                ('email', models.EmailField(max_length=50)),
                ('cep', models.CharField(max_length=11)),
                ('rua', models.CharField(max_length=60)),
                ('numero', models.IntegerField()),
                ('bairro', models.CharField(max_length=60)),
                ('cidade', models.CharField(max_length=60)),
                ('comp', models.CharField(max_length=40)),
                ('obs', models.CharField(max_length=100)),
                ('entrega', models.FloatField()),
            ],
        ),
    ]
