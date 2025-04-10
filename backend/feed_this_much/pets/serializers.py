from rest_framework import serializers
from .models import Pet  # Import the Pet model

class PetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Pet
        fields = ['user', 'id', 'name', 'species', 'dob', 'current_weight', 'expected_weight', 'weight_unit', 'neutered', 'activity_level', 'condition_score']

    def validate(self, data):
        species = data.get('species', '').lower()
        activity_level = data.get('activity_level', '').lower()

        cat_levels = ['catlow', 'catmoderate', 'cathigh', 'catkitten']
        dog_levels = [
            'doglow', 'dogmoderatelow', 'dogmoderatehigh', 'doghigh', 'dogveryhigh'
        ]

        if species == 'cat' and activity_level not in cat_levels:
            raise serializers.ValidationError(
                {"activity_level": f"Invalid activity level for cat. Must be one of {cat_levels}"}
            )
        if species == 'dog' and activity_level not in dog_levels:
            raise serializers.ValidationError(
                {"activity_level": f"Invalid activity level for dog. Must be one of {dog_levels}"}
            )
        
        if species == 'dog' and data.get('expected_weight') is None:
            raise serializers.ValidationError(
                {"expected_weight": "Expected weight is required for dogs."}
            )

        return data