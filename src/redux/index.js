import {createStore, applyMiddleware} from 'redux';
import reducer from './reduser';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import history from '../history';
import { saga } from '../ducks/people'

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk, logger);

const store = createStore(reducer(history), enhancer);
sagaMiddleware.run(saga);
window.store = store;

export default store;