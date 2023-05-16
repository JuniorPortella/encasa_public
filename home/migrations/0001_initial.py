# Generated by Django 4.1.7 on 2023-02-26 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0005_bairros'),
        ('produtos', '0003_alter_produtos_valor_prom'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vendas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod_pedido', models.IntegerField()),
                ('end_entrega', models.CharField(max_length=150)),
                ('data', models.DateField()),
                ('hora', models.TimeField()),
                ('qtd_prod', models.FloatField()),
                ('valor_prod', models.FloatField()),
                ('obs_prod', models.CharField(max_length=80)),
                ('dinheiro', models.FloatField()),
                ('credito', models.FloatField()),
                ('debito', models.FloatField()),
                ('pix', models.FloatField()),
                ('vr', models.FloatField()),
                ('sodexo', models.FloatField()),
                ('alelo', models.FloatField()),
                ('gorjeta', models.FloatField()),
                ('cod_cliente', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='clientes.clientes')),
                ('cod_produto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='produtos.produtos')),
            ],
        ),
    ]