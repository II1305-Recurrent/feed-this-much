from django.contrib.auth.models import User
from django.db import models

class Pet(models.Model):
    WEIGHT_UNITS = [
        ('kg', 'Kilograms'),
        ('lb', 'Pounds'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=100)
    dob = models.DateField()  
    weight = models.FloatField()  
    weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS)  
    neutered = models.BooleanField()
    activity_level = models.CharField(max_length=100, choices=[
        ('low', 'Low'),
        ('moderate-low', 'Moderate Low'),
        ('moderate-high', 'Moderate High'),
        ('high', 'High'),
        ('very-high', 'Very High')
    ], default='low')
    
    condition_score = models.CharField(max_length=100, choices=[
        ('severely-underweight', 'Severely Underweight'),
        ('underweight', 'Underweight'),
        ('ideal', 'Ideal'),
        ('overweight', 'Overweight'),
        ('obese', 'Obese')
    ], default='ideal')

    def __str__(self):
        return f"{self.name} ({self.species})"
