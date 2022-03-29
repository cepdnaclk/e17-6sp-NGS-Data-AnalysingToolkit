from .views import csv_file,plotData
from django.urls import path

urlpatterns = [
    path('home', csv_file, name='Upload'),
    path('', csv_file, name='Upload'),
    path('upload', csv_file, name='Upload' ),
    path('plotdata', plotData, name="PlotData")
]

