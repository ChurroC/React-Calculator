export default function digitButton({ dispatch, operation }) {
    return (
        <button
        onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: { operation }})}
        >
            {operation}
        </button>)
}