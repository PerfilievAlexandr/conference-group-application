import {appName} from '../config';
import uniqid from 'uniqid';
import {put, takeEvery, call} from 'redux-saga/effects'


///////////////////constants///////////////////////////

export const moduleName = 'people';
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;
const initialState = {
    people: {}
};

///////////////////actions/////////////////////////////

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

///////////////////reducer/////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {
        case ADD_PERSON:
            return {...state.people, [payload.id]: payload};
        default:
            return state;
    }
}

//////////////////////sagas/////////////////////////////

export const addPersonSaga = function * (action) {
    const id = yield call(uniqid);

    yield put({
        type: ADD_PERSON,
        payload: {...action.payload, id}
    });
};

export function * saga() {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}