const initialState = {
    startPosition: {
        latitude: -6.891205299999999, 
        longitude: 107.6266582
    },
    lastDestination: {
        latitude: -7.020695399999999,
        longitude: 107.9047481
    },
    currentPosition: {
        latitude: -6.891205299999999, 
        longitude: 107.6266582
    },
    nextDestination: '',
    updatedPosition: []
}

export function positionReducer (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_POSITION':
            const splittedLocation = action.updatedData.location.split(', ')
            return { ...state,
                updatedPosition: state.updatedPosition.concat(action.updatedData.location),
                currentPosition: {
                    latitude: +splittedLocation[0],
                    longitude: +splittedLocation[1]
                }
            }
        case 'SET_NEXT_DESTINATION':
            return {
                ...state,
                nextDestination: action.location.address
            }
        case 'RESET_POSITION':
            return {
                ...state,
                currentPosition: state.startPosition,
                nextDestination: '',
                updatedPosition: []
            }
        default:
            return state
    }    
}