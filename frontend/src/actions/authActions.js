
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_PENDING = 'LOGIN_PENDING';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const LoginAction = (email, password) => {
    const data = {email, password}
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return async (dispatch, getState) => {
        let data = await fetch('http://localhost:3000/login', requestOptions)
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.error('err', err)
        })
        if(data) {
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: LOGIN_SUCCESS, data})
            window.location.reload()
        } else {
            dispatch({type: LOGIN_FAILED})
        }
    }
}

export const SignUpAction = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return async (dispatch, getState) => {
        const data = await fetch('http://localhost:3000/signUp', requestOptions)
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })

        if(!data.errmsg){
            dispatch({type: SIGNUP_SUCCESS, data})
        } else{
            dispatch({type: SIGNUP_FAILED})
        }
    }
}