from rest_framework import serializers
from django.contrib.auth.models import User # import model that we use

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # makes sure password is not sent back with API response, and only stored
    
    class Meta:
        model = User
        filter = ['username', 'email', 'password']
    
    # Create our user based on Meta filters and model
    def create(self, validated_data): 
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data.get('email', ''),
            password = validated_data['password']
        )
        return user