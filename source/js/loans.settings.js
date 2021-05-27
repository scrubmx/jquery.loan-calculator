jQuery(function ($) {
    // Change interest rates based on amount
    SaverLoan = $('#saver-loan');
    BoosterLoan = $('#booster-loan');
    CUOKLoan = $('#cuok');
    SalaryLoan = $('#salary');
    PersonalLoan = $('#personal-loan');
    window.variableInterest = function (value) {
        var InterestRate = ProductDefaults.rate;
        switch (true) {
        case (ProductDefaults.saver == 1):
            InterestRate = 4.41;
        break;
        case (SaverLoan.hasClass('active')):
            InterestRate = 4.41;
            break;
        case (BoosterLoan.hasClass('active')):
            InterestRate = 36;
            break;
        case (CUOKLoan.hasClass('active')):
            InterestRate = 36;
            break;
        case (value < 500 && !PersonalLoan.hasClass('active') && !SaverLoan.hasClass('active') && !SalaryLoan.hasClass('active')):
            InterestRate = 36;
            break;
        case (value < 5000):
            InterestRate = 12.89;
            break;
        case (value < 7500):
            InterestRate = 6.69;
            break;
        case (value < 15000):
            InterestRate = 5.75;
            break;
        case (value < 25000.1):
            InterestRate = 4.75;
            break;
        }
        return InterestRate;
    };
    // Change time period based on amount
    window.variableTerm = function (value) {
        switch (true) {
            case (ProductDefaults.saver == 1):
                MaxTerm = 84;
                MinTerm = 1;
            break;
        case (SaverLoan.hasClass('active')):
            MaxTerm = 84;
            MinTerm = 1;
            break;
        case (CUOKLoan.hasClass('active')):
            MaxTerm = 3;
            MinTerm = 1;
            break;
        case (BoosterLoan.hasClass('active')):
            MaxTerm = 24;
            MinTerm = 1;
            break;
        case (value < 500 && !PersonalLoan.hasClass('active') && !SaverLoan.hasClass('active') && !SalaryLoan.hasClass('active')):
        case (value < 500 && !PersonalLoan.hasClass('active') && !SaverLoan.hasClass('active') && !SalaryLoan.hasClass('active')):
            MaxTerm = 3;
            MinTerm = 1;
            break;
        case (value < 3001):
            MaxTerm = 36;
            MinTerm = 1;
            break;
        case (value < 15000):
            MaxTerm = 60;
            MinTerm = 1;
            break;
        case (value < 25001):
            MaxTerm = 84;
            MinTerm = 12;
            break;
        }
        var Term = {
            min: MinTerm
            , max: MaxTerm
        }
        return Term;
    }
});