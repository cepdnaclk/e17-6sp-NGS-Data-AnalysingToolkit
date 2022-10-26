from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import pandas as pd
import os
from django.views.decorators.csrf import csrf_exempt
from sklearn import preprocessing as ps
from uploads.models import userFiles
import json
import numpy as np
# Create your views here.

#<<<<<<<<<<<<<<<<<<<<<<Correlation matrix >>>>>>>>>>>>>>>>>>>>>>>
@csrf_exempt
def pval(request):
    
    if request.method == "POST":
            body= request.body.decode('utf-8')
            body = json.loads(body)
            fileName = body['fileName']
            userId = body['userid']
            SL = float(body['SL'] )        #Siginificance level
            if fileName.endswith('.csv'):
                dataFrame = pd.read_csv(os.path.join(settings.MEDIA_ROOT,fileName))
            elif fileName.endswith('.xls'):
                dataFrame = pd.read_excel(os.path.join(settings.MEDIA_ROOT,fileName))
            
            #Changing it to transpose matrix and Set the columns correctly 
            # transpose = dataFrame.T
            transpose=dataFrame.T
            transpose.columns = transpose.iloc[0]
            cols = transpose.columns
            transpose.head()
            transpose.index[1:]
            transpose = transpose[1:]
            corrs =transpose.corr()
            corrs
            transpose.index = transpose["genes"]
            columns = np.full((corrs.shape[0],), True, dtype=bool)
            for i in range(corrs.shape[0]):
                for j in range(i+1, corrs.shape[0]):
                    if corrs.iloc[i,j] >= 0.9:
                        if columns[j]:
                            columns[j] = False
            selected_columns = transpose.columns[columns]
            DF_with_SelectedFeatures = transpose[selected_columns]
            DF_with_SelectedFeatures.shape
            selected_columns = selected_columns[1:]
            
            data_modeled, selected_columns = backwardElimination(DF_with_SelectedFeatures.iloc[:,1:].values, DF_with_SelectedFeatures.iloc[:,0].values, SL, selected_columns)
            new_df_pval = pd.DataFrame(data = data_modeled, columns = selected_columns)
            html_data = new_df_pval.head(10).to_html()
            html = html_data.lstrip('<table border="1" class="dataframe">').rstrip("</table>")
            send = {'html':html}
            return JsonResponse(send)




def backwardElimination(x, Y, sl, columns):
    numVars = len(x[0])
    for i in range(0, numVars):
        regressor_OLS = sm.OLS(Y, x).fit()
        maxVar = max(regressor_OLS.pvalues).astype(float)
        if maxVar > sl:
            for j in range(0, numVars - i):
                if (regressor_OLS.pvalues[j].astype(float) == maxVar):
                    x = np.delete(x, j, 1)
                    columns = np.delete(columns, j)
                    
    regressor_OLS.summary()
    return x, columns