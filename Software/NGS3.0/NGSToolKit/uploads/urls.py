from .views import csv_file, home
from django.urls import path

urlpatterns = [
    path('home', home),
    path('', home),
    path('upload', csv_file ),
]

