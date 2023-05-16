from django.urls import path
from . import views

urlpatterns = [
    path('', views.motoqueiro, name="motoqueiro"),
    path('salvar_motoqueiro/', views.salvar_motoqueiro, name="salvar_motoqueiro"),
    path('buscar_motoqueiro/', views.buscar_motoqueiro, name="buscar_motoqueiro"),
    path('buscar_pedido/', views.buscar_pedido, name="buscar_pedido"),
    path('incluir_pedido/', views.incluir_pedido, name="incluir_pedido"),
]