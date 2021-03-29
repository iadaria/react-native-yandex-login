import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import NativeJavaModuleScreen from './src/screens/NativeJavaModuleScreen';
import YandexLoginScreen from './src/screens/YandexLoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NativeJavaModuleScreen">
        <Stack.Screen name="YandexLoginScreen" component={YandexLoginScreen} />
        <Stack.Screen name="NativeModule" component={NativeJavaModuleScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
