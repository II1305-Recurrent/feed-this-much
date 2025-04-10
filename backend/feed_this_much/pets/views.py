from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from feed_this_much.pets.models import Pet
from feed_this_much.feeding.models import Food
from .serializers import PetSerializer 

@api_view(['POST'])
@permission_classes([AllowAny]) # User auth
def save_pet(request):
    serializer = PetSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user if request.user.is_authenticated else None)  # Save with userID
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pets(request):
    pets = Pet.objects.filter(user=request.user) # Filter by userID
    if not pets.exists():
        return Response(
            {"message": "No pets yet!"},
            status=status.HTTP_200_OK # 200 OK even if no pets exist
        )
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_plan(request):
     error_message = ""
     pet = Pet.objects.filter(user=request.user, name=request.petname) # Filter by userID, petname
     food = Food.objects.filter(user=request.user, name=request.foodname) # Filter by userID, foodname
     #energy_needs = None
 
     if not pet.exists():
         error_message = "No such pet exists"
         if not food.exists():
             error_message += ", no such food exists"
         return Response(
             {"error": error_message},
             status=status.HTTP_400_BAD_REQUEST
         )
 
     if not food.exists():
         error_message = "No such food exists"
         return Response(
             {"error": error_message},
             status=status.HTTP_400_BAD_REQUEST
         )
     
     #if pet.species == "cat":
         #energy_needs = calorie_calculator.calculate_cat_feeding(pet)
     #elif pet.species == "dog":
         #energy_needs = calorie_calculator.calculate_dog_feeding(pet)
 
     # from the food, we get kJ per amount
     # make energy_needs - food_energy = 0
     # if overflow, limit to nearest decimal