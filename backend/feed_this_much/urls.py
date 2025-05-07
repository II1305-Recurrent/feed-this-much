"""
URL configuration for feed_this_much project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from django.contrib import admin
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from rest_framework import routers

from feed_this_much.basic import views
from feed_this_much.pets.views import save_pet, get_pets
from feed_this_much.food.views import get_foods, save_food

from feed_this_much.plan.views import generate_plan, get_plans

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/register/', views.user_registration, name='user-register'),
    path('api/login/', views.user_login, name='user-login'),
    path('api/logout/', views.user_logout, name='user-logout'),
    path('api/save-pet/', save_pet, name='save_pet'),
    path('api/get-pets/', get_pets, name='get_pets'),
    path('api/generate-plan/', generate_plan, name='generate_plan'),
    path('api/get-plans/', get_plans, name='get_plans'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('docs/', SpectacularRedocView.as_view(url_name='schema'), name='docs'),
    path('api/get-foods/', get_foods, name='get_foods'),
    path('api/save-food/', save_food, name='save_food'),
    path('api/is-logged/', views.is_logged_in, name='is-logged')
]
