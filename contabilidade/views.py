from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404

from home.models import Vendas, ProdutosVendidos

def contabilidade(request):
    if request.method == "GET":
        return render(request, 'contabilidade.html')
    
def buscar(request):
    corpo = json.loads(request.body)
    di = corpo['di']
    df = corpo['df']

    normal = ProdutosVendidos.objects.filter(cod_produto__lte = 100, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    normal_ = json.loads(serializers.serialize('json', normal))
    
    brotinho = ProdutosVendidos.objects.filter(cod_produto__gte = 101,cod_produto__lte = 200, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    brotinho_ = json.loads(serializers.serialize('json', brotinho))

    gigante = ProdutosVendidos.objects.filter(cod_produto__gte = 201,cod_produto__lte = 300, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    gigante_ = json.loads(serializers.serialize('json', gigante))

    calzone = ProdutosVendidos.objects.filter(cod_produto__gte = 301,cod_produto__lte = 400, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    calzone_ = json.loads(serializers.serialize('json', calzone))

    refri2l = ProdutosVendidos.objects.filter(cod_produto__gte = 600,cod_produto__lte = 615, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    refri2l_ = json.loads(serializers.serialize('json', refri2l))

    refri600 = ProdutosVendidos.objects.filter(cod_produto__gte = 620,cod_produto__lte = 626, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    refri600_ = json.loads(serializers.serialize('json', refri600))

    refrilata = ProdutosVendidos.objects.filter(cod_produto__gte = 630,cod_produto__lte = 632, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    refrilata_ = json.loads(serializers.serialize('json', refrilata))

    cerveja = ProdutosVendidos.objects.filter(cod_produto = 633, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    cerveja_ = json.loads(serializers.serialize('json', cerveja))

    agua = ProdutosVendidos.objects.filter(cod_produto__gte = 640, cod_produto__lte = 641, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    agua_ = json.loads(serializers.serialize('json', agua))

    refri1l = ProdutosVendidos.objects.filter(cod_produto__gte = 642, cod_produto__lte = 643, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    refri1l_ = json.loads(serializers.serialize('json', refri1l))

    suco = ProdutosVendidos.objects.filter(cod_produto__gte = 690, cod_produto__lte = 691, data__gte = di, data__lte = df, estado = 2).exclude(cod_produto = 0)
    suco_ = json.loads(serializers.serialize('json', suco))

    vendas = Vendas.objects.filter( data__gte = di, data__lte = df, estado = 2)
    vendas_ = json.loads(serializers.serialize('json', vendas))

    return JsonResponse({'status': 200, 'normal':normal_, 'brotinho': brotinho_, 'gigante': gigante_, 'calzone': calzone_, 'refri2l': refri2l_, 'refri600': refri600_, 'refrilata': refrilata_, 'cerveja': cerveja_, 'agua': agua_, 'refri1l': refri1l_, 'suco': suco_, 'vendas': vendas_})