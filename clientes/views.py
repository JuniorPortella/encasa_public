from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Clientes, Bairros
import re
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404

def clientes(request):
    if request.method == "GET":
        return render(request, 'clientes.html')
    
def buscar_cliente(request):
    fone = request.POST.get('fone')
    cliente = Clientes.objects.filter(fone=fone)

    if not cliente.exists():
        return JsonResponse({'novo':1})

    cliente_json = json.loads(serializers.serialize('json', cliente))[0]['fields']

    return JsonResponse(cliente_json)

def salvar_cliente(request):
    corpo = json.loads(request.body)
    fone = corpo['fone']
    nome = corpo['nome']
    aniver = corpo['aniver']
    if aniver != "":
        aniver = aniver[6:] + "-" + aniver[3:5] + "-" + aniver[:2]
    else:
        aniver = None
    email = corpo['email']
    cep = corpo['cep']
    rua = corpo['rua']
    numero = corpo['numero']
    bairro = corpo['bairro']
    cidade = corpo['cidade']
    comp = corpo['comp']
    obs = corpo['obs']
    entrega = corpo['entrega']
    
    cliente = Clientes(
        fone = fone,
        nome = nome ,
        aniver = aniver,
        email = email,
        cep = cep,
        rua = rua,
        numero = numero,
        bairro = bairro,
        cidade = cidade,
        comp = comp,
        obs = obs,
        entrega = entrega,
    )

    cliente.save()

    bairro_ = Bairros.objects.filter(bairro = bairro)

    if not bairro_.exists():
        bairro_ = Bairros(
            bairro = bairro,
            taxa = entrega
        )

        bairro_.save()

    return JsonResponse({'status':'200'})

def atualizar_cliente(request):
    corpo = json.loads(request.body)
    fone = corpo['fone']
    nome = corpo['nome']
    aniver = corpo['aniver']
    if aniver != "":
        aniver = aniver[6:] + "-" + aniver[3:5] + "-" + aniver[:2]
    else:
        aniver = None
    email = corpo['email']
    cep = corpo['cep']
    rua = corpo['rua']
    numero = corpo['numero']
    bairro = corpo['bairro']
    cidade = corpo['cidade']
    comp = corpo['comp']
    obs = corpo['obs']
    entrega = corpo['entrega']
    
    cliente = get_object_or_404(Clientes, fone = fone)

    bairro_ = Bairros.objects.filter(bairro=bairro)

    if not bairro_.exists():
        bairro_ = Bairros(
            bairro = bairro,
            taxa = entrega
        )
        bairro_.save()

    try:
        cliente.fone = fone
        cliente.nome = nome 
        cliente.aniver = aniver
        cliente.email = email
        cliente.cep = cep
        cliente.rua = rua
        cliente.numero = numero
        cliente.bairro = bairro
        cliente.cidade = cidade
        cliente.comp = comp
        cliente.obs = obs
        cliente.entrega = entrega
        cliente.save()
        

        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})


def buscar_bairro(request):
    corpo = json.loads(request.body)
    bairro = corpo['bairro']
    bairro_ = Bairros.objects.filter(bairro=bairro)

    if not bairro_.exists():
        return JsonResponse({'novo':1})

    bairro_json = json.loads(serializers.serialize('json', bairro_))[0]['fields']

    return JsonResponse(bairro_json)