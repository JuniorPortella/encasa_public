# Generated by Django 4.1.7 on 2023-02-24 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('produtos', '0002_rename_valor_promo_produtos_valor_prom'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produtos',
            name='valor_prom',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
