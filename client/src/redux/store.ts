import { createStore, applyMiddleware } from 'redux';
import reducer, { IRootState } from './reducers';
// import reduxLogger from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk as ThunkMiddleware<IRootState>))
export default store;