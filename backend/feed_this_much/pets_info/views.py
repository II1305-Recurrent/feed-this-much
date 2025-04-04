from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets_info.models import Pet
from .serializers import PetSerializer 

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # User auth
def save_pet(request):
    data = request.data.copy()  # Create a copy of the request data
    data['user'] = request.user.id  # Add the user ID to the data

    serializer = PetSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)  # Save with userID
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pets(request):
    pets = Pet.objects.filter(user=request.user) # Filter by userID
    serializer = PetSerializer(pets, many=True)  
    return Response(serializer.data, status=status.HTTP_200_OK)
