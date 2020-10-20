import axios from '../../config/axios'
const _ = require('lodash')

export function fetchResult() {
    return ( dispatch, getState ) => {
        const driverId = getState().userReducer.id
        axios({
            url: '/optimations/test',
            method: 'GET'
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
            console.log(driverId, '<<< driver id');
        })
        .catch(err => console.log(err))
    }
}
