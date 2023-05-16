from django.urls import path
from . import views

urlpatterns = [
    path('', views.bairros, name="bairros"),
    path('salvar_bairros/', views.salvar_bairros, name="salvar_bairros"),
    path('procurar_bairros/', views.procurar_bairros, name="procurar_bairros"),
]