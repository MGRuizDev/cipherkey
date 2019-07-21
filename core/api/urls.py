from django.urls import path
from .views import DataEncryption

urlpatterns = [
    path('', DataEncryption.as_view()),
]
