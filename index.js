const optimalRatios = require('./optimalRatios.json');

// Reccomended fat loss goal per week [per unit]
function recommendedFatLossGoalPerWeek(options){
    if (options.gender === "male") {
        if(options.bodyFatPercentage > 12) {
            return 1.2;
        }else{
            if(options.bodyFatPercentage > 10){
                return 1;
            }else{
                if(options.bodyFatPercentage > 8){
                    return 0.8;
                }else{
                    if(options.bodyFatPercentage <= 8){
                        return 0.6;
                    }else{
                        return '';
                    }
                }
            }
        }
    } else if(options.gender === 'female'){
        if(options.bodyFatPercentage > 20) {
            return 1.2;
        }else{
            if(options.bodyFatPercentage > 17){
                return 1;
            }else{
                if(options.bodyFatPercentage > 15){
                    return 0.8;
                }else{
                    if(options.bodyFatPercentage <= 15){
                        return 0.6;
                    }else{
                        return 0;
                    }
                }
            }
        }
    }
}

//Recommended Course of action based on Body Fat and Goal		
function recommendedCourseOfAction (options){
    if(options.goal === 'mass-gain'){
        if(options.bodyFatPercentage > 9){
            return 'Fat loss recommended first';
        }else{
            return 'Lean bulk';
        }
    }else if(options.goal === 'fat-loss'){
        if(options.bodyFatPercentage > 9){
            return 'Standard diet';
        }else{
            return 'Carb cycling';
        }
    }else if(options.goal === 'maintenance'){
        return 'Standard diet';
    }else{
        return 'This type of goal is not an option. Please make sure that you write it correctly';
    }
}

function fitCalc (options) {
    var muscleGainPerMonth;
    var requiredCaloricIntake;

    //Muscle gain goal per month [lbs]
    if (options.gender === 'male')
        muscleGainPerMonth = 2.2;
    else    
        muscleGainPerMonth = 1;
        

    var LBM = options.weight * (100 - options.bodyFatPercentage) / 100;
    var BMR = 21.6 * LBM + 370.0;

    // maintenance caloric intake 
    var maintenanceCaloricIntake = BMR * options.dailyActivityLevel;

    //necessary monthly caloric excess
    var necesaryMonthlyCaloricExcess = muscleGainPerMonth * 1600;

    //necessary daily intake [cal] on perfect in out caloric measurments
    var perfectNecessaryDailyIntake = (necesaryMonthlyCaloricExcess / 30) + maintenanceCaloricIntake;

    //necessary daily intake [cal] with margin based on activity level
    var necessaryDailyIntakeBasedOnActivity = perfectNecessaryDailyIntake + (200 * options.dailyActivityLevel / 1.7);

    // daily caloric intake for fat loss goal
    var fatLossCaloricIntake = maintenanceCaloricIntake - (recommendedFatLossGoalPerWeek(options) * 7700) / 7;

    if(options.goal === 'mass-gain'){
        requiredCaloricIntake = necessaryDailyIntakeBasedOnActivity;
    }else if(options.goal === 'fat-loss'){
        requiredCaloricIntake = fatLossCaloricIntake;
    }else if(options.goal === 'maintenance'){
        requiredCaloricIntake = maintenanceCaloricIntake;
    }else{
        return 'This type of goal is not an option. Please make sure that you write it correctly';
    }

    // Mass gain per month
    var massGainPerMonth = '1-2 kg';

    // Fat loss per week
    var recommendedFatLoss = recommendedFatLossGoalPerWeek(options);

    // In case pof maintenance
    var noWeightChange = 'No weight change';

    var weightChange = options.goal === 'mass-gain' ? massGainPerMonth : (options.goal === 'fat-loss' ? recommendedFatLoss : noWeightChange);

    // Daily macros in gram
    var macros = {
        protein: parseInt((necessaryDailyIntakeBasedOnActivity * optimalRatios[options.bodyType].proteinRatio / 100) / 4),
        carbs: parseInt((necessaryDailyIntakeBasedOnActivity * optimalRatios[options.bodyType].carboHydrateRatio / 100) / 4),
        fat: parseInt((necessaryDailyIntakeBasedOnActivity * optimalRatios[options.bodyType].fatRatio / 100) / 9)
    }

    return {
        bmr: parseFloat(BMR.toFixed(2)),
        lbm: parseFloat(LBM.toFixed(2)),
        recommendedCourseOfAction: recommendedCourseOfAction(options),
        requiredCaloricIntake: parseFloat(requiredCaloricIntake.toFixed(2)),
        weightChange: weightChange,
        optimalRatios: optimalRatios[options.bodyType],
        macros: macros
    };
};

module.exports.fitCalc = fitCalc;
