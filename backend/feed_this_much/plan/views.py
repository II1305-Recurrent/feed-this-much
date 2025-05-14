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
    food1 = UserFood.objects.filter(user=request.user, id=request.data['food_id']).first() # Filter by userID, foodname CHANGE THIS? GET ALL REQUESTED FOODS?
    food2 = None
    # sets food_id2 only if it is required i.e. not 0
    if request.data['food_id2'] != 0:
        food2 = UserFood.objects.filter(user=request.user, id=request.data['food_id2']).first()

    # CHECKS PET ID VALID
    if not pet:
        error_message = "No such pet exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # CALCULATES ENERGY NEEDS FROM PET DATA
    if pet.species == "cat":
        energy_needs = calorie_calculator.calculate_cat_feeding(pet)
    elif pet.species == "dog":
        energy_needs = calorie_calculator.calculate_dog_feeding(pet)
    
    # CHECKS FOOD ID VALID
    if not food1:
        error_message = "No such food exists"
        return Response(
            {"error": error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if request.data['number_of_foods'] > 1: # check if second food is needed, should do something further if it exists
        if not food2: # checks that second food id given is valid
            error_message = "No such food exists"
            return Response(
                {"error": error_message},
                status=status.HTTP_400_BAD_REQUEST
            )

    # A FUNCTION TO CALCULATE FOOD RATIOS 
    def calculate_for_food_ratios(food, percentage, energy_needs_calc):
        # from the food, we get kJ per weight
        energy_needs_calc *= percentage
        energy_given = food.energy
        if food.energy_unit == "kcal":
            energy_given *= 4.184
        
        # energy per portion weight, eg 840kcal (multiply to get kJ)
        # weight per portion, eg 1kg
        # say we need 1000kJ, 1000 = (840*4.184)*portion_multiplier
        # portion_multiplier = 1000/(840*4.184)

        food_to_packet_ratio = 0
        
        portion_multiplier = energy_needs_calc/energy_given # calculates how much of the food weight we need, calculate by percentage
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
    # END OF CALCULATE FOOD RATIO FUNCTION

    # CASE WHERE ONLY ONE FOOD
    if request.data['number_of_foods'] == 1:
        food_ratios = calculate_for_food_ratios(food1, 1, energy_needs)
        
        plan_data = {
        "user": request.user.id,
        "pet": pet.id,
        "food": food1.id,
        "pet_name": pet.name,
        "food_name": food1.food_name,
        "plan_title": request.data['plan_title'],
        "food_serving_type": food1.packet_type,
        "daily_energy_needs": energy_needs,
        "daily_food_weight": food_ratios[0],
        "daily_food_weight_unit": food1.weight_unit,
        "daily_servings_amount": food_ratios[1]
        }
        
        serializer = PlanSerializer(data=plan_data)
        plan1 = None
        
        if serializer.is_valid():
            plan1 = serializer.save()
            print("Plan created!")
            # CREATE A COMBINED PLAN FOR A SINGLE FOOD
            combined_data = {
                "user": request.user.id,
                "pet": pet.id,
                "plan_a": plan1.id,
                "total_daily_energy": energy_needs,
                "plan_title": request.data['plan_title']
            }
            print("Combined Data Being Submitted:", combined_data) # debug
            
            # Call the helper function to save the combined plan
            response_data = save_combined_plan(combined_data)
            #Response Check
            if isinstance(response_data, dict):
                return Response(response_data, status=status.HTTP_201_CREATED)
            else: 
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)         
        else: 
            print(serializer.errors)  # DEBUG
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # End of one food case logic
        
    # CASE WHERE TWO FOODS
    if request.data['number_of_foods'] > 1:
        # Checks food 2 is valid id
        if food2 is None:
            return Response(
                {"error": "Second food (food_id2) is required when number_of_foods is 2."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # HANDLE FOR FIXED SERVINGS SPLIT
        if request.data['split_food_id'] > 0:
            # set which food is the one with the fixed portions
            if request.data['split_food_id'] == food1.id:
                fixed_food = food1
                other_food = food2
            else:
                fixed_food = food2
                other_food = food1

            # Step 1: Calculate the energy covered by the fixed servings
            fixed_servings = request.data['fixed_servings']
            if fixed_servings is None:
                return Response({"error": "Fixed servings must be provided when using fixed portion split."},
                    status=status.HTTP_400_BAD_REQUEST)

            energy_for_fixed_food = fixed_servings * fixed_food.energy  # KJ by default
            if fixed_food.energy_unit == "kcal":
                energy_for_fixed_food *= 4.184  # Convert kcal to kJ

            # Step 2: Subtract energy for fixed food from total daily energy
            remaining_energy = energy_needs - energy_for_fixed_food

            # Step 3: Calculate the other food's weight and servings based on remaining energy
            food_ratios = calculate_for_food_ratios(other_food, remaining_energy / energy_needs, remaining_energy) # check calculation

            # Create the first plan (fixed food plan)
            plan_data1 = {
                "user": request.user.id,
                "pet": pet.id,
                "food": fixed_food.id,
                "pet_name": pet.name,
                "food_name": fixed_food.food_name,
                "plan_title": request.data['plan_title'],
                "food_serving_type": fixed_food.packet_type,
                "daily_energy_needs": energy_for_fixed_food,
                "daily_food_weight": fixed_servings * fixed_food.weight,
                "daily_food_weight_unit": fixed_food.weight_unit,
                "daily_servings_amount": fixed_servings
            }

            serializer1 = PlanSerializer(data=plan_data1)
            if serializer1.is_valid():
                plan1 = serializer1.save()
            else:
                print(serializer.errors)  # DEBUG
                return Response(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the second plan (the other food, calculated)
            plan_data2 = {
                "user": request.user.id,
                "pet": pet.id,
                "food": other_food.id,
                "pet_name": pet.name,
                "food_name": other_food.food_name,
                "plan_title": request.data['plan_title'],
                "food_serving_type": other_food.packet_type,
                "daily_energy_needs": remaining_energy,
                "daily_food_weight": food_ratios[0],
                "daily_food_weight_unit": other_food.weight_unit,
                "daily_servings_amount": food_ratios[1]
            }

            serializer2 = PlanSerializer(data=plan_data2)
            if serializer2.is_valid():
                plan2 = serializer2.save()
            else:
                print(serializer.errors)  # DEBUG
                return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the combined plan
            combined_data = {
                "user": request.user.id,
                "pet": pet.id,
                "plan_a": plan1.id,
                "plan_b": plan2.id,
                "total_daily_energy": energy_needs,
                "plan_title": request.data['plan_title']
            }
            print("Combined Data Being Submitted:", combined_data) # debug

            # Call the helper function to save the combined plan
            response_data = save_combined_plan(combined_data)
            #Response Check
            if isinstance(response_data, dict):
                return Response(response_data, status=status.HTTP_201_CREATED)
            else: 
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)         
        # end of fixed serving split logic

        # HANDLE FOR PERCENTAGE SPLIT
        else:
            # Step 1: calculate for food 1 (percentage set by split_amount)
            food_ratios1 = calculate_for_food_ratios(food1, request.data['split_amount'] / 100, energy_needs)
            plan_data1 = {
                "user": request.user.id,
                "pet": pet.id,
                "food": food1.id,
                "pet_name": pet.name,
                "food_name": food1.food_name,
                "plan_title": request.data['plan_title'],
                "food_serving_type": food1.packet_type,
                "daily_energy_needs": energy_needs,
                "daily_food_weight": food_ratios1[0],
                "daily_food_weight_unit": food1.weight_unit,
                "daily_servings_amount": food_ratios1[1]
            }
            serializer1 = PlanSerializer(data=plan_data1)
            if serializer1.is_valid():
                plan1 = serializer1.save()
            else:
                print(serializer.errors)  # DEBUG
                return Response(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Step 2: calculate for food 2 (percentage set by 100 - split_amount)
            food_ratios2 = calculate_for_food_ratios(food2, (100 - request.data['split_amount']) / 100, energy_needs)
            plan_data2 = {
                "user": request.user.id,
                "pet": pet.id,
                "food": food2.id,
                "pet_name": pet.name,
                "food_name": food2.food_name,
                "plan_title": request.data['plan_title'],
                "food_serving_type": food2.packet_type,
                "daily_energy_needs": energy_needs,
                "daily_food_weight": food_ratios2[0],
                "daily_food_weight_unit": food2.weight_unit,
                "daily_servings_amount": food_ratios2[1]
            }
            serializer2 = PlanSerializer(data=plan_data2)
            if serializer2.is_valid():
                plan2 = serializer2.save()
            else:
                print(serializer.errors)  # DEBUG
                return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)
            
             # Create combined plan
            combined_data = {
                    "user": request.user.id,
                    "pet": pet.id,
                    "plan_a": plan1.id,
                    "plan_b": plan2.id,
                    "total_daily_energy": energy_needs,
                    "plan_title": request.data['plan_title']
                }
            print("Combined Data Being Submitted:", combined_data) #debug

            # Call the helper function to save the combined plan
            response_data = save_combined_plan(combined_data)
            #Response Check
            if isinstance(response_data, dict):
                return Response(response_data, status=status.HTTP_201_CREATED)
            else: 
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)        
        # End of percentage split logic

    #End of two food case logic
        
            
# original get plans api end point - gets all the individual plans, phase out once new combined plans working
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

# no longer needs to be an api, changed to helper function, as only used internally
def save_combined_plan(data):
    serializer = CombinedPlanSerializer(data=data)
    if serializer.is_valid():
        serializer.save()  # Save the combined plan
        return serializer.data  # Return the serialized data
    else:
        return serializer.errors  # Return any validation errors

# Get a specific plan by ID
@api_view(['GET', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def get_combined_plans_byid(request, id):

    try:
        combined_plan = CombinedPlan.objects.get(id=id, user=request.user)
    except CombinedPlan.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    # Extract combined plan data
    combined_plan_data = {
        'id': combined_plan.id,
        'plan_title': combined_plan.plan_title, # Plan Title
        'pet_name': combined_plan.pet.name,  # Pet's name
        'daily_energy_allowance': combined_plan.total_daily_energy,  # Pet's energy allowance
        'plans': []
    }

    # Function to extract plan a and plan b data
    def extract_plan_info(plan):
        return {
            "userplan_id": plan.id,
            "food_name": plan.food_name,
            "food_serving_type": plan.food_serving_type,
            "daily_food_weight": plan.daily_food_weight,
            "daily_food_weight_unit": plan.daily_food_weight_unit,
            "daily_servings_amount": plan.daily_servings_amount
        }

    # Handle plan_a
    if combined_plan.plan_a:
        combined_plan_data["plans"].append(extract_plan_info(combined_plan.plan_a))

    # Handle plan_b
    if combined_plan.plan_b:
        combined_plan_data["plans"].append(extract_plan_info(combined_plan.plan_b))

    # Return the combined plan data
    return Response(combined_plan_data, status=status.HTTP_200_OK)

# Get all the user's combined plans
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_combined_plans_all(request):
    
    # Fetch all combined plans for the authenticated user
    combined_plans = CombinedPlan.objects.filter(user=request.user)

    # Prepare a list to hold the response data
    response_data = []

    for combined_plan in combined_plans:
        # Extract combined plan data
        combined_plan_data = {
            'id': combined_plan.id,
            'plan_title': combined_plan.plan_title, # Plan Title
            'pet_name': combined_plan.pet.name,  # Pet's name
            'daily_energy_allowance': combined_plan.total_daily_energy,  # Pet's energy allowance
        }

        # Handle plan_a
        if combined_plan.plan_a:
            plan_a = combined_plan.plan_a
            combined_plan_data['plan_a_details'] = {
                'userplan_id': plan_a.id,
                'food_name': plan_a.food_name,
                'food_serving_type': plan_a.food_serving_type,
                'daily_food_weight': plan_a.daily_food_weight,
                'daily_food_weight_unit': plan_a.daily_food_weight_unit,
                'daily_servings_amount': plan_a.daily_servings_amount,
            }

        # Handle plan_b (if exists)
        if combined_plan.plan_b:
            plan_b = combined_plan.plan_b
            combined_plan_data['plan_b_details'] = {
                'userplan_id': plan_b.id,
                'food_name': plan_b.food_name,
                'food_serving_type': plan_b.food_serving_type,
                'daily_food_weight': plan_b.daily_food_weight,
                'daily_food_weight_unit': plan_b.daily_food_weight_unit,
                'daily_servings_amount': plan_b.daily_servings_amount,
            }

        # Add the combined plan data to the response list
        response_data.append(combined_plan_data)

    # Return the list of combined plans
    return Response(response_data, status=status.HTTP_200_OK)

# Delete a combined plan
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_combined_plan(request, id):

    try:
        plan = CombinedPlan.objects.get(id=id, user=request.user)
    except CombinedPlan.DoesNotExist:
        return Response(
            {"message": "Plan not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Store references to plan_a and plan_b before deleting the combined plan
    plan_a = plan.plan_a
    plan_b = plan.plan_b

    # Delete the combined plan
    plan.delete() 
    # note - should delete the plan a and plan b automatically because on_delete cascade set in model but not working

    # Explicitly delete plan_a and plan_b if they exist
    if plan_a:
        plan_a.delete()
    if plan_b:
        plan_b.delete()

    return Response({'msg': 'Plan deleted successfully'}, status=status.HTTP_200_OK)

