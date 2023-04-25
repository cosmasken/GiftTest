import {
  ScrollView,
  Button,
  Text,
  Actionsheet,
  CheckIcon,
  SectionList,
} from 'native-base';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GiftCard from '../components/GiftCard';

import {Merchant, AppState, RootState} from '../../types';
import {Select} from 'native-base';
import {colorOptions} from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GiftCardData} from '../../types';
import {useSelector} from 'react-redux';
import Contacts from 'react-native-contacts';
import ContactPickerModal from './ContactPickerModal';
import ContactPicker from './ContactPicker';

interface CustomizeVoucherProps {
  navigation: NavigationProp<ParamListBase>;
}
const CustomizeVoucher = ({navigation}: CustomizeVoucherProps) => {
  //modal
  //get contacts
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const handleContactSelect = contact => {
    setSelectedContact(contact);
    setModalVisible(false);
  };


  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null,
  );
  const [giftCards, setGiftCards] = React.useState([]);
  const [service, setService] = React.useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [amount, setAmount] = useState(0);
  const contactsData = useSelector((state: RootState) => state.contacts);

  const handleAmountSelection = amountValue => {
    setAmount(amountValue);
  };

  const handleCustomAmountEntry = amountValue => {
    setAmount(amountValue);
  };

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [note, setNote] = useState('');

  const handleNoteChange = (value: string) => {
    setNote(value);
  };

  const handleColorPress = (color: string) => {
    setSelectedColor(color);
  };
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const storedData = await AsyncStorage.getItem('merchantdata');
        if (storedData !== null) {
          
          const parsedData = JSON.parse(storedData);
          console.log('GOTEM ARE =============', parsedData);
          setData(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [navigation]);
  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);

    setSelectedCategory(merchant.lookup_values_3);
    setIsOpen(false);
    // filter data based on selected merchant
    const filteredData = data.filter(
      (m: Merchant) => m.lookup_values_3 === merchant.lookup_values_3,
    );
    setFilteredData(filteredData);
    // console.log('NWE FILTERED DATA IS ===', filteredData);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const existingData = await AsyncStorage.getItem('giftCards');
        if (existingData !== null) {
          setGiftCards(JSON.parse(existingData));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigation]);

  const addDataToGiftCards = async (newData: {
    id: any;
    category: any;
    merchantname: any;
    receiver: any;
    amount: any;
    note: any;
    color: any;
  }) => {
    try {
      const existingData = await AsyncStorage.getItem('giftCards');
      let data = [];
      if (existingData !== null) {
        data = JSON.parse(existingData);
      }
      data.push(newData);
      await AsyncStorage.setItem('giftCards', JSON.stringify(data));
      setGiftCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewGiftCard = (data: GiftCardData): void => {
    addDataToGiftCards(data);
    navigation.navigate('Home');
  };

  // function to render filtered data

  const renderMerchantOptions = () => {
    const uniqueMerchants = data.filter(
      (merchant, index, self) =>
        index ===
        self.findIndex(m => m.lookup_values_3 === merchant.lookup_values_3),
    );

    return uniqueMerchants.map((merchant: Merchant) => (
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
            {/* render categories */}
            {renderMerchantOptions()}

            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </Actionsheet.Content>
        </Actionsheet>
      </>
      <>
        <Select
          selectedValue={service}
          minWidth="200"
          accessibilityLabel="Choose Merchant"
          placeholder="Choose Merchant"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          {filteredData.map((merchant: Merchant) => (
            <Select.Item
              label={merchant.lookup_values_1}
              value={merchant.lookup_values_1}
            />
          ))}
        </Select>
      </>
      <ScrollView>
        <View style={styles.imageContainer}>
          <GiftCard
            name={service}
            bgColor={selectedColor}
            date={'2022'}
            suffix={'900'}
          />
          {/* <Text style={[styles.imageText, {color: selectedColor}]}>NETFLIX</Text> */}
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.amountText}>{service} Card</Text>
          <Text style={styles.amountText}>
            This card allows you to buy anything from {service}. It does not
            expire.
          </Text>
        </View>

        {/* /Contacts */}
        <View style={styles.reciprient}>
          <Text style={styles.title}>Customize Voucher</Text>

          <View style={styles.modcontainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.button}>Select Contact</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
              <View style={styles.modalContainer}>
                <ContactPicker onContactSelect={handleContactSelect} />
              </View>
            </Modal>

            {selectedContact && (
              <View>
                <Text>{`${selectedContact.givenName} ${selectedContact.familyName}`}</Text>
                <Button
                  // title="Clear Selection"
                  onPress={() => setSelectedContact(null)}
                />
              </View>
            )}
          </View>
          {/* <ContactPickerModal
            isVisible={modalVisible}
            onDone={() => setModalVisible(false)}
            onSelect={handleContactSelect}
          /> */}
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.headerText}>Choose An Amount</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAmountSelection('1000')}>
              <Text style={styles.buttonText}>1000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAmountSelection('5000')}>
              <Text style={styles.buttonText}>5000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAmountSelection('10000')}>
              <Text style={styles.buttonText}>10000</Text>
            </TouchableOpacity>
            {/* <TextInput
          style={styles.amountSelector}
          placeholder="Other Amount"
          placeholderTextColor="#7c7c7c"
          keyboardType="numeric"
          onChangeText={handleCustomAmountEntry}
          value={amount}
        /> */}
            <TextInput
              style={styles.amountSelector}
              placeholder="Other Amount"
              placeholderTextColor="#7c7c7c"
              keyboardType="numeric"
              onChangeText={handleCustomAmountEntry}
              defaultValue={amount.toString()}
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
        <Text style={styles.subtitle}>Add a note (optional)</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handleNoteChange}
          value={note}
          placeholder="Enter your note here"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            handleAddNewGiftCard({
              id: Math.random(),
              merchantname: service,
              amount: amount,
              note: note,
              category: selectedCategory,
              receiver: ' cosmas',
              color: selectedColor,
            })
          }>
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
  textInput: {
    width: '100%',
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  reciprient: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },

  modcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalbutton: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    marginTop: 22,
    backgroundColor: '#fff',
  },
});
export default CustomizeVoucher;
function setModalVisible(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
