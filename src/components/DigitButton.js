export default function digitButton({ dispatch, digit }) {
    return (
        <button
        onClick={() => dispatch({ type: 'ADD_DIGIT', payload: { digit }})}
        >
            {digit}
        </button>)
}