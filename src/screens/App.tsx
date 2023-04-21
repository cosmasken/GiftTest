/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Merchant} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

import GiftCard from '../components/GiftCard';
import NetInfo from '@react-native-community/netinfo';
interface AppProps {
  navigation: NavigationProp<ParamListBase>;
}

const Item = ({amount, merchantname, receiver, note, category}) => {
  return (
    <View style={styles.item}>
      <Text>{category}</Text>
      <Text>{merchantname}</Text>
      <Text>{amount}</Text>
      <Text>{receiver}</Text>
      <Text>{note}</Text>
    </View>
  );
};

const App = ({navigation}: AppProps) => {
  const [giftCards, setGiftCards] = useState<
    {
      id: number;
      merchantname: string;
      category: string;
      amount: number;
      receiver: string;
      note: string;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // await AsyncStorage.clear();
        const existingData = await AsyncStorage.getItem('giftCards');
        if (existingData !== null) {
          // await AsyncStorage.clear();
          // setGiftCards(JSON.parse(JSON.stringify(existingData)));

          setGiftCards(JSON.parse(existingData));

          //  setGiftCards(JSON.parse(existingData));
          console.log('OUR GIFTCARDS ARE ====+===', giftCards);
        }
      } catch (error) {
        console.log(error);
        //setGiftCards([]);
      }
    };
    getData();
  }, []);
  const [merchants, setMerchants] = useState<Merchant[]>([]);

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
        <View style={styles.flatlistContainer}>
          <FlatList
            data={giftCards}
            renderItem={({item}) => (
              <Item
                merchantname={item.merchantname}
                receiver={item.receiver}
                note={item.note}
                category={item.category}
                amount={item.amount}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CustomizeVoucher')}>
            <Text>Add Another</Text>
          </TouchableOpacity>
        </View>
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
  item: {
    flex: 1,
    width: '100%', // 100% devided by the number of rows you want
    justifyContent: 'center',

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: 'rgba(249, 180, 45, 0.25)',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  flatlistContainer: {
    flex: 3, // the number of columns you want to devide the screen into
    marginHorizontal: 'auto',
    width: '100%',
  },
});

export default App;
