import datetime

#body_weight: kg
# returns daily energy needs in kJ

# TODO: get the right inputs
def calculate_cat_feeding(pet):
    weight = pet.weight
    if pet.weight_unit == pet.WEIGHT_UNITS[1]:
        weight *= 0.453592
    energy_base = None
    life_stage_factor = None
    age_months = (datetime.date(pet.dob) - datetime.date.today()).days/12

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
        if pet.neutered:
            energy_base  = 418 - 104
        else:
            energy_base  = 418

    return energy_base * weight**0.67 * life_stage_factor

def calculate_dog_feeding(pet):
    activity_level = None #fix this
    expected_weight = None #fix tihs
    weight = pet.weight
    if pet.weight_unit == pet.WEIGHT_UNITS[1]:
        weight *= 0.453592
    age_months = (datetime.date(pet.dob) - datetime.date.today()).days/12

    if (age_months > 12):
        life_stage_factor = None
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
