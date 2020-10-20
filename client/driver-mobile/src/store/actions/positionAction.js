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