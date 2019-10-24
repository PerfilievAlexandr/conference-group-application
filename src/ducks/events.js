import {appName} from '../config';
import firebase from 'firebase';
import {take, call, put, all} from 'redux-saga/effects';
import {idInObjectValue, addUniqItemToArray} from './utils';
import {createSelector} from 'reselect';

/////////////////////CONSTANTS//////////////////////////////////

const initialState = {
    entities: null,
    loading: false,
    loaded: false,
    selected: [],
};
export const moduleName = 'events';

export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`;
export const SELECT_EVENT = `${appName}/${moduleName}/SELECT_EVENT`;

/////////////////////REDUCER//////////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {

        case FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                entities: idInObjectValue(payload),
            };
        case SELECT_EVENT:
            return {
                ...state,
                selected: addUniqItemToArray(state.selected, payload)
            };
        default:
            return state
    }
}

/////////////////////SELECTORS//////////////////////////////////

export const stateSelector = (state) => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const eventListSelector = createSelector(entitiesSelector, state => {
    return state && Object.values(state)
});


/////////////////////ACTIONS//////////////////////////////////

export function loadEvents() {
    return {
        type: FETCH_ALL_REQUEST,
    }
}

export function selectEvent(id) {
    return {
        type: SELECT_EVENT,
        payload: id
    }
}
/////////////////////SAGAS//////////////////////////////////

export function * loadEventsSaga() {

    while (true){
        yield take(FETCH_ALL_REQUEST);
        const ref = firebase.database().ref('events');
        try {
            const data = yield call([ref, ref.once], 'value');
            yield put({
                type: FETCH_ALL_SUCCESS,
                payload: data.val()
            });
        }catch (error) {
            console.error(error)
        }
    }
}

export function * saga () {
    yield all([
        loadEventsSaga()
    ]);
}