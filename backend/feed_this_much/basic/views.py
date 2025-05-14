from django.contrib.auth.models import Group, User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from feed_this_much.basic.serializers import GroupSerializer, UserSerializer, UserRegistrationSerializer, UserDetailsSerializer


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

@ensure_csrf_cookie
@api_view(['GET', 'POST', 'OPTIONS'])
def user_registration(request):
    if request.method == 'GET' or request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    serializer = UserRegistrationSerializer(data=request.data) # input registration data into serializer
    if serializer.is_valid():
        serializer.save() # validates data and calls on UserRegistrationSerializer.create()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ensure_csrf_cookie
@api_view(['GET', 'POST', 'OPTIONS'])
def user_login(request):
    if request.method == 'GET' or request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'OPTIONS'])
@permission_classes([permissions.IsAuthenticated])
def user_logout(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

@api_view(['GET', 'OPTIONS'])
@permission_classes([permissions.IsAuthenticated])
def is_logged_in(request):
    return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'OPTIONS'])
@permission_classes([permissions.IsAuthenticated])
def get_user_details(request):
    user = User.objects.filter(id=request.user.id).first()
    serialized_data = UserDetailsSerializer(user)
    return Response(serialized_data.data, status=status.HTTP_200_OK)

@api_view(['PUT','OPTIONS'])
@permission_classes([permissions.IsAuthenticated])
def update_user_details(request): 
    try:
        user = User.objects.filter(id=request.user.id).first()
    except User.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    if "email" in request.data.keys():
        request.data["username"] = request.data["email"]
    serializer = UserDetailsSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
