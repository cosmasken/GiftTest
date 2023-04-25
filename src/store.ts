import {createStore, combineReducers} from 'redux';
import {Merchant,Contact} from '../types';
import {fetchContacts, fetchData} from '../src/data';

export const fetchMerchantsSuccess = (data: Merchant[]) => {
    return {type: 'FETCH_MERCHANTS_SUCCESS', payload: data};
  };

  export const fetchContactsSuccess = (data: Contact[]) => {
    return {type: 'FETCH_CONTACT_SUCCESS', payload: data};
  };
  
  
  // Define reducer for contact
  export const merchantReducer = (state: Merchant[] = [], action: any) => {
    switch (action.type) {
      case 'FETCH_MERCHANTS_SUCCESS':
        return action.payload;
      default:
        return state;
    }
  };

  // Define reducer for merchants
  export const contactsReducer = (state: Contact[] = [], action: any) => {
    switch (action.type) {
      case 'FETCH_CONTACT_SUCCESS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // Create store
  export const store = createStore(
    combineReducers({contacts: contactsReducer, merchants: merchantReducer}),
  );
 // export const store = createStore(combineReducers({merchants: merchantReducer}));

  // Fetch data and dispatch action
  fetchData().then(data => {
    store.dispatch(fetchMerchantsSuccess(data));
   // console.log('MERCHANTS ARE =============', data);
  });

  fetchContacts().then(data => {
    store.dispatch(fetchContactsSuccess(data));
   // console.log('KATCHUA ARE ---------', data);
  });
  