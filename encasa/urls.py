
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import TokenVerifyView
urlpatterns = [
    path('', include('index.urls')),
    path('admin/', admin.site.urls),
    path('index/', include('index.urls')),
    path('clientes/', include('clientes.urls')),
    path('motoqueiro/', include('motoqueiro.urls')),
    path('bairros/', include('bairros.urls')),
    path('home/', include('home.urls')),
    path('produtos/', include('produtos.urls')),
    path('funcionarios/', include('funcionarios.urls')),
    path('contabilidade/', include('contabilidade.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
