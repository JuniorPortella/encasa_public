from django.db import models

class Clientes(models.Model):
    fone = models.CharField(max_length=11)
    nome = models.CharField(max_length=50)
    aniver = models.DateField(null=True)
    email = models.EmailField(max_length=50, null=True)
    cep = models.CharField(max_length=11)
    rua = models.CharField(max_length=60)
    numero = models.IntegerField()
    bairro = models.CharField(max_length=60)
    cidade = models.CharField(max_length=60)
    comp = models.CharField(max_length=40, null=True)
    obs = models.CharField(max_length=100, null=True)
    entrega = models.FloatField()


    def __str__(self) -> str:
        return self.fone
    
class Bairros(models.Model):
    bairro = models.CharField(max_length=50)
    taxa = models.FloatField()

    def __str__(self) -> str:
        return self.bairro