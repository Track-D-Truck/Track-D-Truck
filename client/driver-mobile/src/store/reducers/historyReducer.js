const initialState = {
    histories: [],
    todayHistory: []
}

export function historyReducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_HISTORIES':
            return {
                ...state,
                histories: action.data
            }
        case 'UPDATE_TODAY_HISTORY':
            console.log(state.todayHistory, '<<< today history');
            return { 
                ...state,
                todayHistory: state.todayHistory.concat(action.location)}
        case 'UPDATE_HISTORIES':
            return {
                ...state,
                histories: state.histories.concat(action.data)
            }
        default:
            return state
    }    
}