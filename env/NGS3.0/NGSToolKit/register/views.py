from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
# Create your views here.
def register(request):
    form = CreateUserForm()
    return render(request, "register.html",{"form":form})


def login(request):
    return render(request, "register.html")
    