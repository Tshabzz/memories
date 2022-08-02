import * as api from '../api';
import { AUTH } from '../constants/ActionTypes';
import swal from 'sweetalert';

export const signIn = (user) => async (dispatch) => {
    try {
        const { data } = await api.signIn(user);
        const result = data.result;
        const token = data.token;
        dispatch({
            type: AUTH,
            data: { result, token}
        });
        swal({
            title: "Signed In Successful!",
            icon: "success",
        });

    } catch (error) {
        swal({
            title: `${error}`,
            text: `${error.message}`,
            icon: "warning",
        });
    }
};

export const signUp = (user) => async(dispatch) => {

    try {
        const { data } = await api.signUp(user);
        const result = data.result;
        const token = data.token;
        dispatch({
            type: AUTH,
            data: { result,token }
        });
        swal({
            title: "Registered Successful!",
            icon: "success",
        });

    } catch (error) {
        swal({
            title: `${error}`,
            text: `${error.message}`,
            icon: "warning",
        });
    }
};