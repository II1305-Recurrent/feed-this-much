from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Pet
from .serializers import PetSerializer 

@api_view(['POST'])
def save_pet(request):
    serializer = PetSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_pets(request):
    pets = Pet.objects.all()  
    serializer = PetSerializer(pets, many=True)  
    return Response(serializer.data, status=status.HTTP_200_OK)
