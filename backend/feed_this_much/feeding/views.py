from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet, Food
from backend.feed_this_much.feeding import calorie_calculator

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_plan(request):
    error_message = ""
    pet = Pet.objects.filter(user=request.user, name=request.petname) # Filter by userID, petname
    food = Food.objects.filter(user=request.user, name=request.foodname) # Filter by userID, foodname

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
    
    if pet.species == "cat":
        calorie_calculator.calculate_cat_feeding
    elif pet.species == "dog":
        calorie_calculator.calculate_dog_feeding
    
    return Response(status=status.HTTP_200_OK)