from django.db import models

class Motoqueiros(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.nome
    
class Motoqueiros_Entrega(models.Model):
    motoqueiro = models.IntegerField()
    pedido = models.IntegerField(null=True)
    valor = models.FloatField(null=True)
    data = models.DateField(null=True)
    hora = models.TimeField(null=True)
    estado = models.IntegerField(null=True, blank=True)