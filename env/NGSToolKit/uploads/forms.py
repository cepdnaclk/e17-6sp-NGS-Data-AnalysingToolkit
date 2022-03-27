from django import forms
from .models import userFiles

class UploadFileForm(forms.Form):
    
    class Meta:
        model = userFiles
        fields = '__all__'
    
    