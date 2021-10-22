import { combineReducers } from "redux";

import { clientFetchReducer } from "./clientFetchReducer";

export const allReducers = combineReducers({
    clientFetch: clientFetchReducer
})