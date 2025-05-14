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

from feed_this_much.pets.views import save_pet, get_pets, update_pet, delete_pet, get_pet_by_id
from feed_this_much.food.views import get_foods, save_food, delete_food

from feed_this_much.plan.views import generate_plan, get_plans, get_combined_plans_byid, get_combined_plans_all, delete_combined_plan

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
    path('api/get-pet/<int:id>/', get_pet_by_id, name='get_pet_by_id'),
    path('api/update-pet/<int:id>/', update_pet, name='update_pet'),
    path('api/generate-plan/', generate_plan, name='generate_plan'), # now creates combined plan type
    path('api/get-plans/', get_plans, name='get_plans'),
    #path('api/generate-combined-plans/', combined_plans_list_create, name='combined_plans_list'), # no longer valid
    path('api/get-combined-plans-byid/<int:id>/', get_combined_plans_byid, name='get_combined_plans_byid'),
    path('api/get-combined-plans-all/', get_combined_plans_all, name='get_combined_plans_all'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('docs/', SpectacularRedocView.as_view(url_name='schema'), name='docs'),
    path('api/get-foods/', get_foods, name='get_foods'),
    path('api/save-food/', save_food, name='save_food'),
    path('api/is-logged/', views.is_logged_in, name='is-logged'),
    path('api/get-user/', views.get_user_details, name='get-user'),
    path('api/delete-food/<int:food_id>/', delete_food, name='delete_food'),
    path('api/delete-pet/<int:pet_id>/', delete_pet, name='delete_pet'),
    path('api/delete-combined-plan/<int:id>/', delete_combined_plan, name='delete_combined_plan'),
    path('api/update-user-details/', views.update_user_details, name='update_user_details'),
]

