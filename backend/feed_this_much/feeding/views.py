from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet
from feed_this_much.food.models import UserFood
from feed_this_much.feeding import calorie_calculator

@api_view(['GET', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def generate_plan(request):
    error_message = ""
    pet = Pet.objects.filter(user=request.user, name=request.petname) # Filter by userID, petname
    food = UserFood.objects.filter(user=request.user, name=request.food_name) # Filter by userID, foodname
    energy_needs = None

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
        energy_needs = calorie_calculator.calculate_cat_feeding(pet)
    elif pet.species == "dog":
        energy_needs = calorie_calculator.calculate_dog_feeding(pet)
    
    # from the food, we get kJ per weight

    energy_given = food.energy
    if food.energy_unit[0] == "kcal":
        energy_given *= 4.184
    
    # energy per portion weight, eg 840kcal (multiply to get kJ)
    # weight per portion, eg 1kg
    # say we need 1000kJ, 1000 = (840*4.184)*portion_multiplier
    # portion_multiplier = 1000/(840*4.184)

    portion_multiplier = energy_needs/energy_given
    daily_serving = (portion_multiplier*food.weight, food.weight_unit)

    weight_feedback = f'You need to feed {pet.name} {daily_serving[0]} {daily_serving[1]} of {food.name} a day'
    portion_feedback = f'This equals {daily_serving[0]/food.weight_per_packet} {food.packet_type}(s)'

    return Response(
        {"plan": (weight_feedback, portion_feedback)},
        status=status.HTTP_200_OK
    )
