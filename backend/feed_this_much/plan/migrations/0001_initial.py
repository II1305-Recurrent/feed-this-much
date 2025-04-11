# Generated by Django 5.2 on 2025-04-11 11:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pets', '0004_rename_weight_pet_current_weight_pet_expected_weight_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plan_title', models.CharField(max_length=255)),
                ('food_name', models.CharField(max_length=255)),
                ('food_serving_type', models.CharField(choices=[('tin', 'Tin'), ('sachet', 'Sachet'), ('carton', 'Carton'), ('scoop', 'scoop')], max_length=100)),
                ('daily_energy_needs', models.FloatField()),
                ('daily_food_weight', models.FloatField()),
                ('daily_food_weight_unit', models.CharField(choices=[('kg', 'kilograms'), ('lb', 'pounds'), ('g', 'grams'), ('oz', 'ounces')], max_length=2)),
                ('daily_servings_amount', models.FloatField()),
                ('pet', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pets.pet')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
