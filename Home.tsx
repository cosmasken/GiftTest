import * as React from 'react';
import App from './src/screens/App';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider, extendTheme} from 'native-base';
import CustomizeVoucher from './src/screens/CustomizeVoucher';
import {Provider} from 'react-redux';
import {newColorTheme} from './src/colors';
import {store} from './src/store';

const Stack = createNativeStackNavigator();

const theme = extendTheme({colors: newColorTheme});

function Home() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={App} />
            <Stack.Screen
              name="CustomizeVoucher"
              component={CustomizeVoucher}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default Home;
