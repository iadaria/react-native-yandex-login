import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { TestTextInput } from './components/TestTextInput';
/// import { TestTextInput } from './components/TestInputText';
import ValidatedElements from './components/ValidatedElements';

export default function ValidatedScreen() {
  return (
    <ValidatedElements>
      <TestTextInput style={styles.input} label="First name" id="first_name" />
      <Text>Dasha</Text>
      <TestTextInput style={styles.input} label="Last name" id="last_name" />
      <TestTextInput style={styles.input} label="Birthday month" id="birthday_month" />
      <TestTextInput style={styles.input} label="password" id="password" />
      <Button color="green" title="Check all" onPress={() => {}} accessibilityLabel="HZ" />
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
    marginBottom: 40,
  },
  button: {
    flex: 0,
    justifyContent: 'flex-end',
  },
});
