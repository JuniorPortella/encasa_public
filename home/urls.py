from django.urls import path, include
from . import views

from django.views.generic import TemplateView

urlpatterns = [
    path('', views.home, name="home"),
    path('buscar_cliente/', views.buscar_cliente, name="buscar_cliente"),
    path('buscar_produto/', views.buscar_produto, name="buscar_produto"),
    path('fechar_pedido/', views.fechar_pedido, name="fechar_pedido"),
    path('buscar_pedido/', views.buscar_pedido, name="buscar_pedido"),
    path('buscar_bairro/', views.buscar_bairro, name="buscar_bairro"),
    path('cadastrar_bairro/', views.cadastrar_bairro, name="cadastrar_bairro"),
    path('receber/', views.receber, name="receber"),
    path('confirmar_receber/', views.confirmar_receber, name="confirmar_receber"),
    path('cancelar_pedido/', views.cancelar_pedido, name="cancelar_pedido"),
]
