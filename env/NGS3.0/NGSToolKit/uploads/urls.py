from .views import csv_file, home, normalizeData,plotData
from django.urls import path

urlpatterns = [
    path('home', csv_file, name='Upload'),
    path('', csv_file, name='Upload'),
    path('upload', csv_file, name='Upload' ),
    path('normalize', normalizeData, name = 'Normalize' ),
    path('plotdata', plotData, name="PlotData")
]

