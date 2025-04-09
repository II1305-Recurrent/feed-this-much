from rest_framework import serializers
from .models import Pet  # Import the Pet model

class PetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Pet
        fields = ['user', 'id', 'name', 'species', 'dob', 'weight', 'weight_unit', 'neutered', 'activity_level', 'condition_score']
       
    def to_internal_value(self, data):
        data = data.copy()

        data['name'] = data.pop('petname', '')
        data['dob'] = data.pop('dateOfBirth', '')
        data['weight'] = data.pop('currentWeight', '')

        is_kg = data.pop('isKg', '').lower()
        data['weight_unit'] = 'kg' if 'k' in is_kg else 'lb'

        neutered = data.pop('neutered', '').lower()
        data['neutered'] = neutered in ['yes', 'true', '1']

        activity_map = ['low', 'moderate-low', 'moderate-high', 'high', 'very-high']
        activity_index = int(data.pop('activityLevel', 0))
        data['activity_level'] = activity_map[activity_index]

        condition_map = [
            'severely-underweight', 'underweight', 'ideal', 'overweight', 'obese'
        ]
        condition_index = int(data.pop('bodyConditionScore', 2))
        data['condition_score'] = condition_map[condition_index]

        return super().to_internal_value(data)