from django import forms
from matplotlib.pyplot import title

class UploadFileForm(forms.Form):
    file = forms.FileField()