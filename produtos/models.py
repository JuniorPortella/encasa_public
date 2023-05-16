from django.db import models

class Produtos(models.Model):
    codigo = models.IntegerField()
    descricao = models.CharField(max_length=50)
    valor = models.FloatField()
    valor_prom = models.FloatField(null=True, blank=True)
    
    def __int__(self):
        return self.codigo