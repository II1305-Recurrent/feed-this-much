from rest_framework import serializers
from .models import UserPlan  

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlan
        fields = ['id', 'user', 'pet', 'foods', 'food_names', 'pet_name', 'plan_title', 'food_serving_type', 'daily_energy_needs', 'daily_food_weight', 'daily_food_weight_unit', 'daily_servings_amount']
