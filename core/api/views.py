from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers


#Store components and modifier, remove spaces from components string.
#Convert modifier and components to binary.
#Loop througth components remove every 8th byte and add the modifier.
#Take the modified components string comverte it to hexadecimal number and send it in the response as key.
class DataEncryption(APIView):

    def get(self, request):
        mod = self.request.query_params['modifier']
        comp = self.request.query_params['components']
        shrinkComp = comp.replace(" ", "")
        modifier = bin(int(mod, 16))[2:]
        components = list(bin(int(shrinkComp, 16))[2:])

        for i in range(56, len(components), 56):
            components[i:i+8] = modifier

        binKey = ''.join(components)
        key = hex(int(binKey, 2))

        return Response({'key': key})
