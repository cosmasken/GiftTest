/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {NativeBaseProvider, Box, extendTheme} from 'native-base';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Contacts from 'react-native-contacts';

import Slider from '@react-native-community/slider';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

type Merchant = {
  create_business_date: null | string;
  create_date: string;
  create_txn_id: string;
  created_by: number;
  df_flag: null;
  inst_no: string;
  lookup_code: string;
  lookup_id: number;
  lookup_values_1: string;
  lookup_values_2: string;
  lookup_values_3: string;
  lookup_values_4: string;
  lookup_values_5: null;
  rec_no: number;
  status: number;
  update_business_date: null | string;
  update_by: number;
  update_date: string;
  update_txn_id: string;
};

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});

function App(): JSX.Element {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  

  const openContactPicker = () => {
    Contacts.openContactPicker((err, contact) => {
      if (err) {
        console.log(err);
        return;
      }

      setSelectedContact(contact);
    });
  };

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    // handle form submission here
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/2598c0cf-5647-4ecc-ba4b-15cbc14a2124',
        );
        const data = await response.json();
        console.log(data.result.message);
        setMerchants(data.result.message); // set the merchants state with the fetched data
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NativeBaseProvider theme={theme}>
      <HomeScreen  />
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
