import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// Define initial state
const initialState = {
  merchants: [],
  giftCards: [],
  loading: false,
  error: null,
};

// Define action types
const FETCH_MERCHANTS_REQUEST = 'FETCH_MERCHANTS_REQUEST';
const FETCH_MERCHANTS_SUCCESS = 'FETCH_MERCHANTS_SUCCESS';
const FETCH_MERCHANTS_FAILURE = 'FETCH_MERCHANTS_FAILURE';
const ADD_GIFT_CARD = 'ADD_GIFT_CARD';

// Define actions
const fetchMerchantsRequest = () => {
  return {
    type: FETCH_MERCHANTS_REQUEST,
  };
};

export const fetchMerchantsSuccess = merchants => {
  return {
    type: FETCH_MERCHANTS_SUCCESS,
    payload: merchants,
  };
};

export const fetchMerchantsFailure = error => {
  return {
    type: FETCH_MERCHANTS_FAILURE,
    payload: error,
  };
};

const addGiftCard = giftCard => {
  return {
    type: ADD_GIFT_CARD,
    payload: giftCard,
  };
};

// Define reducers
const merchantsReducer = (state = initialState.merchants, action) => {
  switch (action.type) {
    case FETCH_MERCHANTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const giftCardsReducer = (state = initialState.giftCards, action) => {
  switch (action.type) {
    case ADD_GIFT_CARD:
      return [...state, action.payload];
    default:
      return state;
  }
};

const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case FETCH_MERCHANTS_REQUEST:
      return true;
    case FETCH_MERCHANTS_SUCCESS:
    case FETCH_MERCHANTS_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_MERCHANTS_FAILURE:
      return action.payload;
    case FETCH_MERCHANTS_REQUEST:
    case FETCH_MERCHANTS_SUCCESS:
      return null;
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  merchants: merchantsReducer,
  giftCards: giftCardsReducer,
  loading: loadingReducer,
  error: errorReducer,
});

// Create store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(axios)),
);

export default store;
