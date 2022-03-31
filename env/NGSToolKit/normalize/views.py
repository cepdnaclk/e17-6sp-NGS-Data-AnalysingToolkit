from django.contrib.auth.models import User
from django.http import HttpResponse
from django.conf import settings
import pandas as pd
import os
from django.views.decorators.csrf import csrf_exempt
from sklearn import preprocessing as ps
from uploads.models import userFiles
import json
# Create your views here.


@csrf_exempt
def normalizeData(request):
        # Normalize the dataset
        # find the mean of the evry column
        if request.method == "POST":
            body= request.body.decode('utf-8')
            body = json.loads(body)
            method = body['method']
            fileName = body['fileName']
            userId = body['userid']
            print(method, fileName, userId)
            #form = request.POST
            #method = form["method"]
            #fileName = form["fileName"]
            #userId = form['userid']
            if fileName.endswith('.csv'):
                dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
                
            elif fileName.endswith('.xls'):
                dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))
            #Changing it to transpose matrix and Set the columns correctly 
            transpose = dataFrame.T
            transpose.columns = transpose.iloc[0]
            transpose = transpose[1:]    
            if method == "Min Max":
                normalized_df = minMaxNormalize(transpose)
            elif method == "Standard Deviation":
                normalized_df = standardNormalize(dataFrame.T.loc[:, dataFrame.T.columns != 'Unnamed: 0'] )
            else:
                return HttpResponse("Wrong method")
            # Changing the narray data set to datafrme and seting columns and index correctly
            normalized_df = pd.DataFrame(normalized_df)
            normalized_df.columns = transpose.columns
            normalized_df = normalized_df.set_index(transpose.index)
            # Save the normalized file in the media folder with "_normalized" in the end
            new_fileName = fileName.split('.')[0]+"_normalized.csv"
            normalized_df.to_csv(os.path.join(settings.MEDIA_ROOT,new_fileName))
            # Save the file details in the Database
            user = User.objects.get(id__exact = userId)
            userfile = userFiles(title = new_fileName, upload_by = user)
            userfile.save()
            return HttpResponse(normalized_df.head().to_json())
        
def minMaxNormalize(df):
    min_max = ps.MinMaxScaler()
    min_max_data = min_max.fit_transform(df)
    return min_max_data

def standardNormalize(df):
    standard = ps.StandardScaler()
    standard_data = standard.fit_transform(df)
    return standard_data

def quantileNormalize(df):
    # ps.quantile_transform(df,random_state=0,)
    return 0
