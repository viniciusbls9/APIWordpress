import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView, Linking } from 'react-native';

import axios from 'axios';

interface Item {
  id: string;
  title: string;
  link: string;
  categories: string;
}

const App = () => {

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get<Item[]>('http://lemonflex.com.br/wp-json/wp/v2/posts')
      .then(response => {
        setItems(response.data);
      });
  }, []);

  return (
    <ScrollView>
      {items.map((item) => (
        <View key={item.id}>
          <Text>{JSON.stringify(item.title).replace('{"rendered":"', '').replace('"}', '')}</Text>
          <TouchableHighlight style={styles.btn} onPress={() => Linking.openURL(`${item.link}`) }>
            <Text>{item.link}</Text>
          </TouchableHighlight>
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#0f0',
    padding: 10,
    marginBottom: 20

  }
})

export default App;
