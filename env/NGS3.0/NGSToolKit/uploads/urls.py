from .views import csv_file, home
from django.urls import path

urlpatterns = [
    path('home', csv_file, name='Upload'),
    path('', csv_file, name='Upload'),
    path('upload', csv_file, name='Upload' ),
]

