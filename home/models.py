from django.db import models
from clientes.models import Clientes

class Vendas(models.Model):
    cod_pedido = models.IntegerField()
    cod_cliente = models.IntegerField()
    end_entrega = models.CharField(max_length=250)
    taxa_entrega = models.FloatField(null=True, blank=True)
    data = models.DateField()
    hora = models.TimeField()
    nome_cliente = models.CharField(max_length = 50, null=True)
    fone_cliente = models.CharField(max_length = 11, null=True)
    estado = models.IntegerField(null=True, blank=True)
    dinheiro = models.FloatField(null=True, blank=True)
    credito = models.FloatField(null=True, blank=True)
    debito = models.FloatField(null=True, blank=True)
    pix = models.FloatField(null=True, blank=True)
    vr = models.FloatField(null=True, blank=True)
    sodexo = models.FloatField(null=True, blank=True)
    alelo = models.FloatField(null=True, blank=True)
    gorjeta = models.FloatField(null=True, blank=True)
    total = models.FloatField(null=True, blank=True)
    def __int__(self):
        return self.cod_pedido
    
class ProdutosVendidos(models.Model):
    pedido = models.IntegerField(null=True)
    qtd_prod = models.FloatField()
    cod_produto = models.IntegerField()
    desc_prod = models.CharField(max_length=50)
    valor_prod = models.FloatField()
    obs_prod = models.CharField(max_length=100, null=True, blank= True)

    data = models.DateField(null=True,blank=True)
    estado = models.IntegerField(null=True, blank=True)

    def __int__(self):
        return self.pedido