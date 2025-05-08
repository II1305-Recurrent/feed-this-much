from django.contrib.auth.models import User
from feed_this_much.pets.models import Pet
from feed_this_much.food.models import UserFood

from django.db import models

class FoodName(models.Model):
    name = models.CharField(max_length=255)

class UserPlan(models.Model):

    WEIGHT_UNITS = [
        ('kg', 'kilograms'),
        ('lb', 'pounds'),
        ('g', 'grams'),
        ('oz', 'ounces')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=False)
    foods = models.ManyToManyField(UserFood, blank=False)
    pet_name = models.CharField(max_length=255)
    food_names = models.ManyToManyField(FoodName, blank=False)
    plan_title = models.CharField(max_length=255)
    food_serving_type = models.CharField(max_length=100, choices=[
        ('tin', 'Tin'),
        ('sachet', 'Sachet'),
        ('carton', 'Carton'),
        ('scoop', 'scoop'),
    ])
    daily_energy_needs = models.FloatField()
    daily_food_weight = models.FloatField()
    daily_food_weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS)
    daily_servings_amount = models.FloatField()
