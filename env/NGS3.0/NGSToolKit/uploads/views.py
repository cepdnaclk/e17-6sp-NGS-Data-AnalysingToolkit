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
import csv

# Create your views here.
def home(request):
    return render(request, "home.html")


@csrf_exempt
def csv_file_react(request):
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
        form = request.POST
        fileName = form["fileName"]
        if fileName.endswith('.csv'):
            dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        elif fileName.endswith('.xls'):
            dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))  
        rowName = form["rowName"]
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
        Ad_val = dataFrame[Ad_list].loc["hsa-mir-30a:hsa-miR-30a-3p"].values.tolist()
        print(Ad_val)
        control_val = dataFrame[control_list].loc["hsa-mir-30a:hsa-miR-30a-3p"].values.tolist()
            
        vals = {"ad":Ad_val, "control":control_val}
            
        
        return HttpResponse(json.dumps(vals))
      
@csrf_exempt
def csv_file(request):
    if request.method =="POST":
        body= request.body.decode('utf-8')
        body = json.loads(body)
        uploadedfile =body['formData']
        
        filename =  uploadedfile['file']
        data = uploadedfile['data']
     
        name = os.path.join(settings.MEDIA_ROOT,filename)

        with open(name , 'w', newline='') as file:
            writer = csv.writer(file)
            for d in data:
                writer.writerow(d)

        data = pd.read_csv(os.path.join(settings.MEDIA_ROOT,filename))
        html_data = data.to_html()
        html = html_data.lstrip('<table border="1" class="dataframe">').rstrip("</table>")
        send = {'html':html,  'name':filename}
        print(send)
        return JsonResponse(send)

      
            
        