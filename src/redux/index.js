import {createStore, applyMiddleware} from 'redux';
import reducer from './reduser';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import history from '../history';
import rootSaga from '../redux/saga'

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk, logger);

const store = createStore(reducer(history), enhancer);
sagaMiddleware.run(rootSaga);
window.store = store;

export default store;