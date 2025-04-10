from django.contrib.auth.models import Group, User
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt


from feed_this_much.basic.serializers import GroupSerializer, UserSerializer, UserRegistrationSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

@csrf_exempt
@api_view(['POST', 'OPTIONS']) # make sure we only get POST request, user making request to change things.
def user_registration(request):
    serializer = UserRegistrationSerializer(data=request.data) # input registration data into serializer
    if serializer.is_valid():
        serializer.save() # validates data and calls on UserRegistrationSerializer.create()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def user_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'OPTIONS'])
def user_logout(request):
    # potentially, we can check status with if request.user.is_authenticated:
    logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
