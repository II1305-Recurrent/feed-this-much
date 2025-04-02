from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Temporary storage
pets = []

@api_view(['POST'])
def save_pet(request):
    pet_data = request.data
    pets.append(pet_data)
    return Response(pet_data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_pets(request):
    return Response(pets, status=status.HTTP_200_OK)
