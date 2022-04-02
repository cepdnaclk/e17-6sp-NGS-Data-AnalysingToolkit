from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import pandas as pd
import os
from django.views.decorators.csrf import csrf_exempt
from sklearn import preprocessing as ps
from uploads.models import userFiles
import json

# import warnings filter
from warnings import simplefilter
# ignore all future warnings
simplefilter(action='ignore', category=FutureWarning)
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
                normalized_df = standardNormalize(transpose)
            else:
                return HttpResponse("Wrong method")
            # Changing the narray data set to datafrme and seting columns and index correctly
            normalized_df = pd.DataFrame(normalized_df)
            normalized_df = normalized_df.T
            normalized_df.columns = dataFrame.columns[1:]
            normalized_df = normalized_df.set_index(transpose.columns)
            # Save the normalized file in the media folder with "_normalized" in the end
            new_fileName = fileName.split('.')[0]+method+"_normalized.csv"
            normalized_df.to_csv(os.path.join(settings.MEDIA_ROOT,new_fileName))
            # Save the file details in the Databas e
            user = User.objects.get(id__exact = userId)
            userfile = userFiles(title = new_fileName, upload_by = user)
            userfile.save()
            html_data = normalized_df.head(10).to_html()
            html = html_data.lstrip('<table border="1" class="dataframe">').rstrip("</table>")
            send = {'html':html,  'name':new_fileName, 'method':method}
            return JsonResponse(send)
        
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
