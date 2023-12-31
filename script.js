const display = document.querySelector('.calculatorInput');
const operatorInp = document.querySelector('.operatorInp');
const firstInp = document.querySelector('.firstCountInp')
const keys = document.querySelector('.calculatorKeys');
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;





function updateDisplay() {
    display.value = displayValue;
    firstInp.value = firstValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if(element.classList.contains('operator')) {
        handleOperator(element.value);
        operatorInp.value = element.value;
        display.value = displayValue;
        if(operatorInp.value === '=') {
            firstInp.value = '';
        } else {
            firstInp.value = firstValue;
        }
        return;
    }

    if(element.classList.contains('equal-sign')) {
         firstInp.value = null;


        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')) {
  
        inputDecimal();
        updateDisplay();
        return;
    }



    if(element.classList.contains('clear')) {
        clear();
        updateDisplay(); 
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;

        firstValue = result;

    }
    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;

    } else {
        displayValue = displayValue === '0'? num: displayValue + num;

    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
}












