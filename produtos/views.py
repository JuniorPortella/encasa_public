from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from .models import Produtos
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404


def produtos(request):
    if request.method == "GET":
        produtos_list = Produtos.objects.all().order_by('descricao')
        return render(request, 'produtos.html', {'produtos': produtos_list})
    
def salvar_produto(request):
    corpo = json.loads(request.body)
    codigo = corpo['codigo']
    descricao = corpo['descricao']
    valor = corpo['valor']
    valor_prom = corpo['valor_prom']
    produtos = Produtos(
        codigo = codigo,
        descricao = descricao,
        valor = valor,
        valor_prom = valor_prom,
    )

    produtos.save()

    return JsonResponse({'status':'200'})

def buscar_produto(request):
    codigo = request.POST.get('codigo')
    produto = Produtos.objects.filter(codigo=codigo)

    if not produto.exists():
        return JsonResponse({'novo':1})

    produto_json = json.loads(serializers.serialize('json', produto))[0]['fields']

    return JsonResponse(produto_json)

def atualizar_produto(request):
    corpo = json.loads(request.body)
    codigo = corpo['codigo']
    descricao = corpo['descricao']
    valor = corpo['valor']
    valor_prom = corpo['valor_prom']
    
    produto = get_object_or_404(Produtos, codigo = codigo)
    
    try:
        produto.descricao = descricao
        produto.valor = valor 
        produto.valor_prom = valor_prom

        produto.save()

        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})

def procurar_produtos(request):
    corpo = json.loads(request.body)
    ordenar = corpo['ordenar'] 
    if ordenar == 1:
        produtos_list = Produtos.objects.all().order_by('codigo')
        produto_ = json.loads(serializers.serialize('json', produtos_list))
        produto_json = [{'fields': bairro['fields'], 'id': [bairro['pk']]} for bairro in produto_]
        data = {'produtos': produto_json}
        return JsonResponse(data)
    elif ordenar == 2:
        produtos_list = Produtos.objects.all().order_by('descricao')
        produto_ = json.loads(serializers.serialize('json', produtos_list))
        produto_json = [{'fields': bairro['fields'], 'id': [bairro['pk']]} for bairro in produto_]
        data = {'produtos': produto_json}
        return JsonResponse(data)
    
def deletar_produtos(request):
    corpo = json.loads(request.body)
    id = corpo['codigo']
    print (id)
    try:
        produto = Produtos.objects.get(id = id)
        produto.delete()
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status' : '500'})