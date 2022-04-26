

from .views import calc_Pvalue
from django.urls import include, path


urlpatterns = [
    path('', calc_Pvalue, name='Pvalue'),
    
    
]
