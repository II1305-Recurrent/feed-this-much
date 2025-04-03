
//bodyWeight: kg
//-DailyEnergy: kJ

//cats
const neuteredOrIndoor = false
const catAgeMonths = undefined
let catEnergyBase
let catLifeStageFactor
let catWeight
if (catAgeMonths < 12) {
    catEnergyBase  = 314
    if (catAgeMonths < 4) {
        catLifeStageFactor = 2.5
    } else if (catAgeMonths < 9) {
        catLifeStageFactor = 2
    } else {
        catLifeStageFactor = 1.5
    }
} else {
    catLifeStageFactor = 1
    catEnergyBase  = 314 + 104 * neuteredOrIndoor
}
//catWeight = catWeightLbs*0.453592
const catDailyEnergy = catEnergyBase * catWeight**0.67 * lifeStageFactor

//dogs
const dogEnergyBase = activityBase * dogLifeStageFactor
const dogDailyEnergy = energyBase * bodyWeight**0.75