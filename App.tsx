/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Contacts from 'react-native-contacts';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {Merchant, GiftCard, AppState} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({navigation}) => {
  const savedGiftcards = useSelector((state: AppState) => state.giftCards);

  const savedMerchants = useSelector((state: AppState) => state.merchants);
  const [giftCards, setGiftCards] = useState(savedGiftcards);

  const [merchants, setMerchants] = useState<Merchant[]>(savedMerchants);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/2598c0cf-5647-4ecc-ba4b-15cbc14a2124',
        );
        const data = await response.json();
        const merchantjson = data.result.message;
        //dispatch(fetchMerchantsSuccess(data.result.message));
        // console.log(data.result.message);
        if (merchantjson && Array.isArray(merchantjson)) {
          // check if the data is an array
          //    console.log('dat is =======', merchantjson);
          await AsyncStorage.setItem(
            'merchantdata',
            JSON.stringify(merchantjson),
          );
        }
        setMerchants(merchantjson); // set the merchants state with the fetched data
      } catch (error) {
        console.error(error);
        //  dispatch(fetchMerchantsSuccess(error));
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {giftCards.length === 0 ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Gift Cards</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.subtitle}>
              You don't have any gift carrds yet.
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate('CustomizeVoucher', {merchants})
              }>
              <Text>Add Gift Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={giftCards}
          renderItem={renderGiftCard}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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

  header: {
    backgroundColor: '#6200EE',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 10,
  },
  addButtonText: {},
  list: {
    marginTop: 20,
  },
});

export default App;
