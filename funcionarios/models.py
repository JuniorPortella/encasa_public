from django.db import models

class Funcionarios(models.Model):
    nome = models.CharField(max_length=80)
    login = models.CharField(max_length=10)
    senha = models.CharField(max_length=10)
    adm = models.BooleanField()
    
    def __str__(self) -> str:
        return self.nome