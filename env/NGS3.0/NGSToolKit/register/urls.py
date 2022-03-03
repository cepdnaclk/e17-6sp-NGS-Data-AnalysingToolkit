from .views import register
from django.urls import path

urlpatterns = [
    path('', register, name='Signup'),
    path('signup', register, name='Signup'),
    
]
