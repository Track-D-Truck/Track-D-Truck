export function fetchResult() {
    return ( dispatch, getState ) => {
        let url = 'http://localhost:3000/results'
        fetch(url, {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'SET_RESULT',
                data
            })
        })
        .catch(err => console.log(err))
    }
}