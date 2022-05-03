jQuery(function ($) {
    window.variableInterest = function (value) {
        var InterestRate = ProductDefaults.rate;
        switch (true) {
            case (ProductDefaults.product == 'SAV'):
                InterestRate = 4.41;
                break;
            case (ProductDefaults.product == 'CON'):
                //Consolidation 16.5% APR
                InterestRate = 15.33;
                break;
            case (ProductDefaults.product == 'EMG'):
                    //9.38% APR
                    InterestRate = 24.97;
                break;
            case (ProductDefaults.product == 'BOS'):
            case (ProductDefaults.product == 'GRw'):
                //Booster and Growth - 42.6% APR
                InterestRate = 36;
                break;
            case (value < 2499):
                //Advantage - 19.5% APR
                InterestRate = 18;
                break;
            case (value < 4999):
                //Premier - 16.68% APR
                InterestRate = 15.46;
                break;
            case (value < 7499):
                //Select - 12.68% APR
                InterestRate = 11.97;
                break;
            case (value < 9999):
                //Gold - 9.2% APR
                InterestRate = 8.79;
                break;
            case (value < 15001):
                //Platinum - 7.4% APR
                InterestRate = 7.12;
                break;
            case (value < 25001):
                //Home Owner - 7% APR
                InterestRate = 6.74;
                break;
        }
        return InterestRate;
    };
    // Change time period based on amount
    window.variableTerm = function (value) {
        switch (true) {
            case (ProductDefaults.product == 'SAV'):
                MaxTerm = 120;
                MinTerm = 1;
                break;
            case (ProductDefaults.product == 'CON'):
                MaxTerm = 60;
                MinTerm = 6;
                break;
            case (ProductDefaults.product == 'BOOSTER'):
            case (ProductDefaults.product == 'GRW'):
                MaxTerm = 24;
                MinTerm = 3;
                break;
            case (value < 2499):
                MaxTerm = 36;
                MinTerm = 3;
                break;
            case (value < 4999):
                MaxTerm = 60;
                MinTerm = 3;
                break;
            case (value < 14999):
                MaxTerm = 60;
                MinTerm = 6;
                break;
            case (value < 25001):
                MaxTerm = 84;
                MinTerm = 12;
                break;
        }
        var Term = {
            min: MinTerm,
            max: MaxTerm
        };
        return Term;
    };
});