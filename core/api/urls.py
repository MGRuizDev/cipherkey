from django.urls import path
from .views import Encoder, Decoder

urlpatterns = [
    path('encode/', Encoder.as_view()),
    path('decode/', Decoder.as_view()),
]
