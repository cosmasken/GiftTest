import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Body,
} from 'native-base';
import {NativeBaseProvider, Box, extendTheme} from 'native-base';

const HomeScreen = ({navigation}) => {
  const [giftCards, setGiftCards] = useState([]);

  const handleCreateGiftCard = giftCard => {
    setGiftCards([...giftCards, giftCard]);
  };

  const renderGiftCard = ({item}) => (
    <Card>
      <CardItem header>
        <Text>{item.title}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{item.description}</Text>
        </Body>
      </CardItem>
    </Card>
  );

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {giftCards.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to Gift Cards!</Text>
            <Text style={styles.subtitle}>
              You don't have any gift cards yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={giftCards}
            renderItem={renderGiftCard}
            keyExtractor={item => item.id.toString()}
            style={styles.list}
          />
        )}
        <Button
          style={styles.fab}
          onPress={() =>
            navigation.navigate('Create Gift Card', {handleCreateGiftCard})
          }>
          <Icon name="add" />
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
  list: {
    marginTop: 20,
  },
  fab: {
    backgroundColor: '#6200ee',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;
