from django.db import models

# Create your models here.
class Users(models.Model):
    userName = models.CharField(max_length=20)
    email = models.EmailField(max_length = 254)
