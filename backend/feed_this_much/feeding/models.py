from django.contrib.auth.models import User
from django.db import models

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