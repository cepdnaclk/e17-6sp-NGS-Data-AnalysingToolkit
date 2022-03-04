from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from django.contrib.auth.models import User
from django.contrib import messages
# Create your views here.
def register(request):
    if request.method =="POST":
        name = request.POST["username"]
        email = request.POST["email"]
        password1 = request.POST["password1"]
        password2 = request.POST["password2"]
        
        if password1 == password2:
            user = User.objects.create_user(username=name, email=email, password= password1)
            user.save()
            messages.success(request, 'Your account has been successfully created')
            return redirect('Login')
        else:
            messages.warning(request,"Password is not match......!")
            return redirect('Signup')
    else:
        form = CreateUserForm()
        return render(request, "register.html",{"form":form})


def login(request):
    return render(request, "register.html")

def profile(request):
    return render(request, "profile.html",)