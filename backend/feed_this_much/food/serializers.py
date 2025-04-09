from rest_framework import serializers
from .models import UserFood  # Import the Pet model

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFood
        fields = ['food_name', 'food_type', 'packet_type', 'energy', 'energy_unit', 'weight', 'weight_unit', 'weight_per_packet', 'weight_per_packet_unit', 'protein', 'fat']
       