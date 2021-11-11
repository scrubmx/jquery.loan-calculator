jQuery(function ($) {
    window.variableInterest = function (value) {
        var InterestRate = ProductDefaults.rate;
        switch (true) {
            case (ProductDefaults.product == 'SAV'):
                InterestRate = 4.41;
                break;
            case (ProductDefaults.product == 'CON'):
                //9.38% APR
                InterestRate = 8.95;
                break;
            case (ProductDefaults.product == 'EMG'):
                    //9.38% APR
                    InterestRate = 24.97;
                break;
            case (ProductDefaults.product == 'BOS'):
            case (ProductDefaults.product == 'GRw'):
                //42.6% APR
                InterestRate = 36;
                break;
            case (value < 2499):
                //16.08% APR
                InterestRate = 14.95;
                break;
            case (value < 4999):
                //13.68% APR
                InterestRate = 12.89;
                break;
            case (value < 7499):
                //8.3% APR
                InterestRate = 8;
                break;
            case (value < 9999):
                //6.9% APR
                InterestRate = 6.69;
                break;
            case (value < 15001):
                //5.9% APR
                InterestRate = 5.75;
                break;
            case (value < 25001):
                //5.4% APR
                InterestRate = 5.3;
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