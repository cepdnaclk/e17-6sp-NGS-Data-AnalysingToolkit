from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import pandas as pd
import os
import json
from django.views.decorators.csrf import csrf_exempt
import numpy
from .models import userFiles
import csv

# Create your views here.

@csrf_exempt
def csv_file(request):
    if request.method =="POST":
        uploadedfile = request.FILES['Document']
        userId = request.POST['userid']
        fileName = uploadedfile.name
        if fileName.endswith('.csv') | fileName.endswith('.xls'):   #check the file format are correct
            fs = FileSystemStorage()    #Creating an object
            fs.save(fileName, uploadedfile)
            query = User.objects.get(id__exact = userId)
            userfile = userFiles(title = fileName, upload_by = query)
            userfile.save()
            if fileName.endswith('.csv'):
                data = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
            elif fileName.endswith('.xls'):
                data = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))   
            html_data = data.to_html()
            html = html_data.lstrip('<table border="1" class="dataframe">').rstrip("</table>")
            send = {'html':html,  'name':fileName}
            return JsonResponse(send)
        else:
            return HttpResponse("Incorrect file format")
    # GET
    else:
        # return render(request, "upload.html")
        return HttpResponse("GET")


#Plot the data 
@csrf_exempt
def plotData(request):
    if request.method == "POST":
        #form = request.POST
        body= request.body.decode('utf-8')
        body = json.loads(body)
        fileName = body["fileName"]
        geneName = body["name"]
        print(fileName)
        if fileName.endswith('.csv'):
            dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        elif fileName.endswith('.xls'):
            dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))  
        columns = dataFrame.columns
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
