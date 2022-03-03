from .views import csv_file, home
from django.urls import path

urlpatterns = [
    path('home', csv_file),
    path('', csv_file),
    path('upload', csv_file ),
]

