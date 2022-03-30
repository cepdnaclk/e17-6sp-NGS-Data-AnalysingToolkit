from .views import login_request, register, login_request, profile
from django.urls import path


urlpatterns = [
    path('signup', register, name='Signup'),
    path('login',login_request, name="Login"),
    path("profile", profile, name="Profile" )
    
]
