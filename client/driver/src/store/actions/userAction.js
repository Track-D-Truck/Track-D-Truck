export function loginAccount(userData) {
    return ( dispatch, getState ) => {
        let url = ''
        fetch(url, {
            method: 'POST',
            data: userData
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'SET_LOGIN',
                data: userData
            })
            localStorage.setItem('access_token', 'data.access_token')
        })
        .catch(err => console.log(err))
    }
}