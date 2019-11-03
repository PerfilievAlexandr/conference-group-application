import {appName} from '../config';
import firebase from 'firebase';
import {take, call, put, all, select, takeEvery} from 'redux-saga/effects';
import {idInObjectValue, addUniqItemToArray, deleteItem} from './utils';
import {createSelector} from 'reselect';
import {peopleSelectorArr} from './people';

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
export const FETCH_LAZY_REQUEST = `${appName}/${moduleName}/FETCH_LAZY_REQUEST`;
export const FETCH_LAZY_START = `${appName}/${moduleName}/FETCH_LAZY_START`;
export const FETCH_LAZY_SUCCESS = `${appName}/${moduleName}/FETCH_LAZY_SUCCESS`;
export const SELECT_EVENT = `${appName}/${moduleName}/SELECT_EVENT`;
export const REMOVE_EVENT_REQUEST = `${appName}/${moduleName}/REMOVE_EVENT_REQUEST`;
export const REMOVE_EVENT_SUCCESS = `${appName}/${moduleName}/REMOVE_EVENT_SUCCESS`;

/////////////////////REDUCER//////////////////////////////////

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {

        case FETCH_ALL_REQUEST:
        case FETCH_LAZY_START:
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

        case FETCH_LAZY_SUCCESS:

            return {
                ...state,
                loading: false,
                //loaded: Object.keys(payload) < 10,
                loaded: true,
                entities: {...state.entities, ...idInObjectValue(payload)}
            };

        case SELECT_EVENT:
            return {
                ...state,
                selected: addUniqItemToArray(state.selected, payload)
            };

        case REMOVE_EVENT_SUCCESS:
            return {
                ...state,
                entities: deleteItem(state.entities, payload)
            };

        default:
            return state
    }
}

/////////////////////SELECTORS//////////////////////////////////

export const stateSelector = (state) => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const selectedSelector = createSelector(stateSelector, state => state.selected);
export const eventListSelector = createSelector(entitiesSelector, state => {
    return state && Object.values(state)
});
export const selectedEventsSelector = createSelector(entitiesSelector, selectedSelector, (events, selections) => {
    return selections.map(id => events[id])
});

export const personsGoingToEvent = (state, props) => {
    return peopleSelectorArr(state).filter(person => person.events && person.events.includes(props));
};


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

export function loadLazy() {
    return {
        type: FETCH_LAZY_REQUEST,
    }
}

export function removeEven(eventId) {
    return {
        type: REMOVE_EVENT_REQUEST,
        payload: eventId
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

export function * fetchLazySaga () {
    while (true) {
        yield take(FETCH_LAZY_REQUEST);

        const store = yield select(stateSelector);

        yield put({
            type: FETCH_LAZY_START
        });

        if (store.loading) continue;
        
        const lastEvent = store.entities && Object.values(store.entities);
        const ref = firebase.database().ref('events')
            .orderByKey()
            .limitToFirst(10)
            .startAt(lastEvent ? lastEvent[lastEvent.length - 1].id : '');

        const data = yield call([ref, ref.once], 'value');

        yield put({
            type: FETCH_LAZY_SUCCESS,
            payload: data.val()
        });
    }
}

export function * removeEvenSaga(action) {
    console.log('removeEvenSaga1', action.payload);
    const ref = firebase.database().ref('events').child(action.payload);
    const parentRef = firebase.database().ref('events');



    try {
        yield call([ref, ref.remove]);
        yield put({
            type: REMOVE_EVENT_SUCCESS,
            payload: action.payload
        })
    }catch (e) {
        console.log(e);
    }
}

export function * saga () {
    yield all([
        loadEventsSaga(),
        fetchLazySaga(),
        takeEvery(REMOVE_EVENT_REQUEST, removeEvenSaga)
    ]);
}