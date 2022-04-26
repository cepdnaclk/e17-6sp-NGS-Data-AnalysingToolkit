from calendar import day_abbr
import json
import os
from django.conf import settings
from django.http import JsonResponse
import pandas as pd
from django.shortcuts import render
import scipy.stats as stats
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from sklearn import preprocessing as ps
from uploads.models import userFiles
from django.contrib.auth.models import User
    
"""
this app is to calculate the p-value and arange them in a order
    
"""


# Create your views here.
@csrf_exempt
def calc_Pvalue(request):
    if request.method == "POST":
        body= request.body.decode('utf-8')
        body = json.loads(body)
        fileName = body['fileName']
        userId = body['userid']
        # Read the file
        if fileName.endswith('.csv'):
            dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
        elif fileName.endswith('.xls'):
            dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))
        
        columns = dataFrame.columns
        p_value = []
        for index, row in dataFrame.iterrows():
            AD_List = []
            CT_List = []
            for col in columns:
                if col.startswith("AD"):
                    AD_List.append(row[col])
                elif col.startswith("control"):
                    CT_List.append(row[col])
            group1 = np.array(AD_List)
            group2 = np.array(CT_List)
            
            #find variance for each group
            var1 = np.var(group1)
            var2 = np.var(group2)
            
            #The ratio of the larger sample variance to the smaller sample variance
            if var1 > var2:
                ratio = var1/var2
            else:
                ratio = var2/var1
            
            #population variances are equal(assumtion)
            if ratio < 4:
                equal = 1
            else:
                equal = 0
                
            #perform two sample t-test
            a = stats.ttest_ind(a=group1, b=group2, equal_var=equal)
            b = np.array(a)
    
            #append pValue into the list
            p_value.append(b[1])
            # Existing the For loop
        dataFrame["p_value"] = p_value
        #Saving the file
        newfileName = fileName.split(".")[0]+ "_p_value" + ".csv"
        dataFrame.to_csv(os.path.join(settings.MEDIA_ROOT,newfileName))
        user = User.objects.get(id__exact = userId)
        userfile = userFiles(title = newfileName, upload_by = user)
        userfile.save()

        #change to html
        html_data = dataFrame.head(10).to_html()
        html = html_data.lstrip('<table border="1" class="dataframe">').rstrip("</table>")
        send = {'html':html,  'name':newfileName}
        return JsonResponse(send)