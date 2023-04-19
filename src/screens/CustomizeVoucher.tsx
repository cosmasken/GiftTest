import {ScrollView, Button, Text, useDisclose, Actionsheet} from 'native-base';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
//import CustomButton from './components/CustomBtn';
import GiftCard from '../components/GiftCard';

import {Merchant, GiftCard as GiftCard1, AppState} from '../../types';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import Icon from 'react-native-vector-icons/FontAwesome';

const colorOptions = [
  '#ff0000', // red
  '#008000', // green
  '#0000ff', // blue
  '#ffd700', // gold
  '#9400d3', // purple
  '#ff69b4', // pink
];
interface CustomizeVoucherProps {
  navigation: NavigationProp<ParamListBase>;
}
const CustomizeVoucher = ({navigation}: CustomizeVoucherProps) => {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null,
  );

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleColorPress = (color: string) => {
    setSelectedColor(color);
  };
  const [isOpen, setIsOpen] = useState(false);

  const openActionSheet = () => {
    setIsOpen(true);
  };

  const closeActionSheet = () => {
    setIsOpen(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('merchantdata');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setSelectedCategory(merchant.lookup_values_3);
    setIsOpen(false);
  };

  const handleAddGiftCard = () => {
    // TODO: handle adding the gift card
    console.log('Add gift card clicked');
  };

  const renderMerchantOptions = () => {
    return data.map((merchant: Merchant) => (
      <TouchableOpacity
        key={merchant.lookup_values_2}
        onPress={() => handleMerchantSelect(merchant)}
        style={[
          styles.merchantOption,
          selectedMerchant?.lookup_values_2 === merchant.lookup_values_2 &&
            styles.merchantOptionSelected,
        ]}>
        <Text style={styles.merchantOptionText}>
          {merchant.lookup_values_3}
        </Text>
      </TouchableOpacity>
    ));
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <>
        <Button onPress={() => setIsOpen(true)}>
          <Text>{selectedCategory ? selectedCategory : 'Choose Category'}</Text>
        </Button>
        <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Actionsheet.Content>
            {renderMerchantOptions()}
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </Actionsheet.Content>
        </Actionsheet>
      </>
      <ScrollView>
        <View style={styles.imageContainer}>
          <GiftCard
            name={'NetFlix'}
            bgColor={selectedColor}
            date={'2022'}
            suffix={'900'}
          />
          {/* <Text style={[styles.imageText, {color: selectedColor}]}>NETFLIX</Text> */}
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Netflix Card</Text>
          <Text style={styles.amountText}>
            This card allows you to buy anything from Netflix
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.headerText}>Choose An Amount</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>1000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>1000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>10000</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.amountSelector}
              placeholder="Other Amount"
              placeholderTextColor="#7c7c7c"
            />
          </View>
        </View>
        <View style={styles.designContainer}>
          <Text style={styles.headerText}>Choose A Design</Text>
          <View style={styles.designOptionsContainer}>
            {colorOptions.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.designOption,
                  {
                    backgroundColor: color,
                    borderColor: selectedColor === color ? '#000' : '#fff',
                  },
                ]}
                onPress={() => handleColorPress(color)}
              />
            ))}
            {/* <Icon name="paint-brush" size={28} color="#000" /> */}
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => isOpen}>
          <Text>Add Gift Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontFamily: 'NetflixSans-Bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'transparent',
    // paddingVertical: 20,
    marginVertical: 10,
    flex: 2,
  },
  imageText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'NetflixSans-Bold',
  },
  headerContainer: {
    marginBottom: 20,
  },
  amountContainer: {
    marginBottom: 20,
  },
  designContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'NetflixSans-Bold',
  },
  amountText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#7c7c7c',
    fontFamily: 'NetflixSans-Light',
  },
  buttonContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'NetflixSans-Bold',
  },
  amountSelector: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  checkoutContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkoutAmount: {
    // flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // marginBottom: 10,
  },
  checkoutAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'NetflixSans-Bold',
  },
  checkoutButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    alignItems: 'center',
    flex: 3,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'NetflixSans-Light',
  },
  designOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  designOption: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  colorPicker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  merchantOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  merchantOptionSelected: {
    backgroundColor: '#f0f0f0',
  },
  merchantOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
export default CustomizeVoucher;
