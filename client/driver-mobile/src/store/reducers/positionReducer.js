const initialState = {
    startPosition: {
        latitude: -6.86666,
        longitude: 107.60000
    },
    lastDestination: {
        latitude: -7.0015804,
        longitude: 107.9028182
    },
    currentPosition: {
        latitude: -6.86666,
        longitude: 107.60000
    },
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
        default:
            return state
    }    
}