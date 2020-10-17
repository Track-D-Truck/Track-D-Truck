const initialState = {
    name: null,
    isLogin: false
}

export function userReducer (state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, name: action.data.name, isLogin: true}
        default:
            return state
    }    
}