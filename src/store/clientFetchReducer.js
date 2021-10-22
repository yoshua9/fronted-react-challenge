import axios from "axios";

const initialState = {
    loading: false,
    phones: [],
    pageCount: 0,
    perPage: 4
};

const ACTION_TYPES = {
    GET_PHONES_FULFILLED: 'GET_PHONES_FULFILLED',
    GET_PHONES_PENDING: 'GET_PHONES_PENDING',
    GET_PHONES_REJECTED: 'GET_PHONES_REJECTED',
    GET_PHONES: 'GET_PHONES'
};

export function clientFetchReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_PHONES_PENDING:
            return {
                ...state,
                loading: true
            }
        case ACTION_TYPES.GET_PHONES_FULFILLED:
            return {
                ...state,
                phones: action.payload.phones,
                loading: false,
                pageCount: Math.ceil(action.payload.totalPhones / state.perPage),
                selected: parseInt(action.payload.selected) - 1
            }
        case ACTION_TYPES.GET_PHONES_REJECTED:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}

export function getPhones(page = 1) {
    return {
        type: ACTION_TYPES.GET_PHONES,
        payload: axios.get('/api/phones', { params: { page: page } })
            .then((response) => response.data)
            .catch(error => console.log('Error', error))
    }
}