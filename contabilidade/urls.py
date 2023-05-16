from django.urls import path
from . import views

urlpatterns = [
    path('', views.contabilidade, name="contabilidade"),
    path('buscar/', views.buscar, name="buscar"),
    
]