import {appName} from '../config';
import firebase from 'firebase';
import {take, call, put, all, cps, takeEvery} from 'redux-saga/effects';
import {push} from 'react-router-redux'

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

export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;

export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;

/////////////////////REDUCER//////////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {

        case SIGN_UP_REQUEST: 
            return {
                ...state,
                loading: true
            };

        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user,
            };

        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
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

export function signUp(email, password) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {email, password}
    }
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {email, password}
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_REQUEST,
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
                action.payload.email,
                action.payload.password
            );
            yield put({
                type: SIGN_UP_SUCCESS,
                payload: authUser
            });
        }catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                error
            });
        }
    }
}

export function * signInSaga() {
    const auth = firebase.auth();

    while (true) {
        try {
            const action = yield take(SIGN_IN_REQUEST);
            const user = yield call(
                [auth, auth.signInWithEmailAndPassword],
                action.payload.email,
                action.payload.password,
            );
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: user
            });
        }catch (error) {
            console.log(error);
        }

    }
}

export function * watchStatusChange() {
    const auth = firebase.auth();

    try {
        yield cps([auth, auth.onAuthStateChanged])
    }catch (user) {
        yield put({
            type: SIGN_IN_SUCCESS,
            payload: {user}
        });
    }
}

export function * signOutSaga() {
    const auth = firebase.auth();
    
    try {
        yield call([auth, auth.signOut]);
        yield put({
            type: SIGN_OUT_SUCCESS
        });
        yield put(push('/auth/signin'))
    }catch (e) {
        console.log(e);
    }


}


export function * saga () {
    yield all([
        signUpSaga(),
        watchStatusChange(),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga),
        signInSaga()
    ]);
}