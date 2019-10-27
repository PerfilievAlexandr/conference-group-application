import {appName} from '../config';
import {put, takeEvery, call, all} from 'redux-saga/effects';
import firebase from 'firebase';
import {createSelector} from 'reselect';
import {idInObjectValue} from './utils'


///////////////////constants///////////////////////////

export const moduleName = 'people';
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const FETCH__ALL_PERSONS_REQUEST = `${appName}/${moduleName}/FETCH__ALL_PERSONS_REQUEST`;
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;
export const FETCH__ALL_PERSONS_SUCCESS = `${appName}/${moduleName}/FETCH__ALL_PERSONS_SUCCESS`;

const initialState = {
    people: {},
    loading: false,
    loaded: false
};

///////////////////actions/////////////////////////////

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export function fetchAllPersons() {
    return {
        type: FETCH__ALL_PERSONS_REQUEST
    }
}

///////////////////reducer/////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {
        case ADD_PERSON_REQUEST:
        case FETCH__ALL_PERSONS_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            };

        case FETCH__ALL_PERSONS_SUCCESS:
            return {
                ...state,
                people: idInObjectValue(payload),
                loading: false,
                loaded: true
            };

        case ADD_PERSON:
            return {
                ...state,
                people: {...state.people, [payload.id]: payload},
                loading: false,
                loaded: true
            };
        default:
            return state;
    }
}

//////////////////////selectors/////////////////////////////

export const stateSelector = (state) => state[moduleName];
export const peopleLoading = (state) => state[moduleName].loading;
export const peopleLoaded = (state) => state[moduleName].loaded;
export const peopleSelector = createSelector(stateSelector, state => state.people);
export const peopleSelectorArr = createSelector(peopleSelector, people => Object.values(people));

//////////////////////sagas/////////////////////////////

export const addPersonSaga = function* (action) {
    const peopleRef = firebase.database().ref('people');

    try {
        const ref = yield call([peopleRef, peopleRef.push], action.payload);
        yield put({
            type: ADD_PERSON,
            payload: {...action.payload, id: ref.key}
        })

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllPeopleSaga = function* (action) {
    const peopleRef = firebase.database().ref('people');

    try {
        const data = yield call([peopleRef, peopleRef.once], 'value');
        yield put({
            type: FETCH__ALL_PERSONS_SUCCESS,
            payload: data.val()
        });
    } catch (e) {
        console.error(e)
    }

};

export function* saga() {
    yield all([
        yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        yield takeEvery(FETCH__ALL_PERSONS_REQUEST, fetchAllPeopleSaga)
    ]);
}