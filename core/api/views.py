from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers


class Encoder(APIView):

    def get(self, request):
        number = self.request.query_params['NumToEncode']
        numberInt = int(number)

        # Add 8192 to the value.
        translated_number = numberInt + 8192

        # Encoding requires to form two bytes from the value.
        # Most significant bit of each byte has to be cleared. In binary: bits 1 to 0
        # Using & operator that compares 1 to 1 return 0
        firstByte = translated_number & 0x007F
        secondByte = translated_number & 0xFF80

        # In binary second_byte bits are shifted to the left by 1 places inserting a 0
        shiftedSecondByte = secondByte << 1
        encodedValue = firstByte + shiftedSecondByte

        # Format the two bytes as a hexadecimal string and return it as key.
        key = hex(encodedValue)[2:]
        print(key)
        return Response({'key': key})



class Decoder(APIView):

    def get(self, request):
        s1 = self.request.query_params['Num1T0Decode']
        s2 = self.request.query_params['Num2ToDecode']


        firstNumberToDecode = int(s1, 16)
        SeconNumberToDecode = int(s2, 16)

        # Return bits shifted to the left by 7 places inserting 0
        # If f_byte is 7f which in binary is 1111111, gives 11111110000000
        # This gives back a 14-bit range number
        ShiftedFirstNumberToDecode = firstNumberToDecode << 7

        decodedValue = (ShiftedFirstNumberToDecode + SeconNumberToDecode) - 8192
        key = decodedValue
        print(key)
        return Response({'key': key})
