import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, navigationReducer } from './reducers';

const root = combineReducers({
    user: userReducer,
    navigation: navigationReducer,
});

const store = createStore(
    root,
    compose(
        applyMiddleware(thunk), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;