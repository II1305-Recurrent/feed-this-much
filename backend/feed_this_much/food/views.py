from django.shortcuts import render
from .models import UserFood
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import FoodSerializer 

@api_view(['POST'])
#@permission_classes([IsAuthenticated]) # User auth
def save_food(request):
    serializer = FoodSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)  # Save with userID
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_foods(request):
    food = UserFood.objects.filter(user=request.user) # Filter by userID
    if not food.exists():
        return Response(
            {"message": "No food yet!"},
            status=status.HTTP_200_OK # 200 OK even if no pets exist
        )
    serialized_data = FoodSerializer(food, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)
