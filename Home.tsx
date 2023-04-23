import * as React from 'react';
import App from './src/screens/App';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import CustomizeVoucher from './src/screens/CustomizeVoucher';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Merchant } from './types';
import { newColorTheme } from './src/colors';
import { fetchData } from './src/data';

const Stack = createNativeStackNavigator();

const theme = extendTheme({ colors: newColorTheme });

// Define action creator
const fetchMerchantsSuccess = (data: Merchant[]) => {
  return { type: 'FETCH_MERCHANTS_SUCCESS', payload: data };
};

// Define reducer
const merchantReducer = (state: Merchant[] = [], action: any) => {
  switch (action.type) {
    case 'FETCH_MERCHANTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

// Create store
const store = createStore(combineReducers({ merchants: merchantReducer }));

// Fetch data and dispatch action
fetchData().then((data) => {
  store.dispatch(fetchMerchantsSuccess(data));
});

function Home() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={App} />
            <Stack.Screen name="CustomizeVoucher" component={CustomizeVoucher} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default Home;
