import datetime

#body_weight: kg
# returns daily energy needs in kJ

def calculate_cat_feeding(pet):
    weight = pet.current_weight
    if pet.weight_unit == pet.WEIGHT_UNITS[1]:
        weight *= 0.453592
    energy_base = None
    life_stage_factor = None
    #timestamp = int(datetime.datetime.combine(my_date, datetime.time()).timestamp())

    age_months = (datetime.date.today() - pet.dob).days/(365.25/12)

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
    expected_weight = pet.expected_weight
    weight = pet.current_weight
    if pet.weight_unit == pet.WEIGHT_UNITS[1]:
        weight *= 0.453592
        expected_weight *= 0.453592
    age_months = (datetime.date.today() - pet.dob).days / (365.25 / 12)

    if (age_months > 12):
        life_stage_factor = None
        activity_base = None
        if (age_months < 36):
            life_stage_factor = 1.3
        elif (age_months < 84):
            life_stage_factor = 1
        else:
            life_stage_factor = 0.87

        match pet.activity_level:
            case 'doglow':
                activity_base = 398
            case 'dogmoderatelow':
                activity_base = 460
            case 'dogmoderatehigh':
                activity_base = 523
            case 'doghigh':
                activity_base = 680
            case 'dogveryhigh':
                activity_base = 4395

        energy_base = activity_base * life_stage_factor
        return energy_base * weight**0.75
    elif (age_months > 2 and age_months < 12):
        return (1063-(565 * (weight/expected_weight)))*(weight**0.75)
    else:
        return 1050 * weight