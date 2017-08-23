//for generating random operands
function generateRandomOperands() {
    //pick two integers between 0 and 100
    let number1 = Math.floor(Math.random() * (100 - 0) + 0);
    let number2 = Math.floor(Math.random() * (100 - 0) + 0);
    return {
        random1: number1,
        random2: number2
    }
}

//for generating the operator
function chooseOperator() {
    let operators = ['+', '-', '*', '/', '%'];
    //to select a random operator
    let index = Math.floor(Math.random() * (5 - 0) + 0);
    return operators[index];
}
//to round the given number to two decimal place
function roundToTwoDecPlace(res) {
    return Math.round((res) * 100) / 100;
}
//for calculating math results
function mathGame(callback) {
    let selectedOperator = chooseOperator();
    let operands = generateRandomOperands();

    switch (selectedOperator) {
        case '+':
            result = roundToTwoDecPlace(operands.random1 + operands.random2);
            break;
        case '-':
            result = roundToTwoDecPlace(operands.random1 - operands.random2);
            break;
        case '*':
            result = roundToTwoDecPlace(operands.random1 * operands.random2);
            break;
        case '/':
            if (operands.random2 !== 0)
                result = roundToTwoDecPlace(operands.random1 / operands.random2);
            else
                result = NAN
            break;
        case '%':
            result = roundToTwoDecPlace(operands.random1 % operands.random2)
    }

    given = {
        operator: selectedOperator,
        number1: operands.random1,
        number2: operands.random2,
        givenResult: result
    };

    //execute a callback if there is
    if (arguments.length == 1)
        callback(given);
}
module.exports = mathGame;