import { combineReducers } from 'redux';
import courseReducer from './courseReducers';
import authorsReducer from './authorReducers';
import apiCallsInProgress from './apiStatusReducers';

const rootReducres = combineReducers({
    courseReducer,
    authorsReducer,
    apiCallsInProgress
});

export default rootReducres;