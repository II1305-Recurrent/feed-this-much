from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet
from feed_this_much.food.models import UserFood
from feed_this_much.plan import calorie_calculator
from .serializers import PlanSerializer
from .models import UserPlan

@api_view(['POST', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def generate_plan(request): # GET AMOUNT OF FOODS (from food_id's), PERCENTAGES
    pet = Pet.objects.filter(user=request.user, id=request.data['pet_id']).first()
    food = UserFood.objects.filter(user=request.user, id=request.data['food_id']).first() # Filter by userID, foodname CHANGE THIS. GET ALL REQUESTED FOODS!!!
    energy_needs = None

    if not pet:
        error_message = "No such pet exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if pet.species == "cat":
        energy_needs = calorie_calculator.calculate_cat_feeding(pet)
    elif pet.species == "dog":
        energy_needs = calorie_calculator.calculate_dog_feeding(pet)
    
    # FOR LOOP FOR FOODS
    if not food:
        error_message = "No such food exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )

    # from the food, we get kJ per weight

    energy_given = food.energy
    if food.energy_unit == "kcal":
        energy_given *= 4.184
    
    # energy per portion weight, eg 840kcal (multiply to get kJ)
    # weight per portion, eg 1kg
    # say we need 1000kJ, 1000 = (840*4.184)*portion_multiplier
    # portion_multiplier = 1000/(840*4.184)

    ### MAKE THIS A FUNCTION, FOR EACH FOOD ENTER PERCENTAGE OF ENERGY NEEDS TO BE COVERED 
    food_to_packet_ratio = 0
    

    portion_multiplier = energy_needs/energy_given # calculates how much of the food weight we need, calculate by percentage
    needed_food_weight = portion_multiplier*food.weight
    
    #weight_per_packet_unit MUST BE weight_unit for calculations to work
    if food.weight_unit == food.WEIGHT_UNITS[0][0]: #kg
        if food.weight_per_packet_unit == food.WEIGHT_UNITS[0][0]: #same
            food_to_packet_ratio = needed_food_weight/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[1][0]: #turn into lb
            food_to_packet_ratio = (needed_food_weight*2.204623)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[2][0]: #turn into g
            food_to_packet_ratio = (needed_food_weight*1000)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[3][0]: #turn into oz
            food_to_packet_ratio = (needed_food_weight*35.27396)/food.weight_per_packet

    elif food.weight_unit == food.WEIGHT_UNITS[1][0]: #lb
        if food.weight_per_packet_unit == food.WEIGHT_UNITS[0][0]: #turn into kg
            food_to_packet_ratio = (needed_food_weight*0.453592)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[1][0]: #same
            food_to_packet_ratio = needed_food_weight/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[2][0]: #turn into g
            food_to_packet_ratio = (needed_food_weight*453.5924)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[3][0]: #turn into oz
            food_to_packet_ratio = (needed_food_weight*16)/food.weight_per_packet

    elif food.weight_unit == food.WEIGHT_UNITS[2][0]: #g NOT DONE
        if food.weight_per_packet_unit == food.WEIGHT_UNITS[0][0]: #turn into kg
            food_to_packet_ratio = (needed_food_weight*0.001)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[1][0]: #turn into lb
            food_to_packet_ratio = (needed_food_weight*0.002205)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[2][0]: #same
            food_to_packet_ratio = needed_food_weight/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[3][0]: #turn into oz
            food_to_packet_ratio = (needed_food_weight*0.035274)/food.weight_per_packet

    elif food.weight_unit == food.WEIGHT_UNITS[3][0]: #oz
        if food.weight_per_packet_unit == food.WEIGHT_UNITS[0][0]: #turn into kg
            food_to_packet_ratio = (needed_food_weight*0.02835)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[1][0]: #turn into lb
            food_to_packet_ratio = (needed_food_weight*0.0625)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[2][0]: #turn into g
            food_to_packet_ratio = (needed_food_weight*28.34952)/food.weight_per_packet
        elif food.weight_per_packet_unit == food.WEIGHT_UNITS[3][0]: #same
            food_to_packet_ratio = needed_food_weight/food.weight_per_packet

    ###

    plan_data = {
        "user": request.user.id,
        "pet": pet.id,
        "food": food.id, # UPDATE TO ARRAY OF FOODS
        "pet_name": pet.name,
        "food_name": food.food_name, # UPDATE TO ARRAY OF FOODS
        "plan_title": request.data['plan_title'],
        "food_serving_type": food.packet_type, # UPDATE TO ARRAY OF FOODS
        "daily_energy_needs": energy_needs,
        "daily_food_weight": needed_food_weight, # UPDATE TO ARRAY OF FOODS
        "daily_food_weight_unit": food.weight_unit, # UPDATE TO ARRAY OF FOODS
        "daily_servings_amount": food_to_packet_ratio # UPDATE TO ARRAY OF FOODS
    }

    serializer = PlanSerializer(data=plan_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else: 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def get_plans(request):
    plans = UserPlan.objects.filter(user=request.user) # Filter by userID
    if not plans.exists():
        return Response(
            {"message": "No plans yet!"},
            status=status.HTTP_200_OK # 200 OK even if no pets exist
        )
    serialized_data = PlanSerializer(plans, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)
