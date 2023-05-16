from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from clientes.models import Bairros
import re
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404

def bairros(request):
    if request.method == "GET":
        bairros_list = Bairros.objects.all().order_by('bairro')
        print(bairros_list)
        return render(request, 'bairros.html', {'bairros': bairros_list})
    
def salvar_bairros(request):
    corpo = json.loads(request.body)
    id_bairro = corpo['id']
    taxa = corpo['taxa']

    bairro_ = get_object_or_404(Bairros, id = id_bairro)

    try:
        bairro_.taxa = taxa
        bairro_.save()
        return JsonResponse({'status':'200'})
    except:
        return JsonResponse({'status': '500'})
    
def procurar_bairros(request):
    corpo = json.loads(request.body)
    ordenar = corpo['ordenar'] 
    if ordenar == 1:
        bairros_list = Bairros.objects.all().order_by('bairro')
        bairro_ = json.loads(serializers.serialize('json', bairros_list))
        bairro_json = [{'fields': bairro['fields'], 'id': [bairro['pk']]} for bairro in bairro_]
        data = {'bairros': bairro_json}
        return JsonResponse(data)
    elif ordenar == 2:
        bairros_list = Bairros.objects.all().order_by('taxa')
        bairro_ = json.loads(serializers.serialize('json', bairros_list))
        bairro_json = [{'fields': bairro['fields'], 'id': [bairro['pk']]} for bairro in bairro_]
        data = {'bairros': bairro_json}
        return JsonResponse(data)