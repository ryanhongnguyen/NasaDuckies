import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoriesScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello World from StoriesScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});