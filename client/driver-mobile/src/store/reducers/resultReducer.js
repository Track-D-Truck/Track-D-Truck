const initialState = {
    result: null
}

export function resultReducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_RESULT':
            console.log(action.data, "<<<< data dari action");
            return { ...state, result: action.data[0]}
        default:
            return state
    }    
}