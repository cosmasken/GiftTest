import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View,Button } from 'react-native';
import ContactPicker from './ContactPicker';

const ContactPickerModal = ({isVisible}) => {
  const [modalVisible, setModalVisible] = useState({isVisible});
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
          <Button title="Clear Selection" onPress={() => setSelectedContact(null)} />
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
  },
  button: {
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

export default ContactPickerModal;
