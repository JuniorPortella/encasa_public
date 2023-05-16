from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from clientes.models import Clientes, Bairros
from produtos.models import Produtos
from motoqueiro.models import Motoqueiros_Entrega
from .models import ProdutosVendidos, Vendas
import re
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404
from datetime import date
from django.utils import timezone


def home(request):
    if request.method == "GET":
        produtos_list = Produtos.objects.all().order_by('codigo')
        dt = date.today()
        vendas = Vendas.objects.all().filter(data = dt).exclude(estado=2).exclude(estado = 3)
    
        print('entrou aqui')
        return render(request, 'home.html', {'produtos': produtos_list, 'vendas':vendas})
    
def buscar_cliente(request):
    fone = request.POST.get('fone')
    cliente = Clientes.objects.filter(fone=fone)

    if not cliente.exists():
        return JsonResponse({'data':'500'})

    cliente_json = json.loads(serializers.serialize('json', cliente))[0]['fields']
    id_cliente = json.loads(serializers.serialize('json', cliente))[0]['pk']
    return JsonResponse({'clientes': cliente_json,'data':'200', 'id_cliente':id_cliente})

def buscar_produto(request):
    codigo = request.POST.get('codigo')
    produto = Produtos.objects.filter(codigo=codigo)

    if not produto.exists():
        return JsonResponse({'status':300})

    produto_json = json.loads(serializers.serialize('json', produto))[0]['fields']
    return JsonResponse({'status': 200, 'produtos': produto_json})

def fechar_pedido(request):
    corpo = json.loads(request.body)
    id_cliente = corpo['id_cliente']
    end_entrega = corpo ['entrega']
    pedido = Vendas.objects.all().filter(data = date.today()).order_by('-cod_pedido')[:1]
    if not pedido.exists():
        num_pedido = 1
    else:
        pedido = json.loads(serializers.serialize('json', pedido))
        pedido = pedido[0]['fields']['cod_pedido']
        num_pedido = pedido + 1

    cliente = Clientes.objects.filter(id = id_cliente)
    
    cliente_json = json.loads(serializers.serialize('json', cliente))[0]['fields']
    print(cliente_json)
    print(id_cliente)

    ordem = Vendas(
        cod_pedido = num_pedido,
        cod_cliente = id_cliente,
        end_entrega = end_entrega,
        nome_cliente = cliente_json['nome'],
        fone_cliente = cliente_json['fone'],
        data = date.today(),
        hora = timezone.now(),
        estado = 0,
        total = corpo['total'],
        taxa_entrega = corpo['taxa_entrega']
    )
    ordem.save()
    for x in corpo['pedidos']:
        i=0
        qtd_prod = ""
        cod_prod = ""
        desc_prod = ""
        valor_prod = ""
        obs_prod = ""
        for item in x:
            if i == 0:
                qtd_prod = item
            if i==1:
                cod_prod = item
            if i == 2:
                desc_prod = item
            if i == 3:
                valor_prod = item
            if i == 4:
                obs_prod = item
            i=i+1
        
        produtos = ProdutosVendidos(
            pedido = num_pedido,
            qtd_prod = qtd_prod,
            cod_produto = cod_prod,
            desc_prod = desc_prod,
            valor_prod = valor_prod,
            obs_prod = obs_prod,
            data = date.today(),
        )

        produtos.save()
    
    return JsonResponse({'status': 200, 'num_pedido': num_pedido})


def buscar_bairro(request):
    corpo = json.loads(request.body)
    bairro = Bairros.objects.filter(bairro=corpo['taxa'])

    if not bairro.exists():
        return JsonResponse({'status': 500})
    
    bairro_ = json.loads(serializers.serialize('json', bairro))
    
    print(bairro_)
    return JsonResponse({'status': 200, 'taxa': bairro_[0]['fields']['taxa']})

def buscar_pedido(request):
    corpo = json.loads(request.body)
    cod_pedido = corpo['pedido']
    pedido = Vendas.objects.filter(cod_pedido = cod_pedido, data = date.today())

    if not pedido.exists():
        return JsonResponse({'status':300})

    produtos = ProdutosVendidos.objects.filter(pedido = cod_pedido, data = date.today())

    pedido_ = json.loads(serializers.serialize('json', pedido))
    produtos_ = json.loads(serializers.serialize('json', produtos))

    print(pedido_[0]['fields'])
    print(produtos_[1]['fields'])

    return JsonResponse({'status': 200, 'pedido':pedido_[0]['fields'] , 'produtos':produtos_})


def cadastrar_bairro(request):
    corpo = json.loads(request.body)
    
    bairro = corpo['bairro']
    valor = corpo['valor']

    bairro_ = Bairros(
        bairro = bairro,
        taxa = valor,
    )

    bairro_.save()
    return JsonResponse({'status' : '200'})

def receber (request):
    corpo = json.loads(request.body)
    codigo = corpo['codigo']
    pedido = Vendas.objects.filter(cod_pedido = codigo, data = date.today()).exclude(estado=2)

    if not pedido.exists():
        return JsonResponse({'status':300})

    pedido_ = json.loads(serializers.serialize('json', pedido))


    return JsonResponse({'status': 200, 'total':pedido_[0]['fields']['total']})

def confirmar_receber(request):
    corpo = json.loads(request.body)
    codigo = corpo['codigo']
    dinheiro  = corpo['dinheiro']
    credito  = corpo['credito']
    debito  = corpo['debito']
    pix  = corpo['pix']
    vr  = corpo['vr']
    sodexo  = corpo['sodexo']
    alelo  = corpo['alelo']

    venda = get_object_or_404(Vendas, cod_pedido = codigo, data = date.today())

    print(venda)
    try:
        venda.dinheiro = dinheiro
        venda.credito = credito
        venda.debito = debito
        venda.pix = pix
        venda.vr = vr
        venda.sodexo = sodexo
        venda.alelo = alelo
        venda.estado = 2
        venda.save()
    except:
        return JsonResponse({'status': '500', 'erro': 'aquiiiii'})
    
    pvenda = ProdutosVendidos.objects.filter(pedido = codigo, data = date.today())

    print(pvenda)
    try:
        for product in pvenda:
            product.estado = 2
            
        ProdutosVendidos.objects.bulk_update(pvenda, ['estado'])

    except:
        return JsonResponse({'status': '500', 'erro': 'aqui'})
    

    motoqueiro = Motoqueiros_Entrega.objects.filter(pedido = codigo, data = date.today())


    if not motoqueiro.exists():
        return JsonResponse({'status': 200})
    
    motoqueiro = get_object_or_404(Motoqueiros_Entrega, pedido = codigo, data = date.today())

    try:
        
        motoqueiro.estado = 1
        motoqueiro.save()
        
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})
    
    
    
def cancelar_pedido(request):
    corpo = json.loads(request.body)
    codigo = corpo['codigo']

    venda = get_object_or_404(Vendas, cod_pedido = codigo, data = date.today())

    try:
        venda.estado = 3
        venda.save()
    except:
        return JsonResponse({'status': '500'})
    
    pvenda = ProdutosVendidos.objects.filter(pedido = codigo, data = date.today())

    print(pvenda)
    try:
        for product in pvenda:
            product.estado = 3
            
        ProdutosVendidos.objects.bulk_update(pvenda, ['estado'])
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})
    
