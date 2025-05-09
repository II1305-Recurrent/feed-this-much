from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from feed_this_much.pets.models import Pet
from feed_this_much.food.models import UserFood
from feed_this_much.plan import calorie_calculator
from .serializers import PlanSerializer, CombinedPlanSerializer
from .models import UserPlan, CombinedPlan

@api_view(['POST', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def generate_plan(request): # GET AMOUNT OF FOODS (from food_id's), PERCENTAGES/PORTIONS, SPLIT_TYPE, portion_food_id
    pet = Pet.objects.filter(user=request.user, id=request.data['pet_id']).first()
    food = UserFood.objects.filter(user=request.user, id=request.data['food_id']).first() # Filter by userID, foodname CHANGE THIS? GET ALL REQUESTED FOODS?
    # ignore split_type, split_amount, split_food_id for now
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
    
    if not food:
        error_message = "No such food exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    if request.data['number_of_foods'] > 1: # check if second food exists, should do something further if it exists
        food2 = UserFood.objects.filter(user=request.user, id=request.data['food_id2']).first()
        if not food2:
            error_message = "No such food exists"
            return Response(
                {"error": error_message},
                status=status.HTTP_400_BAD_REQUEST
            )

    def calculate_for_food_ratios(food, percentage, energy_needs):
        # from the food, we get kJ per weight
        energy_needs *= percentage
        energy_given = food.energy
        if food.energy_unit == "kcal":
            energy_given *= 4.184
        
        # energy per portion weight, eg 840kcal (multiply to get kJ)
        # weight per portion, eg 1kg
        # say we need 1000kJ, 1000 = (840*4.184)*portion_multiplier
        # portion_multiplier = 1000/(840*4.184)

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

        return needed_food_weight, food_to_packet_ratio

    food_ratios = calculate_for_food_ratios(food, request.data.split_amount/100, energy_needs)

    plan_data = {
        "user": request.user.id,
        "pet": pet.id,
        "food": food.id,
        "pet_name": pet.name,
        "food_name": food.food_name,
        "plan_title": request.data['plan_title'],
        "food_serving_type": food.packet_type,
        "daily_energy_needs": energy_needs,
        "daily_food_weight": food_ratios[0],
        "daily_food_weight_unit": food.weight_unit,
        "daily_servings_amount": food_ratios[1]
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

@api_view(['GET', 'POST', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def combined_plans_list_create(request):
    if request.method == 'GET':
        qs = CombinedPlan.objects.filter(user=request.user)
        serializer = CombinedPlanSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    serializer = CombinedPlanSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def combined_plans_detail(request, id):
    try:
        cp = CombinedPlan.objects.get(id=id, user=request.user)
    except CombinedPlan.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CombinedPlanSerializer(cp)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = CombinedPlanSerializer(cp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        cp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
