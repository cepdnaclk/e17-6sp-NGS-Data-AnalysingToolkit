from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.files.storage import FileSystemStorage
from .forms import UploadFileForm
from django.conf import settings
from django.contrib import messages
import pandas as pd
import os
import json
from matplotlib import pyplot as plt
from django.views.decorators.csrf import csrf_exempt
import numpy
from .models import userFiles
import csv
import s

# Create your views here.
def home(request):
    return render(request, "home.html")

@csrf_exempt
def csv_file(request):
    if request.method =="POST":
        body= request.body.decode('utf-8')
        body = json.loads(body)
        uploadedfile = body['formData']
        filename =  uploadedfile['file']
        userId = uploadedfile['userid']
        query = User.objects.get(id__exact = userId)
        print(query)
        userfile = userFiles(title = filename, upload_by = query)
        userfile.save()
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
        return JsonResponse(send)


# @csrf_exempt
# def csv_file(request):
#     if request.method =="POST":
#         body_decode = request.body.decode('utf-8')
#         uploadedfile = request.FILES['Document']
#         fileName = uploadedfile.name
#         if fileName.endswith('.csv') | fileName.endswith('.xls'):   #check the file format are correct
#             fs = FileSystemStorage()    #Creating an object
#             fs.save(fileName, uploadedfile)
#             userfile = userFiles(title = fileName)
#             userfile.save()
#             if fileName.endswith('.csv'):
#                 data = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
#             elif fileName.endswith('.xls'):
#                 data = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))   
#                 # return redirect('Upload')
#             json_data = data.to_json()
#             # return render(request,'visualize.html',{'data':html_data})
#             return HttpResponse(json_data)
#         else:
#                 messages.warning(request,"Incorrect file format")
#                 return HttpResponse("Incorrect file format")
#     # GET
#     else:
#         # return render(request, "upload.html")
#         return HttpResponse("GET")

    
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
            # mean variance for every column
            meanValues = dataFrame.mean()
            # (data - mean)/ variance 
            dis = dataFrame.describe()
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
