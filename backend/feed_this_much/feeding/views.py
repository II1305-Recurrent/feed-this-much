from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet
#from feed_this_much.feeding.models import Food
from feed_this_much.feeding import calorie_calculator

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_plan(request):
    error_message = ""
    pet = Pet.objects.filter(user=request.user, name=request.petname) # Filter by userID, petname
    #food = Food.objects.filter(user=request.user, name=request.foodname) # Filter by userID, foodname
    energy_needs = None

    if not pet.exists():
        error_message = "No such pet exists"
        #if not food.exists():
            #error_message += ", no such food exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    """
    if not food.exists():
        error_message = "No such food exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    """
    
    if pet.species == "cat":
        energy_needs = calorie_calculator.calculate_cat_feeding(pet)
    elif pet.species == "dog":
        energy_needs = calorie_calculator.calculate_dog_feeding(pet)
    
    # from the food, we get kJ per amount
    # make energy_needs - food_energy = 0
    # if overflow, limit to nearest decimal

    print(energy_needs) # this can be removed. seriously just to be able to push. kill me...


    return Response(status=status.HTTP_200_OK)