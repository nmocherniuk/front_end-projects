//screen and buttons
const screenValue = document.querySelector('.value')
const buttons = document.querySelectorAll('.btn')
const cleanButton = document.querySelector('.btn-clean')

//for button lighting
const plus = document.querySelector('.btn-plus');
const minus = document.querySelector('.btn-minus');
const multiply = document.querySelector('.btn-multiply');
const devide = document.querySelector('.btn-devide');

//for calculation
let clickTimes = 0;
let firstValue = '';
let secondValue = '';
let result = '';
let symbolOperation = '';
let dought = false;
let availabilityZero = false;

//for solution of percent
const percent = () => {
    let variableForPercent = 0;
    variableForPercent = Number(screenValue.innerText) / 100;
    screenValue.innerText = variableForPercent;
}

//for negative sign
const plusOrMinus = () => {
    screenValue.innerText = '-' + screenValue.innerText;
    clickTimes++;
    if (clickTimes % 2 === 0)
        screenValue.innerText = screenValue.innerText.slice(2);
}

//for clear all data
const allClear = () => {
    screenValue.innerText = '0';
    firstValue = '';
    secondValue = '';
    result = '';
    dought = false;
    clickTimes = 0;
    screenValue.style.fontSize = '60px'
}

//for clear only given number
const clearPreviousNumber = () => {
    screenValue.innerText = '0';
    cleanButton.innerText = 'AC';
    clickTimes = 0;
    screenValue.style.fontSize = '60px'
    dought = false;
}

//for display view
const controledView = () => 
{
    if (screenValue.innerText.length < 6) {
        screenValue.style.fontSize = '60px';
    }
    else if (screenValue.innerText.length >= 6 && screenValue.innerText.length <= 7){
            
        screenValue.style.fontSize = '54px';
    }
    else if (screenValue.innerText.length >= 8 && screenValue.innerText.length < 11){
        screenValue.style.fontSize = '48px';
    }
    else if (screenValue.innerText.length >= 11 && screenValue.innerText.length < 12){
        screenValue.style.fontSize = '44px';
    }
    else if (screenValue.innerText.length >= 12 && screenValue.innerText.length < 16){
        screenValue.style.fontSize = '40px';
    }
    else {
        screenValue.style.fontSize = '26.5px';
    }
}

//for calculation after '=' click
const operation = (symbol, firstValue) => {
    secondValue = screenValue.innerText;
    firstValue = Number(firstValue);
    secondValue = Number(secondValue)
    switch (symbol) {
        case '+':
            result = firstValue + secondValue;
            break;
        case '-':
            result = firstValue - secondValue;
            break;
        case '×':
            result = firstValue * secondValue;
            break;
        case '÷':
            result = firstValue / secondValue;
            break;
    }
  
    screenValue.innerText = String(result);
}

//button light for specified operation
const buttonLight = (param) => {
    switch (param) {
        case '+':
           plus.style.backgroundColor = '#ffffff';
           plus.style.color = '#fca20d';
           minus.style.backgroundColor = '#fca20d';
           minus.style.color = '#ffffff';
           multiply.style.backgroundColor = '#fca20d';
           multiply.style.color = '#ffffff';
           devide.style.backgroundColor = '#fca20d';
           devide.style.color = '#ffffff';
            break;
        case '-':
            plus.style.backgroundColor = '#fca20d';
            plus.style.color = '#ffffff';
            minus.style.backgroundColor = '#ffffff';
            minus.style.color = '#fca20d';
            multiply.style.backgroundColor = '#fca20d';
            multiply.style.color = '#ffffff';
            devide.style.backgroundColor = '#fca20d';
            devide.style.color = '#ffffff';
            break;
        case '×':
            plus.style.backgroundColor = '#fca20d';
            plus.style.color = '#ffffff';
            minus.style.backgroundColor = '#fca20d';
            minus.style.color = '#ffffff';
            multiply.style.backgroundColor = '#ffffff';
            multiply.style.color = '#fca20d';
            devide.style.backgroundColor = '#fca20d';
            devide.style.color = '#ffffff';
            break;
        case '÷':
            plus.style.backgroundColor = '#fca20d';
            plus.style.color = '#ffffff';
            minus.style.backgroundColor = '#fca20d';
            minus.style.color = '#ffffff';
            multiply.style.backgroundColor = '#fca20d';
            multiply.style.color = '#ffffff';
            devide.style.backgroundColor = '#ffffff';
            devide.style.color = '#fca20d';
            break;
        default:
            plus.style.backgroundColor = '#fca20d';
            plus.style.color = '#ffffff';
            minus.style.backgroundColor = '#fca20d';
            minus.style.color = '#ffffff';
            multiply.style.backgroundColor = '#fca20d';
            multiply.style.color = '#ffffff';
            devide.style.backgroundColor = '#fca20d';
            devide.style.color = '#ffffff';
            break;
    }

}

//checking value of button
const checkingValue = (param) => {
    controledView()
    buttonLight(param.target.innerText)
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(param.target.innerText)) {
        if (screenValue.innerText.length > 8) return;
        screenValue.innerText += param.target.innerText; 
        if (screenValue.innerText !== '')
        {
            cleanButton.innerText = 'C';
        }
        if (screenValue.innerText[0] === '0')
        {
            if (screenValue.innerText[1] !== '.')
            {
                screenValue.innerText = screenValue.innerText.slice(1)
            }
        }
        else if(screenValue.innerText[0] === '-' && screenValue.innerText[1] === '0'){
            screenValue.innerText = screenValue.innerText.replace('0', '');
        }
    }
    else if(['÷', '×', '-', '+'].includes(param.target.innerText)){
        if(screenValue.innerText === '') return;
        else{
            symbolOperation = param.target.innerText;
            firstValue = screenValue.innerText;
            screenValue.innerText = '0';
            controledView();
            dought = false;

        }
    }
    else if(['.', 'AC', 'C', '+/-', '=', '%'].includes(param.target.innerText)) {
        switch (param.target.innerText) {
            case '=':
                if(firstValue === '') return;
                operation(symbolOperation, firstValue)
                controledView()
                break;
            case 'AC':
                allClear()
                break;
            case 'C': 
                if(screenValue.innerText === '') return;
                clearPreviousNumber();
               break;
            case '.':
                if(dought === false){
                    screenValue.innerText += '.';
                    dought = true;
                    break;
                }
                else{
                    return;
                }
            case '%':
                percent()
                controledView()
                break;
            case '+/-':
                plusOrMinus()
                break;
        }
    }
}

//event after click button
buttons.forEach(button =>{
    button.addEventListener('click', checkingValue) 
})
