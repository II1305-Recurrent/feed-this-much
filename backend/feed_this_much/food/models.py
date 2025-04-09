from django.contrib.auth.models import User
from django.db import models

class UserFood(models.Model):
    WEIGHT_UNITS = [
        ('kg', 'kilograms'),
        ('lb', 'pounds'),
        ('g', 'grams'),
        ('oz', 'ounces')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    food_name = models.CharField(max_length=255)
    food_type = models.CharField(max_length=100, choices=[
        ('wet', 'Wet'),
        ('dry', 'Dry'),
    ])
    packet_type = models.CharField(max_length=100, choices=[
        ('tin', 'Tin'),
        ('sachet', 'Sachet'),
        ('carton', 'Carton'),
        ('scoop', 'scoop'),
    ])
    weight_per_packet = models.FloatField()
    weight_per_packet_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS, default='g') 
    energy= models.FloatField()  
    energy_unit = models.CharField(max_length=50, choices=[
        ('kj', 'kJ'),
        ('kcal', 'kcal'),
    ])
    weight = models.FloatField()
    weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS)  
    protein = models.FloatField()
    fat = models.FloatField()