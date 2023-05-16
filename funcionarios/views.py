from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from .models import Funcionarios
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404

def funcionarios(request):
    if request.method == "GET":
        func_list = Funcionarios.objects.all().order_by('nome')
        return render(request, 'funcionarios.html', {'funcionarios': func_list})
    
def salvar(request):
    corpo = json.loads(request.body)
    
    nome = corpo['nome']
    login = corpo['login']
    senha = corpo['senha']
    adm = corpo['adm']

    funcionario = Funcionarios(
        nome = nome,
        login = login,
        senha = senha,
        adm = adm
    )

    funcionario.save()
    return JsonResponse({'status' : '200'})

def alterar(request):
    corpo = json.loads(request.body)
    
    id = corpo['id']
    nome = corpo['nome']
    login = corpo['login']
    senha = corpo['senha']
    adm = corpo['adm']

    funcionario = get_object_or_404(Funcionarios, id = id)

    try:
        funcionario.nome = nome
        funcionario.login = login
        funcionario.senha = senha
        if adm == 0:
            funcionario.adm = False
        else:
            funcionario.adm = True
        print(adm)
        funcionario.save()
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})

def deletar(request):
    corpo = json.loads(request.body)
    id = corpo['id']
    print (id)
    try:
        funcionario = Funcionarios.objects.get(id = id)
        funcionario.delete()
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status' : '500'})