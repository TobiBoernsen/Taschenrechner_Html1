let currentInput = '';
let currentOperation = null;
let previousInput = '';

function appendValue(value) {
    currentInput = currentInput.toString() + value.toString();
    updateDisplay();
}

function setOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}
function deleteCharacter() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    updateDisplay();
}
document.addEventListener('keydown', function(event) {
    if (event.key >= 0 && event.key <= 9) {  // Zahlen 0-9
        appendValue(event.key);
    } else if (event.key === '+') {
        setOperation('+');
    } else if (event.key === '-') {
        setOperation('-');
    } else if (event.key === '*') {
        setOperation('*');
    } else if (event.key === '/') {
        setOperation('/');
    } else if (event.key === 'Enter' || event.key === '=') {  // Enter oder =
        calculate();
    } else if (event.key === 'Backspace') {  // Backspace für Löschen
        deleteCharacter();
    } else if (event.key === 'Escape') {  // Escape für All Clear
        clearAll();
    }
});
