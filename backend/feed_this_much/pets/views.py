from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet
from .serializers import PetSerializer 


@api_view(['POST', 'OPTIONS'])
@permission_classes([IsAuthenticated]) # User auth
def save_pet(request):
    serializer = PetSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)  # Save with userID
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def get_pets(request):
    pets = Pet.objects.filter(user=request.user) # Filter by userID
    if not pets.exists():
        return Response(
            {"message": "No pets yet!"},
            status=status.HTTP_200_OK # 200 OK even if no pets exist
        )
    serializer = PetSerializer(pets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT','OPTIONS'])
@permission_classes([IsAuthenticated])
def update_pet(request, id): 
    try:
        pet = Pet.objects.get(id=id, user=request.user)
    except Pet.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = PetSerializer(pet, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
