
//bodyWeight: kg
//DailyEnergy: kJ

function calculateCatFeeding(ageMonths, neuteredOrIndoor, weight) { //neuteredOrIndoor: 1 if true, 0 if false
    let catEnergyBase
    let catLifeStageFactor
    if (ageMonths < 12) {
        catEnergyBase  = 314
        if (ageMonths < 4) {
            catLifeStageFactor = 2.5
        } else if (ageMonths < 9) {
            catLifeStageFactor = 2
        } else {
            catLifeStageFactor = 1.5
        }
    } else {
        catLifeStageFactor = 1
        catEnergyBase  = 418 - 104 * neuteredOrIndoor
    }
    return catEnergyBase * weight**0.67 * catLifeStageFactor
}

//dogs
function calculateDogFeeding(ageMonths, activityLevel, weight, expectedWeight) {
    if (ageMonths > 12) {
        let dogLifeStageFactor
        if (ageMonths < 36) {
            dogLifeStageFactor = 1.3
        } else if (ageMonths < 84) {
            dogLifeStageFactor = 1
        } else {
            dogLifeStageFactor = 0.87
        }
        const dogActivityBase = [398, 460, 523, 680, 4395]
        const dogEnergyBase = dogActivityBase[activityLevel] * dogLifeStageFactor
        return dogEnergyBase * weight**0.75
    } else if (ageMonths > 2) {
        return 1063 * ((weight**1.75)/expectedWeight)
    } else {
        return 1050 * weight
    }
}