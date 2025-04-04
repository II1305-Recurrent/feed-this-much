
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

if (dogAgeMonths > 12) {
    const dogLifeStageFactor = [1.3, 1, 0.87]
    const dogActivityBase = [398, 460, 523, 680, 4395]
    const dogEnergyBase = dogActivityBase * dogLifeStageFactor
    const dogDailyEnergy = dogEnergyBase * dogWeight**0.75
} else if (dogAgeMonths > 2) {
    const dogDailyEnergy = 1063 * ((dogWeight**1.75)/expectedDogWeight)
} else {
    const dogDailyEnergy = 1050 * dogWeight
}