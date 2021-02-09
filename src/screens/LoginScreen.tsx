import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default function LoginScreen() {
  return (
    <View style={styles.root}>
      <Text>Dasha</Text>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        //onLogoutFinished={() => console.log("logout.")}/>
      />
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
