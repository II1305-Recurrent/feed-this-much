from rest_framework import serializers
from .models import UserPlan, CombinedPlan  

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlan
        fields = ['id', 'user', 'pet', 'food', 'food_name', 'pet_name', 'plan_title', 'food_serving_type', 'daily_energy_needs', 'daily_food_weight', 'daily_food_weight_unit', 'daily_servings_amount']

class CombinedPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombinedPlan
        fields = '__all__'
        read_only_fields = ('user', 'created')
