/**
* @format
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/
import { NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;

interface CalendarInterface {
  /* createCalendarEvent(
    name: string,
    location: string,
    myFailureCallback: (error: string | null) => void,
    callback: (secondError: string, eventId: number) => void,
  ): void; */
  // ios
  /*  callback(@[@(eventId)]);
  createCalendarEvent(name: string, location: string, callbak: (eventId: number) => void): void;*/
  // callback(@[[NSNull null], eventId])
  /* createCalendarEvent(
    name: string,
    location: string,
    callback: (error: string, eventId: number) => void,
  ): void; */
  createCalendarEvent(name: string, location: string): Promise<number>;
  createCalendarEventTwo(
    name: string,
    location: string,
    // promise: Promise<number>,
  ): void;
  getConstants(): any;
}

export default CalendarModule as CalendarInterface;
