from django.contrib.auth.models import User
from feed_this_much.pets.models import Pet

from django.db import models

class UserPlan(models.Model):

    WEIGHT_UNITS = [
        ('kg', 'kilograms'),
        ('lb', 'pounds'),
        ('g', 'grams'),
        ('oz', 'ounces')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null = False)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null = False)
    plan_title = models.CharField(max_length=255)
    food_name = models.CharField(max_length=255)
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
