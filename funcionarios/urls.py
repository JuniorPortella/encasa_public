from django.urls import path
from . import views

from django.views.generic import TemplateView

urlpatterns = [
    path('', views.funcionarios, name="funcionarios"),
    path('salvar/', views.salvar, name="salvar"),
    path('alterar/', views.alterar, name="alterar"),
    path('deletar/', views.deletar, name="deletar"),
]
