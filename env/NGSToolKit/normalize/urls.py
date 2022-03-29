from .views import normalizeData
from django.urls import path

urlpatterns = [
    path('normalize', normalizeData, name="Normalize")
]
