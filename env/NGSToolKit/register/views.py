from django.http import HttpResponse, JsonResponse
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
        form = CreateUserForm(body)
        email = body["email"]
        if User.objects.filter(username = body['username']).exists():
            return HttpResponse("Username already exist",status = 406)
        if User.objects.filter(email = email).exists():
            return HttpResponse("Email address already exist",status =406 )
        if form.is_valid():
            user = form.save()
            login(request, user)
            return HttpResponse("Success", status=202)
        else:
            return HttpResponse("Invalid request", status=406)
            # what is the error 
    else:
        return HttpResponse("Hello world")

#Login Page
@csrf_exempt
def login_request(request):
    if request.method == "POST":
        body= request.body.decode('utf-8')
        body = json.loads(body)
        form = AuthenticationForm(data=body)
        if form.is_valid():         #Check whether all the feild are correct
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                userid=User.objects.get(username=username).pk
                data = {'username':username, 'message':'success', "userid":userid}
                return JsonResponse(data, status=202)
            #if the username or password wrong
            else:
                return HttpResponse("User Name or Password is wrong!", status = 401)
        else:
            data = "Invalid username or password."
            return HttpResponse(data, status= 401)

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
        return HttpResponse()
