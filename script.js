document.addEventListener('DOMContentLoaded', function() {
    const previousOperandElement = document.getElementById('previous-operand');
    const currentOperandElement = document.getElementById('current-operand');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.buttons button:not(.number):not(#clear):not(#delete):not(#equals)');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const equalsButton = document.getElementById('equals');
    const decimalButton = document.getElementById('decimal');

    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let resetScreen = false;

    // Update the calculator display
    function updateDisplay() {
        currentOperandElement.textContent = currentOperand;
        if (operation != null) {
            previousOperandElement.textContent = `${previousOperand} ${operation}`;
        } else {
            previousOperandElement.textContent = previousOperand;
        }
    }

    // Append a number to the current operand
    function appendNumber(number) {
        if (currentOperand === '0' || resetScreen) {
            currentOperand = number;
            resetScreen = false;
        } else {
            currentOperand += number;
        }
    }

    // Add decimal point to the current operand
    function appendDecimal() {
        if (resetScreen) {
            currentOperand = '0.';
            resetScreen = false;
            return;
        }
        if (currentOperand.includes('.')) return;
        currentOperand += '.';
    }

    // Choose an operation
    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    // Compute the result
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        resetScreen = true;
    }

    // Clear the calculator
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    }

    // Delete the last digit
    function deleteNumber() {
        if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
    }

    // Handle keyboard input
    function handleKeyboardInput(e) {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            if (e.key === '.') {
                appendDecimal();
            } else {
                appendNumber(e.key);
            }
            updateDisplay();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            let op;
            switch (e.key) {
                case '*': op = '×'; break;
                case '/': op = '÷'; break;
                default: op = e.key;
            }
            chooseOperation(op);
            updateDisplay();
        } else if (e.key === 'Enter' || e.key === '=') {
            compute();
            updateDisplay();
        } else if (e.key === 'Escape') {
            clear();
            updateDisplay();
        } else if (e.key === 'Backspace') {
            deleteNumber();
            updateDisplay();
        }
    }

    // Event listeners for number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
            updateDisplay();
        });
    });

    // Event listeners for operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.textContent);
            updateDisplay();
        });
    });

    // Event listener for equals button
    equalsButton.addEventListener('click', () => {
        compute();
        updateDisplay();
    });

    // Event listener for clear button
    clearButton.addEventListener('click', () => {
        clear();
        updateDisplay();
    });

    // Event listener for delete button
    deleteButton.addEventListener('click', () => {
        deleteNumber();
        updateDisplay();
    });

    // Event listener for decimal button
    decimalButton.addEventListener('click', () => {
        appendDecimal();
        updateDisplay();
    });

    // Keyboard support
    window.addEventListener('keydown', handleKeyboardInput);

    // Initialize display
    updateDisplay();
});