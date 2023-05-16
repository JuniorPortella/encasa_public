from django.urls import path
from . import views

urlpatterns = [
    path('', views.produtos, name="produtos"),
    path('salvar_produto/', views.salvar_produto, name="salvar_produto"),
    path('buscar_produto/', views.buscar_produto, name="buscar_produto"),
    path('atualizar_produto/', views.atualizar_produto, name="atualizar_produto"),
    path('procurar_produtos/', views.procurar_produtos, name="procurar_produtos"),
    path('deletar_produtos/', views.deletar_produtos, name="deletar_produtos"),
    
]