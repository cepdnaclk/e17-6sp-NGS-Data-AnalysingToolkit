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

# Create your views here.
@csrf_exempt
def csv_file(request):
    if request.method =="POST":
        uploadedfile = request.FILES['Document']
        userId = request.POST['userid']
        fileName = uploadedfile.name
        features = 0
        samples = 0 
        if fileName.endswith('.csv') | fileName.endswith('.xls'):   #check the file format are correct
            fs = FileSystemStorage()    #Creating an object
            fs.save(fileName, uploadedfile)
            query = User.objects.get(id__exact = userId)
            userfile = userFiles(title = fileName, upload_by = query)
            userfile.save()
            if fileName.endswith('.csv'):
                data = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
                features = data.shape[0]-1
                samples = data.shape[1]-1
                print(data.min(axis=1))
                data = data.head(10)
            elif fileName.endswith('.xls'):
                data = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))
                features = data.shape[0]-1
                samples = data.shape[1]-1
                data = data.head(10)
            html_data = data.to_html()
            html = html_data.lstrip('<table border="1" class="dataframe">').rstrip("</table>")
            send = {'html':html,  'name':fileName, 'samples': samples, 'features':features, }
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
        if fileName.endswith('.csv'):
            dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        elif fileName.endswith('.xls'):
            dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))  
        columns = dataFrame.columns
        Ad_list = []
        control_list = []
        # Sperating the columns
        for col in columns:
            if col.startswith("AD"):
                Ad_list.append(col)
            elif col.startswith("control"):
                control_list.append(col)
        # Creating List of AD values
        dataFrame = dataFrame.set_index(dataFrame["genes"])
        Ad_val = dataFrame[Ad_list].loc[geneName].values.tolist()
        # Creating List of control val
        control_val = dataFrame[control_list].loc[geneName].values.tolist() 
        # Creating list of admin ad max and 1,2,3 quantile
        Ad_props = [round(min(Ad_val),4),round(numpy.quantile(Ad_val,0.25),4), round(numpy.quantile(Ad_val,0.5),4), round(numpy.quantile(Ad_val,0.75),4),round(max(Ad_val),4)]
        Control_props = [round(min(control_val),4),round(numpy.quantile(control_val,0.25),4), round(numpy.quantile(control_val,0.5),4), round(numpy.quantile(control_val,0.75),4),round(max(control_val),4)]
        vals = {"ad":Ad_val, "control":control_val, "Ad_props": Ad_props, "Control_props":Control_props}
        return HttpResponse(json.dumps(vals))
