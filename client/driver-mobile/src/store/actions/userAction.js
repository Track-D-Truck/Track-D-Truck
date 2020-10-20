import axios from '../../config/axios'

export function loginAccount(userData) {
    return ( dispatch, getState ) => {
        axios({
            url: '/login',
            method: 'POST',
            data: userData
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_LOGIN',
                data
            })
        })
        .catch(err => console.log(err))
    }
}