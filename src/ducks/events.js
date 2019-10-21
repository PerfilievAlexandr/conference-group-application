import {appName} from '../config';
import firebase from 'firebase';
import {take, call, put, all} from 'redux-saga/effects';
import {objectToArrayNormolizer, idInObjectValue} from './utils';
import {createSelector} from 'reselect';

/////////////////////CONSTANTS//////////////////////////////////

const initialState = {
    entities: null,
    loading: false,
    loaded: false,
};
export const moduleName = 'events';

export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`;

/////////////////////REDUCER//////////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {

        case FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                entities: idInObjectValue(payload),
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