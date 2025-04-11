from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet
from feed_this_much.food.models import UserFood
from feed_this_much.plan import calorie_calculator
from .serializers import PlanSerializer

@api_view(['POST', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def generate_plan(request):

    error_message = ""
    pet = Pet.objects.filter(user=request.user, name=request.data.get("pet_id")) # Filter by userID, petname
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

    plan_data = {
        "user": request.user,
        "pet": pet,
        "plan_title": request.data.get("plan_title"),
        "pet_name": pet.name,
        "food_name": food.food_name,
        "food_serving_type": food.packet_type,
        "daily_energy_needs": energy_needs,
        "daily_food_weight": daily_serving[0],
        "daily_food_weight_unit": daily_serving[1],
        "daily_servings_amount": daily_serving[0]/food.weight_per_packet
    }

    serializer = PlanSerializer(data=plan_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

