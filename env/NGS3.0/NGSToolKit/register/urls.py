from re import template
from .views import register, login, profile
from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', register, name='Signup'),
    path('login',auth_views.LoginView.as_view(template_name = "login.html"), name="Login"),
    path("profile", profile, name="Profile" )
    
]
