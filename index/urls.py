from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name="index"),
    path('entrar/', views.entrar, name="entrar"),
]