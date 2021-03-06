import React from 'react';
import { Button, StyleSheet, View, Platform } from 'react-native';
import CalendarModule from './moudles/CalendarModule';
import NewModuleButton from './moudles/NewModuleButton';

export default function NativeJavaModuleScreen() {
  // maybe BackHandler instead EventListener
  // React.useEffect(() => {
  //   const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
  //   // in doc using 'this' instead 'window'
  //   window.eventListener = eventEmitter.addListener('EventReminder', (event) => {
  //     console.log(event.eventProperty); // "someValue"
  //   });
  //   return () => {
  //     // need use 'this' instead 'window' may be 'BackHandler'
  //     window.eventListener.remove();
  //   };
  // }, []);
  // We will inoke the native module here!'
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

  // const onPress = () => {
  //   CalendarModule.createCalendarEvent(
  //     'Party',
  //     'My House',
  //     (error: string | null) => {
  //       console.error(`Error found! ${error}`);
  //     },
  //     (secondError: string, eventId: number) => {
  //       if (secondError) {
  //         console.log(`This is second error = '${secondError}'`);
  //       }
  //       console.log(`event id ${eventId} returned`);
  //     },
  //   );
  // };

  return (
    <View style={styles.root}>
      <NewModuleButton />
      <Button title="GET CONSTANTS" color="#141584" onPress={getConstants} />
      {/* <Button title="Click to invoke your native module!" color="#841584" onPress={onPress} /> */}
      <Button title="Click to invoke your TWO module!" color="#242561" onPress={onSubmit} />
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
