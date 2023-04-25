import Contacts from 'react-native-contacts';

export async function fetchData() {
  try {
    const response = await fetch(
      'https://run.mocky.io/v3/2598c0cf-5647-4ecc-ba4b-15cbc14a2124',
    );
    const data = await response.json();
    const merchantjson = data.result.message;
    if (merchantjson && Array.isArray(merchantjson)) {
      return merchantjson;
    }
  } catch (error) {
    console.error(error);
  }
  // Return empty array if there was an error or the fetched data is not an array
  return [];
}

export async function fetchContacts() {
  try {
    // Request permission to access contacts
    await Contacts.requestPermission();

    // Fetch contacts
    const contacts = await Contacts.getAll();
  //  console.log('DATA TIMEEEE',contacts);
return contacts;
  
  } catch (error) {
    console.error(error);
  }
  return [];
}