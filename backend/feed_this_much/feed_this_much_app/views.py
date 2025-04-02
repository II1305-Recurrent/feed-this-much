from rest_framework.decorators import api_view
from .serializers import UserRegistrationSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST']) # make sure we only get POST request, user making request to change things.
def user_registration(request):
    serializer = UserRegistrationSerializer(data=request.data) # input registration data into serializer
    if serializer.is_valid():
        serializer.save() # validates data and calls on UserRegistrationSerializer.create()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)