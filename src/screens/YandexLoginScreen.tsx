import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { yandexLogin } from './socialLogin';

export default function YandexLoginScreen() {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          yandexLogin();
        }}>
        <Text>Yandex Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
