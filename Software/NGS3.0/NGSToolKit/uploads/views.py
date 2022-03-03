from pyexpat.errors import messages
from xml.dom.minidom import Document
from django.shortcuts import redirect, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.files.storage import FileSystemStorage
from .forms import UploadFileForm
from django.conf import settings
import pandas as pd
import os

# Create your views here.
def home(request):
    return render(request, "home.html")

# CSV file upload
def csv_file(request):
    if request.method =="POST":
        uploadedfile = request.FILES['Document']
        fileName = uploadedfile.name
        fs = FileSystemStorage()    #Creating an object
        fs.save(fileName, uploadedfile)
        data = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        html_data = data.to_html()
        return render(request,'visualize.html',{'data':html_data})

    # GET
    else:
        return render(request, "upload.html")