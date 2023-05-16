from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Motoqueiros, Motoqueiros_Entrega
from home.models import Vendas
import re
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404
from datetime import date
from django.utils import timezone

def motoqueiro(request):
    if request.method == "GET":
        motoqueiro_list = Motoqueiros.objects.all()
        return render(request, 'motoqueiro.html', {'motoqueiros': motoqueiro_list})
    
def salvar_motoqueiro(request):
    corpo = json.loads(request.body)

    nome = corpo['nome']
    
    motoqueiro_ = Motoqueiros.objects.filter(nome = nome)

    if not motoqueiro_.exists():
        cliente = Motoqueiros(
            nome = nome ,
        )

        cliente.save()
        return JsonResponse({'status':'200'})
    else:
        return JsonResponse({'status':'300'})
    
def buscar_motoqueiro(request):
    
    corpo = json.loads(request.body)
    entregas = Motoqueiros_Entrega.objects.filter(motoqueiro = corpo['id'], data = date.today(), estado = 0)
    if not entregas.exists():
        return JsonResponse({'status':'300',})
    print(entregas)
    entregas_ = json.loads(serializers.serialize('json', entregas))
    print(entregas_)
    return JsonResponse({'status':'200', 'entregas': entregas_})
    
def buscar_pedido(request):
    corpo = json.loads(request.body)
    pedido = Vendas.objects.filter(cod_pedido = corpo['pedido'], data = date.today(), estado = 0)
    if not pedido.exists():
        return JsonResponse({'status':'300',})
    pedido_ = json.loads(serializers.serialize('json', pedido))[0]['fields']
    return JsonResponse({'status':'200', 'pedido': pedido_})

def incluir_pedido(request):
    corpo = json.loads(request.body)
    motoqueiro = corpo['motoqueiro']
    pedido = corpo['pedido']
    valor = corpo['valor']

    entrega = Motoqueiros_Entrega(
        motoqueiro = motoqueiro,
        pedido = pedido,
        valor = valor,
        data = date.today(),
        hora = timezone.now(),
        estado = 0,
    )

    entrega.save()
    pedido = get_object_or_404(Vendas, cod_pedido = pedido, data = date.today(), estado = 0)

    try:
        pedido.estado = 1
        pedido.save()
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})
