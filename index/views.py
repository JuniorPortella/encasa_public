from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import re
from funcionarios.models import Funcionarios
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView

def index(request):
    if request.method == "GET":
        return render(request, 'index.html')
    


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        info = {'message': 'Hello dear Developer!'}
        return Response(info)
    

def entrar(request):
    corpo = json.loads(request.body)
    login = corpo['login']
    senha = corpo['senha']
    funcionario = Funcionarios.objects.filter(login = login, senha = senha)

    if not funcionario.exists():
        return JsonResponse({'status' : '500'})
    else:
        funcionario_json = json.loads(serializers.serialize('json', funcionario))[0]['fields']
        
        return JsonResponse({'status' : '200' , 'funcionario' : funcionario_json})
        #return redirect(request, '../home/', {'funcionario' : funcionario_json})
        