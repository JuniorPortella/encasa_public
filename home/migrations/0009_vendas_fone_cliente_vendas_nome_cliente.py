# Generated by Django 4.1.7 on 2023-03-30 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_alter_vendas_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendas',
            name='fone_cliente',
            field=models.CharField(max_length=11, null=True),
        ),
        migrations.AddField(
            model_name='vendas',
            name='nome_cliente',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
