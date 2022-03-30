from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class userFiles(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    upload_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
