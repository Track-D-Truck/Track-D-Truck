import axios from '../../config/axios'
const _ = require('lodash')

export function fetchResult() {
    return ( dispatch, getState ) => {
        const driverId = getState().userReducer.id
        const access_token = getState().userReducer.access_token
        axios({
            url: '/optimations/test',
            method: 'GET',
            headers: {
              access_token
            }
        })
        .then(({data}) => {
            dispatch({
                type: 'FETCH_RESULT',
                data: _.filter(data.BEST.bestSchema, {
                    truck: {
                      Driver: {
                        id: driverId
                      }
                    }
                  })
            })
        })
        .catch(err => console.log(err))
    }
}
