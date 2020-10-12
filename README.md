# What is this?

Get perfect fitness diet macros and infos about how you can reach your goals just by passing an object.

# Installation

`npm i fitcalc --save`

Then...

```
import { fitCalc } from 'fitcalc';
or
const fitCalc = require('fitcalc').fitCalc;

fitCalc({
    gender: 'male',
    weight: 70,
    height: 170,
    age: 28,
    dailyActivityLevel: 1.55,
    bodyFatPercentage: 13,
    bodyType: 'meso',
    goal: 'mass-gain'
});


Example of response:
{
  bmr: 1685.44,
  lbm: 60.9,
  recommendedCourseOfAction: 'Fat loss recommended first',
  requiredCaloricIntake: 2912.12,
  weightChange: '1-2 kg',
  optimalRatios: { proteinRatio: 40, carboHydrateRatio: 40, fatRatio: 20 },
  macros: { protein: 291, carbs: 291, fat: 64 }
}
```

# Options

* *gender* - _male / female_
* *weight* - (kg)
* *height* - (cm)
* *age* - (years)
* *dailyActivityLevel* - 
                        1.00 (sedentary)
                        1.35 (normal desk job)
                        1.45 (3x per week training + normal desk job)
                        1.50 (3x per week training + active work)
                        1.55 (athlete & bodybuilder (5 x per week training) +normal desk job)
                        1.65 (athlete & bodybuilder (5 x per week training) + active work)
                        1.75 (pro athlete (5+ per week training))
                        1.85 (Endurance athlete)
* *bodyFatPercentage* - (integer)
* *bodyType* - ectomorph / meso-ecto / meso / meso-endo / endo
* *goal* - mass-gain / fat-loss / maintenance 