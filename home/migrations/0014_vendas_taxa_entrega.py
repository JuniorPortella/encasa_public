# Generated by Django 4.1.7 on 2023-05-09 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0013_produtosvendidos_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendas',
            name='taxa_entrega',
            field=models.FloatField(blank=True, null=True),
        ),
    ]