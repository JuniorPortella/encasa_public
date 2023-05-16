from django.urls import path
from . import views

urlpatterns = [
    path('', views.clientes, name="clientes"),
    path('buscar_cliente/', views.buscar_cliente, name="buscar_cliente"),
    path('salvar_cliente/', views.salvar_cliente, name="salvar_cliente"),
    path('atualizar_cliente/', views.atualizar_cliente, name="atualizar_cliente"),
    path('buscar_bairro/', views.buscar_bairro, name="buscar_bairro"),
]