# What is this?

Get perfec fitness diet macros and infos about how you can reach your goals just by passing an object.

# Installation

`npm i fit-calc --save`

Then...

```
import { fitCalc } from 'fit-calc';

fitCalc({
    gender: 'male',
    weight: 66,
    height: 168,
    age: 28,
    dailyActivityLevel: 1.55,
    bodyFatPercentage: 13,
    bodyType: 'meso',
    goal: 'mass-gain'
});
```

# Options

* *gender* - _male / female_
* *weight* - (kg)
* *height* - (cm)
* *age* - (years)
* *dailyActivityLevel* - 1.00 (sedentary) / 1.35 (normal desk job) / 1.45 (3x per week training + normal desk job) / 1.50 (3x per week training + active work) / 1.55 (athlete & bodybuilder (5 x per week training) +normal desk job) / 1.65 (athlete & bodybuilder (5 x per week training) + active work) / 1.75 (pro athlete (5+ per week training)) / 1.85 (Endurance athlete)
* *bodyFatPercentage* - (integer)
* *bodyType* - ectomorph / meso-ecto / meso / meso-endo / endo
* *goal* - mass-gain / fat-loss / maintenance 