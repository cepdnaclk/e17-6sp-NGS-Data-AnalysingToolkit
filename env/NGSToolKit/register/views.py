from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import  AuthenticationForm
from .forms import CreateUserForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
import json
from uploads.models import userFiles

# Create your views here.
@csrf_exempt
def register(request):
    if request.method =="POST":
        body= request.body.decode('utf-8')
        body = json.loads(body)
        print(body)
        form = CreateUserForm(body)
        print(form.is_valid())
        if form.is_valid():
            user = form.save()
            print(user)
            login(request, user)
            return HttpResponse("Sucess")
        else:
            return HttpResponse("Fail")
            # what is the error 
    else:
        return HttpResponse("GET")

#Login Page
@csrf_exempt
def login_request(request):
    if request.method == "POST":
        body= request.body.decode('utf-8')
        body = json.loads(body)
        print(body)
        form = AuthenticationForm(data=body)
        print(form.is_valid())
        if form.is_valid():         #Check whether all the feild are correct
            print('valid')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now login.")
                data = "You are now login as {username}."
            #if the username or password wrong
            else:
                messages.error(request, "Invalid username or password.")
                data = "You are now login as {username}."
        else:
            messages.error(request, "Invalid username or password.")
            data = "Invalid username or password."
    form = AuthenticationForm()
    #return render(request, "login.html", context={"form": form})
    print(messages)
    return HttpResponse(data)

#Profile page
@csrf_exempt
def profile(request):
    if request.method == "POST":
        userId = request.POST["userid"]
        userfiles = userFiles.objects.filter(id=userId)
        fileLis = []
        for file in userFiles:
            fileLis.append(file.title)
        return HttpResponse(fileLis)
    else:
        return HttpResponse("Get")
