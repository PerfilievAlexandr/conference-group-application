import firebase from 'firebase';
import {
    signUpSaga,
    signInSaga,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS
} from './auth';
import {take, call, put} from 'redux-saga/effects';
import uniqid from 'uniqid';


describe('test auth duck', () => {

    const auth = firebase.auth();
    const error = new Error;
    const authData = {
        email: 'test123@mail.ru',
        password: '12345678'
    };
    const user = {
        email: authData.email,
        id: uniqid()
    };

   it('test sign up', () => {
       const saga = signUpSaga();
       const requestAction = {
           type: SIGN_UP_REQUEST,
           payload: authData
       };

       expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST));
       expect(saga.next(requestAction).value).toEqual(call([auth, auth.createUserWithEmailAndPassword], authData.email, authData.password));
       expect(saga.next(user).value).toEqual(put({type: SIGN_UP_SUCCESS, payload: user}));
       expect(saga.throw(error).value).toEqual(put({type: SIGN_UP_ERROR, error}))
   });

    it('test sign in', () => {
        const saga = signInSaga();
        const requestAction = {
            type: SIGN_IN_REQUEST,
            payload: authData
        };

        expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST));
        expect(saga.next(requestAction).value).toEqual(call([auth, auth.signInWithEmailAndPassword], authData.email, authData.password));
        expect(saga.next(user).value).toEqual(put({type: SIGN_IN_SUCCESS, payload: user}));
    });
});