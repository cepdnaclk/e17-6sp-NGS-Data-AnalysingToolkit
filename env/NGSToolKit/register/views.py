from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import  AuthenticationForm
from .forms import CreateUserForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login

# Create your views here.
def register(request):
    if request.method =="POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            #Check whether the password are matching
            messages.success(request, 'Your account has been successfully created')
            # return redirect('Login')
            return HttpResponse("Sucess")
        else:
            messages.warning(request,"Registration failed. Invalid information")
            # return redirect('Signup')
            return HttpResponse("Fail")
    else:
        # form = CreateUserForm()
        # return render(request, "register.html",{"form":form})
        return HttpResponse("GET")

#Login Page
def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data = request.POST)
        if form.is_valid():         #Check whether all the feild are correct
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now login as {username}.")
            #if the username or password wrong
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    # form = AuthenticationForm()
    return render(request, "login.html", context={"form": form})                   


#Profile page
def profile(request):
    return render(request, "profile.html",)