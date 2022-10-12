

from .views import pval
from django.urls import include, path


urlpatterns = [
    path('', pval, name='feature'),
    
    
]
