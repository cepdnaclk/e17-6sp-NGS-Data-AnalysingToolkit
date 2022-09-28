
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('uploads.urls')),
    path('register/', include('register.urls')),
    path('normalize/', include('normalize.urls')),
<<<<<<< HEAD
    path('pval/', include('pval.urls')),
=======
    path('pval/',include('pvalue.urls') ),
>>>>>>> dc115f1521422ca1b07e52753c931161c67d7606
    path("auth/", obtain_auth_token)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)