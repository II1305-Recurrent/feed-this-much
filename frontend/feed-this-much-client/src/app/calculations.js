
//bodyWeight: kg
//-DailyEnergy: kJ

//cats
const neuteredOrIndoor = false
const catAgeMonths = undefined
let energyBase
let lifeStageFactor
let catWeight
if (catAgeMonths < 12) {
    energyBase = 314
    if (catAgeMonths < 4) {
        lifeStageFactor = 2.5
    } else if (catAgeMonths < 9) {
        lifeStageFactor = 2
    } else {
        lifeStageFactor = 1.5
    }
} else {
    lifeStageFactor = 1
}

energyBase = 314 + 104 * neuteredOrIndoor
//catWeight = catWeightLbs*0.453592
const catDailyEnergy = energyBase * catWeight**0.67 * lifeStageFactor

//dogs
const dogDailyEnergy = energyBase * bodyWeight**0.67 * lifeStageFactor