import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} id='test_id'>Hello conFusión 2020</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#8C1D98',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
