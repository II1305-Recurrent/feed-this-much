from django.contrib.auth.models import User
from feed_this_much.pets.models import Pet
from feed_this_much.food.models import UserFood
from django.db import models

class UserPlan(models.Model):

    WEIGHT_UNITS = [
        ('kg', 'kilograms'),
        ('lb', 'pounds'),
        ('g', 'grams'),
        ('oz', 'ounces')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=False)
    food = models.ForeignKey(UserFood, on_delete=models.CASCADE, null=False)
    pet_name = models.CharField(max_length=255)
    food_name = models.CharField(max_length=255)
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

    # Snippet below used for debugging - django string thingy
    def __str__(self):
        return f"{self.plan_title} - {self.food_name}"

    
class CombinedPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    
    plan_a = models.ForeignKey(UserPlan, on_delete=models.CASCADE, related_name='combined_as_a')
    plan_b = models.ForeignKey(UserPlan, on_delete=models.CASCADE, related_name='combined_as_b', null=True, blank=True)  # Nullable for single food plan

    total_daily_energy = models.FloatField()
    plan_title = models.CharField(max_length=255, default="My Combined Plan")

    created = models.DateTimeField(auto_now_add=True)

    # Snippet below used for debugging - django string thingy
    def __str__(self):
        return f"Combined Plan for {self.pet.name} - {self.plan_title}"