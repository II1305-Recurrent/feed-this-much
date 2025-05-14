from rest_framework import serializers
from .models import UserPlan, CombinedPlan  

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlan
        fields = ['id', 'user', 'pet', 'food', 'food_name', 'pet_name', 'plan_title', 'food_serving_type', 'daily_energy_needs', 'daily_food_weight', 'daily_food_weight_unit', 'daily_servings_amount']

    def create(self, validated_data):
        return UserPlan.objects.create(**validated_data)

class CombinedPlanSerializer(serializers.ModelSerializer):
    # uses primary key - DO NOT CHANGE TO NESTED TYPE OR IT WILL ALL BREAK!
    plan_a = serializers.PrimaryKeyRelatedField(queryset=UserPlan.objects.all())
    plan_b = serializers.PrimaryKeyRelatedField(queryset=UserPlan.objects.all(), required=False, allow_null=True) # plan b is optional
    
    percentage_plan_a = serializers.FloatField(required=False)
    percentage_plan_b = serializers.FloatField(required=False)


    class Meta:
        model = CombinedPlan
        fields = ['id', 'user', 'pet', 'plan_a', 'plan_b', 'total_daily_energy', 'plan_title', 'created', 'percentage_plan_a', 'percentage_plan_b',]

