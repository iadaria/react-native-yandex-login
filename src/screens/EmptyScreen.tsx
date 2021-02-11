import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyScreen() {
  return (
    <View style={styles.root}>
      <Text />
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});

