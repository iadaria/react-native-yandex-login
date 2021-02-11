import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import NativeJavaModuleScreen from './src/screens/NativeJavaModuleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NativeModule">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="NativeModule" component={NativeJavaModuleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
