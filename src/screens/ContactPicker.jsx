import React, { useState, useEffect } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactPicker = ({ onContactSelect }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Contacts.getAll().then((contacts) => {
      setContacts(contacts);
    });
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.givenName} ${contact.familyName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleContactPress = (contact) => {
    onContactSelect(contact);
  };

  return (
    <View>
      <TextInput
        placeholder="Search contacts..."
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactPress(item)}>
            <Text>{`${item.givenName} ${item.familyName}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContactPicker;
