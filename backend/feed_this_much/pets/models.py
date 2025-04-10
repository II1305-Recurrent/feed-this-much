from django.contrib.auth.models import User
from django.db import models

class Pet(models.Model):
    WEIGHT_UNITS = [
        ('kg', 'Kilograms'),
        ('lb', 'Pounds'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True, blank=True)
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=100)
    dob = models.DateField()  
    current_weight = models.FloatField()  
    expected_weight = models.FloatField(null=True, blank=True)
    weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS, default='kg')  
    neutered = models.BooleanField()
    activity_level = models.CharField(max_length=100)  # Validated in serializer based on species
    
    condition_score = models.PositiveSmallIntegerField(choices=[
        (1, '1 - Severely Underweight'),
        (2, '2 - Underweight'),
        (3, '3 - Ideal'),
        (4, '4 - Overweight'),
        (5, '5 - Obese'),
    ], default=3)

    def __str__(self):
        return f"{self.name} ({self.species})"

class Food(models.Model):
    WEIGHT_UNITS = [
        ('kg', 'Kilograms'),
        ('lb', 'Pounds'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    name = models.CharField(max_length=255)
    weight = models.FloatField()  
    weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS)  

    def __str__(self):
        return f"{self.name} ({self.weight})"