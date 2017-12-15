import axios from 'axios';
import * as types from '../types';
import { FORMROOT } from '../config';


export function loginRequest(user) {
    return function (dispatch) {

        axios
            .post(`${FORMROOT}/login`, {
                username: user.username,
                password: user.password
            })
            .then((res) => {
                dispatch(loginSuccess(res));
            })
            .catch((err) => {
                dispatch(loginFailure({
                    successfulLogin: false,
                    error: err
                }));

            });
    };
}

export function loginFailure(payload) {
    return {
        type: types.LOGIN_FAILURE,
        payload: payload
    };
}

export function loginSuccess(payload) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: payload
    };
}