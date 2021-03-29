import React, { useState } from 'react';
import { Button, StyleSheet, View, Platform, NativeModules, Text } from 'react-native';
import CalendarModule from './moudles/CalendarModule';
import NewModuleButton from './moudles/NewModuleButton';

export default function NativeJavaModuleScreen() {
  const [token, setToken] = useState('Nothing');
  const { CalendarManager } = NativeModules;

  function getConstants() {
    const { DEFAULT_EVENT_NAME } = CalendarModule.getConstants();

    console.log(DEFAULT_EVENT_NAME);
  }

  const onSubmit = async () => {
    if (Platform.OS === 'android') {
      try {
        const eventId = await CalendarModule.createCalendarEventTwo('Party', 'My House');
        console.log(`\nCreated a new event with id ${eventId}`);
      } catch (e) {
        console.log(e);
      }
    }
    if (Platform.OS === 'ios') {
      try {
        const eventId = await CalendarModule.createCalendarEvent('Party', 'my house');
        console.log(`Created a new event with id ${eventId}`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  async function getConstantsSwift() {
    const { SOME_CONST } = CalendarManager.getConstants();

    console.log('Swift constants:', SOME_CONST);

    try {
      const result_token = await CalendarManager.addEvent('Dasha', 'Chita');
      setToken(result_token);
      console.log(result_token);
    } catch (error) {
      console.log('error', error);
    }
  }

  /* const onPress = () => {
    CalendarModule.createCalendarEvent(
      'Party',
      'My House',
      (error: string | null) => {
        console.error(`Error found! ${error}`);
      },
      (secondError: string, eventId: number) => {
        if (secondError) {
          console.log(`This is second error = '${secondError}'`);
        }
        console.log(`event id ${eventId} returned`);
      },
    );
  }; */

  return (
    <View style={styles.root}>
      <NewModuleButton />
      <Button title="GET CONSTANTS" color="#141584" onPress={getConstants} />
      {/* <Button title="Click to invoke your native module!" color="#841584" onPress={onPress} /> */}
      <Button title="Click to invoke your TWO module!" color="#242561" onPress={onSubmit} />
      <Button title="Swift get Constants" color="#242521" onPress={getConstantsSwift} />
      <Text styles={{ marginTop: 30 }}>{token}</Text>
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
