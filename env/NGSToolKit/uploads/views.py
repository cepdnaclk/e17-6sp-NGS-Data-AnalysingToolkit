from tracemalloc import start
from xml.dom.minidom import Document
from django.shortcuts import redirect, render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.files.storage import FileSystemStorage
from matplotlib.font_manager import json_dump
from .forms import UploadFileForm
from django.conf import settings
from django.contrib import messages
import pandas as pd
import os
import json
from matplotlib import pyplot as plt
from django.views.decorators.csrf import csrf_exempt
import numpy
import csv

# Create your views here.
def home(request):
    return render(request, "home.html")


@csrf_exempt
def csv_file(request):
    if request.method =="POST":
        uploadedfile = request.FILES['Document']
        fileName = uploadedfile.name
        fs = FileSystemStorage()    #Creating an object
        fs.save(fileName, uploadedfile)
        if fileName.endswith('.csv'):
            data = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        elif fileName.endswith('.xls'):
            data = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))   
        else:
            messages.warning(request,"Incorrect file format")
            return HttpResponse("Incorrect file format")
            # return redirect('Upload')
        json_data = data.to_json()
        # return render(request,'visualize.html',{'data':html_data})
        return HttpResponse(json_data)
    # GET
    else:
        # return render(request, "upload.html")
        return HttpResponse("GET")

@csrf_exempt
def normalizeData(request):
        # Normalize the dataset
        # find the mean of the evry column
        if request.method == "POST":
            form = request.POST
            fileName = form["fileName"]
            if fileName.endswith('.csv'):
                dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
            elif fileName.endswith('.xls'):
                dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))  
            print(dataFrame.columns)
            # mean variance for every column
            meanValues = dataFrame.mean()
            print("Mean values" , meanValues)
            # (data - mean)/ variance 
            dis = dataFrame.describe()
            print(dis)
            # print(dataFrame.head(10))
            return HttpResponse(dataFrame.to_html())


    #Plot the data 
@csrf_exempt
def plotData(request):
    if request.method == "POST":
        #form = request.POST
        body= request.body.decode('utf-8')
        body = json.loads(body)
        fileName = body["fileName"]
        geneName = body["name"]
        if fileName.endswith('.csv'):
            dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        elif fileName.endswith('.xls'):
            dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))  
        dataFrame.set_index("Unnamed: 0", inplace = True)
        columns = dataFrame.columns
        # print(columns)
        Ad_list = []
        control_list = []
        for col in columns:
            if col.startswith("AD"):
                Ad_list.append(col)
            elif col.startswith("control"):
                control_list.append(col)
        Ad_val = dataFrame[Ad_list].loc[geneName].values.tolist()
        control_val = dataFrame[control_list].loc[geneName].values.tolist() 
        Ad_props = [min(Ad_val),numpy.quantile(Ad_val,0.25), numpy.quantile(Ad_val,0.5), numpy.quantile(Ad_val,0.75),max(Ad_val)]
        Control_props = [min(control_val),numpy.quantile(control_val,0.25), numpy.quantile(control_val,0.5), numpy.quantile(control_val,0.75),max(control_val)]
        vals = {"ad":Ad_val, "control":control_val, "Ad_props": Ad_props, "Control_props":Control_props}
        return HttpResponse(json.dumps(vals))
