import {appName} from '../config';
import firebase from 'firebase';
import {take, call, put, all} from 'redux-saga/effects'

/////////////////////CONSTANTS//////////////////////////////////

const initialState = {
    user: null,
    error: null,
    loading: false
};
export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

/////////////////////REDUCER//////////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {

        case SIGN_UP_REQUEST: 
            return {
                ...state,
                loading: true
            };

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user,
            };

        case SIGN_UP_ERROR:
            return {
                ...state,
                loading: false,
                error: error
            };

        default: 
            return state
    }
}

/////////////////////ACTIONS//////////////////////////////////

export function signUp(name, email) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {name, email}
    }
}

/////////////////////SAGAS//////////////////////////////////

export function * signUpSaga() {
    const auth = firebase.auth();

    while (true){
        const action = yield take(SIGN_UP_REQUEST);

        try {
            const authUser = yield call(
                [auth, auth.createUserWithEmailAndPassword],
                action.payload.name,
                action.payload.email
            );
            yield put({
                type: SIGN_UP_SUCCESS,
                payload: authUser
            });
        }catch (e) {
            yield put({
                type: SIGN_UP_ERROR,
                e
            });
        }
    }
}


export function * saga () {
    yield all([
        signUpSaga()
    ]);
}