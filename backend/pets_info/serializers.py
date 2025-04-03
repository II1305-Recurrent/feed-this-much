from rest_framework import serializers
from .models import Pet  # Import the Pet model

class PetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Pet
        fields = ['id', 'name', 'species', 'dob', 'weight', 'weight_unit', 'neutered', 'activity_level', 'condition_score']
       