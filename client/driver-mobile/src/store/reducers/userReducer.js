const initialState = {
    id: null,
    name: null,
    access_token: null,
    isLogin: false
}

export function userReducer (state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGIN':
            return { 
                ...state,
                id: action.data.id,
                name: action.data.name,
                isLogin: true
            }
        default:
            return state
    }    
}