import {appName} from '../config';
import firebase from 'firebase';
import {take, call, put, all, takeEvery} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga'
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
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;

export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${appName}/${moduleName}/SIGN_OUT_ERROR`;

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

export function* signUpSaga() {
    const auth = firebase.auth();

    while (true) {
        const {payload} = yield take(SIGN_UP_REQUEST);
        try {
            const authUser = yield call([auth, auth.createUserWithEmailAndPassword], payload.email, payload.password);
            // yield put({
            //     type: SIGN_UP_SUCCESS,
            //     payload: authUser
            // });
            // yield put(push('/admin'))
        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                error
            });
        }
    }
}

export function* signOutSaga() {
    const auth = firebase.auth();

    try {
        yield call([auth, auth.signOut]);
    } catch (error) {
        yield put({
            type: SIGN_OUT_ERROR,
            error
        });
    }
}

const authSocket = () => eventChannel(emmit => firebase.auth().onAuthStateChanged(user => emmit({user})));

function * watchForFirebaseAuth() {
    const channel = yield call(authSocket);

    try {
        while (true) {
            const {user} = yield take(channel);
            console.log('result', user);
            if (user) {
                yield put({
                    type: SIGN_IN_SUCCESS,
                    payload: {user}
                });
            } else {
                yield put({
                    type: SIGN_OUT_SUCCESS
                });
                yield put(push('/auth/signin'))
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export function* signInSaga() {
    const auth = firebase.auth();

    while (true) {
        try {
            const action = yield take(SIGN_IN_REQUEST);
            const user = yield call(
                [auth, auth.signInWithEmailAndPassword],
                action.payload.email,
                action.payload.password,
            );
        } catch (error) {
            console.log(error);
        }

    }
}


export function* saga() {
    yield all([
        signUpSaga(),
        signInSaga(),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga),
        watchForFirebaseAuth(),
    ]);
}