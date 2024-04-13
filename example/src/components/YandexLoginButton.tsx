import React from 'react';
import { View, Button } from 'react-native';
import { getUserInfo } from 'react-native-yandex-login';

const YandexLoginButton = () => {
  async function onYandexLogin() {
      const secret = "{Client secret}";
      const userInfo = await getUserInfo(secret);
      console.log({ userInfo});
  }
  return (
    <View style={{ margin: 10 }}>
      <Button color="orange" title="Yandex Login" onPress={onYandexLogin} />
    </View>
  );
};

export default YandexLoginButton;
