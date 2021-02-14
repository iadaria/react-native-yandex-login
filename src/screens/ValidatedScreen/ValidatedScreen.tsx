import React from 'react';
import { StyleSheet } from 'react-native';
import ValidatedElements, { TestTextInput } from './components/ValidatedElements';

export default function ValidatedScreen() {
  return (
    <ValidatedElements>
      <TestTextInput style={styles.input} id="first_name" />
      <TestTextInput style={styles.input} id="birthday_month" />
      <TestTextInput style={styles.input} id="password" />
    </ValidatedElements>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50,
    paddingBottom: 10,
  },
  split: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 40,
  },
  button: {
    flex: 0,
    justifyContent: 'flex-end',
  },
});