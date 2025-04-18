# Generated by Django 5.1.7 on 2025-04-09 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfood',
            name='weight_per_packet_unit',
            field=models.CharField(choices=[('kg', 'Kilograms'), ('lb', 'Pounds'), ('g', 'Grams')], max_length=2),
        ),
        migrations.AlterField(
            model_name='userfood',
            name='weight_unit',
            field=models.CharField(choices=[('kg', 'Kilograms'), ('lb', 'Pounds'), ('g', 'Grams')], max_length=2),
        ),
    ]
