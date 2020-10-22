import axios from '../../config/axios'

export function updatePosition(truckData, location) {
    let updatedData = {
        ...truckData,
        location
    }
    return ( dispatch, getState ) => {
        axios({
          url: `/trucks/${truckData.id}`,
          method: 'PUT',
          data: updatedData
        })
        .then(({data}) => {
            dispatch({
                type: 'UPDATE_POSITION',
                updatedData
            })
        })
        .catch(err => console.log(err))        
    }
}

export function setNextDestination(location) {
    return (dispatch, getState) => {
        if(location){
            dispatch({
                type: 'SET_NEXT_DESTINATION',
                location
            })
        }
    }    
}

export function resetPosition () {
    return (dispatch, getState) => {
        dispatch({
            type: 'RESET_POSITION',
            data: null
        })
    }
}