const initialState = {
    result: null
}

export function resultReducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_RESULT':
            console.log(action.item, '<<< masuk ke reducer');
            return { ...state, result: action.data[0]}
        case 'RESET_RESULT':
            console.log(action, "<<< dari reset result");
            return {...state, result: action.data}
        default:
            return state
    }    
}