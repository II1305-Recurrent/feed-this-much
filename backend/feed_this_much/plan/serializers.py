from rest_framework import serializers
from .models import UserPlan  

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlan
        # TODO: ADD ID TO FIELDS - done
        fields = ['id', 'user', 'pet', 'plan_title', 'food_name', 'food_serving_type', 'daily_energy_needs', 'daily_food_weight', 'daily_food_weight_unit', 'daily_servings_amount']