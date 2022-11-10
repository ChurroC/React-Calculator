import { useReducer } from 'react'
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import styles from './style.module.css'

function reducer(state, { type, payload }) {
    switch (type) {
        case 'ADD_DIGIT':
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: payload.digit,
                    answer: `Ans = ${state.currentOperand}`,
                }
            }
            if (payload.digit === '0' && state.currentOperand === '0')
                return state
            if (
                payload.digit === '.' &&
                (state.currentOperand
                    ? state.currentOperand.includes('.')
                    : false)
            )
                return state
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`,
            }
        case 'CHOOSE_OPERATION':
            if (state.currentOperand == null && state.previousOperand == null)
                return state
            if (state.currentOperand == null)
                return { ...state, operation: payload.operation }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                    overwrite: false,
                    answer: null,
                }
            }
            return {
                ...state,
                operation: payload.operation,
                previousOperand: evaluate(state),
                currentOperand: null,
            }
        case 'CLEAR':
            return {}
        case 'DELETE_DIGIT':
            if (state.overwrite) return {}
            if (state.currentOperand == null) return state
            if (state.currentOperand.length === 1)
                return { ...state, currentOperand: '0' }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }
        case 'EVALUATE':
            if (
                state.currentOperand == null ||
                state.previousOperand == null ||
                state.operation == null
            )
                return state

            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                currentOperand: evaluate(state),
                operation: null,
            }
        default:
            return state
    }
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})
function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.toString().split('.')
    if (decimal == null) return INTEGER_FORMATTER.format(operand)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function evaluate({ previousOperand, currentOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const curr = parseFloat(currentOperand)
    console.log(prev, curr, operation)
    if (isNaN(prev) || isNaN(curr)) return ''
    switch (operation) {
        case '+':
            return (prev + curr).toString()
        case '-':
            return (prev - curr).toString()
        case '*':
            return (prev * curr).toString()
        case '÷':
            return (prev / curr).toString()
        default:
            return ''
    }
}

function App() {
    const [{ currentOperand, previousOperand, operation, answer }, dispatch] =
        useReducer(reducer, {})

    return (
        <div className={styles['calculator-grid']}>
            <div className={styles.output}>
                <div className={styles['previous-operand']}>
                    {answer}
                    {formatOperand(previousOperand)} {operation}
                </div>
                <div className={styles['current-operand']}>
                    {formatOperand(currentOperand)}
                </div>
            </div>

            <button
                className={styles['span-two']}
                onClick={() => dispatch({ type: 'CLEAR' })}
            >
                AC
            </button>
            <button onClick={() => dispatch({ type: 'DELETE_DIGIT' })}>
                DEL
            </button>
            <OperationButton operation={'÷'} dispatch={dispatch}>
                ÷
            </OperationButton>
            {['1', '2', '3'].map((digit) => (
                <DigitButton key={digit} digit={digit} dispatch={dispatch}>
                    {digit}
                </DigitButton>
            ))}
            <OperationButton operation={'*'} dispatch={dispatch}>
                *
            </OperationButton>
            {['4', '5', '6'].map((digit) => (
                <DigitButton key={digit} digit={digit} dispatch={dispatch}>
                    {digit}
                </DigitButton>
            ))}
            <OperationButton operation={'+'} dispatch={dispatch}>
                +
            </OperationButton>
            {['7', '8', '9'].map((digit) => (
                <DigitButton key={digit} digit={digit} dispatch={dispatch}>
                    {digit}
                </DigitButton>
            ))}
            <OperationButton operation={'-'} dispatch={dispatch}>
                -
            </OperationButton>
            {['.', '0'].map((digit) => (
                <DigitButton key={digit} digit={digit} dispatch={dispatch}>
                    {digit}
                </DigitButton>
            ))}
            <button
                className={styles['span-two']}
                onClick={() => dispatch({ type: 'EVALUATE' })}
            >
                =
            </button>
        </div>
    )
}

export default App
