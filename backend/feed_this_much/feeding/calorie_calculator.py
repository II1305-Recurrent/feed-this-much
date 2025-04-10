#body_weight: kg
#daily_energy: kJ

def calculate_cat_feeding(age_months, neutered_or_indoor, weight): #neuteredOrIndoor: 1 if true, 0 if false
    energy_base = 0
    life_stage_factor = 0
    if (age_months < 12):
        energy_base  = 314
        if (age_months < 4):
            life_stage_factor = 2.5
        elif (age_months < 9):
            life_stage_factor = 2
        else:
            life_stage_factor = 1.5
    else:
        life_stage_factor = 1
        energy_base  = 418 - 104 * neutered_or_indoor

    return energy_base * weight**0.67 * life_stage_factor

def calculate_dog_feeding(age_months, activity_level, weight, expected_weight):
    if (age_months > 12):
        life_stage_factor = 0
        if (age_months < 36):
            life_stage_factor = 1.3
        elif (age_months < 84):
            life_stage_factor = 1
        else:
            life_stage_factor = 0.87
        activity_base = [398, 460, 523, 680, 4395]
        energy_base = activity_base[activity_level] * life_stage_factor
        return energy_base * weight**0.75
    elif (age_months > 2):
        return 1063 * ((weight**1.75)/expected_weight)
    else:
        return 1050 * weight
