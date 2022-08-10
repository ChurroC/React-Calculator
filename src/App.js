import { useReducer } from 'react'
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import styles from './style.module.css'

function reducer(state, { type, payload: { digit, operation } }) {
    switch (type) {
        case 'ADD_DIGIT':
            if (digit === '0' && state.currentOperand === '0') return state
            if (digit === '.' && state.currentOperand.includes('.')) return state
            return { ...state, currentOperand: `${state.currentOperand || ''}${digit}` }
        case 'CHOOSE_OPERATION':
            if (state.currentOperand === null && state.currentOperand === null) return state
            console.log(state)
            if (state.currentOperand === null) {console.log('ef')
                 return { ...state, operation }
            }
            if (state.previousOperand === '' || state.previousOperand === undefined) {
                return {
                    ...state,
                    operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }
            return {
                ...state,
                operation,
                previousOperand: evaluate(state),
                currentOperand: null
            }
        case 'CLEAR':
            console.log('ji')
            return {}
        case 'DELETE_DIGIT':
            return { ...state, currentOperand: '', previousOperand: '', operation: '' }
        case 'EVALUATE':
            return { ...state, currentOperand: '', previousOperand: '', operation: '' }
        default:
            return state
    }
}

function evaluate({ previousOperand, currentOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const curr = parseFloat(currentOperand)
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
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
    console.log(currentOperand)
    return (
        <div className={styles['calculator-grid']}>
            <div className={styles.output}>
                <div className={styles['previous-operand']}>{previousOperand} {operation}</div>
                <div className={styles['current-operand']}>{currentOperand}</div>
            </div>

            <button className={styles['span-two']} onClick={() => dispatch({ type: 'CLEAR' })}>AC</button>
            <button>DEL</button>
            <OperationButton operation={'÷'} dispatch={dispatch}>÷</OperationButton>
            {['1', '2', '3'].map(digit => <DigitButton key={digit} digit={digit} dispatch={dispatch}>{digit}</DigitButton>)}
            <OperationButton operation={'*'} dispatch={dispatch}>*</OperationButton>
            {['4', '5', '6'].map(digit => <DigitButton key={digit} digit={digit} dispatch={dispatch}>{digit}</DigitButton>)}
            <OperationButton operation={'+'} dispatch={dispatch}>+</OperationButton>
            {['7', '8', '9'].map(digit => <DigitButton key={digit} digit={digit} dispatch={dispatch}>{digit}</DigitButton>)}
            <OperationButton operation={'-'} dispatch={dispatch}>-</OperationButton>
            {['.', '0'].map(digit => <DigitButton key={digit} digit={digit} dispatch={dispatch}>{digit}</DigitButton>)}
            <button className={styles['span-two']}>=</button>
        </div>
    )
}

export default App;
