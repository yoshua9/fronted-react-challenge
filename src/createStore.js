import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from "redux-logger";
import { allReducers } from "./store/reducersIndex";

const promiseMiddleware = store => next => action => {
    if (action.payload instanceof Promise) {
        action.payload.then(result => {
            store.dispatch({
                type: action.type + '_PENDING',
            })
        })
        action.payload.then(result => {
            if (result != undefined) {
                store.dispatch({
                    type: action.type + '_FULFILLED',
                    payload: result
                })
            }
        })
        action.payload.catch(err => {
            store.dispatch({
                type: action.type + '_REJECTED',
                payload: err
            })
        })
    } else {
        next(action)
    }
}

const middleware = [
    promiseMiddleware
];

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
);

export const store = createStore(allReducers, enhancer);


