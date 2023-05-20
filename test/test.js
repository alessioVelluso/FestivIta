const { isExtraFestivoOrWeekend } = require('../FestivIta.js')

const test = {
    rightNow: isExtraFestivoOrWeekend(),
    randomSaturday: isExtraFestivoOrWeekend("2023-05-21"),
    randomSunday: isExtraFestivoOrWeekend("Sun May 22 2023"),
    pasqua2023: isExtraFestivoOrWeekend("2023/04/09"),
    pasquetta2023: isExtraFestivoOrWeekend(new Date("2023-04-10")),
    pasqua2024: isExtraFestivoOrWeekend("2024-03-31"),
    pasquetta2024: isExtraFestivoOrWeekend("2023-04-01")
}

console.log(test)