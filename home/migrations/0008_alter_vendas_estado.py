# Generated by Django 4.1.7 on 2023-03-30 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_alter_vendas_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendas',
            name='estado',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
