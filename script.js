class Calculator {
    constructor(previousOutputTextElement, currentOutputTextElement) {
        this.previousOutputTextElement = previousOutputTextElement
        this.currentOutputTextElement = currentOutputTextElement
        this.clear()
    }

    clear() {
        this.currentOutput = ''
        this.previousOutput = ''
        this.operation = undefined
    }

    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOutput.includes('.')) return
        this.currentOutput = this.currentOutput.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOutput === '') return
        if (this.previousOutput !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOutput = this.currentOutput
        this.currentOutput = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOutput)
        const current = parseFloat(this.currentOutput)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOutput = computation
        this.operation = undefined
        this.previousOutput = ''
    }

    getDisplayNumber(number) {
        const strNumber = number.toString()
        const intDigits = parseFloat(strNumber.split('.')[0])
        const decimalDigits = strNumber.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.currentOutputTextElement.innerText =
            this.getDisplayNumber(this.currentOutput)
        if (this.operation != null) {
            this.previousOutputTextElement.innerText =
                `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
        } else {
            this.previousOutputTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOutputTextElement = document.querySelector('[data-previous-output]')
const currentOutputTextElement = document.querySelector('[data-current-output]')

const calculator = new Calculator(previousOutputTextElement, currentOutputTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})