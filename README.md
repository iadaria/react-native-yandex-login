# ios

1. Add the key ClientID into Info.plist. You can get the CliendID in your (app's settings)[https://yandex.ru/dev/id/doc/ru/oauth-cabinet#app-params]:
```php
<dist>
	<key>ClientID</key>
	<string>27***3</string>
...
```

2. Follow the yandex (instructions)[https://yandex.ru/dev/id/doc/ru/mobileauthsdk/ios/3.0.0/sdk-ios-install] and do the next steps:

2.1 Set up the Info.plist just like yandex (instractions)[https://yandex.ru/dev/id/doc/ru/mobileauthsdk/ios/3.0.0/sdk-ios-install]:
```php
<dict>
	<key>ClientID</key>
	<string>27****3</string>
	<key>LSApplicationQueriesSchemes</key>
	<array>
	<string>primaryyandexloginsdk</string>
	<string>secondaryyandexloginsdk</string>
	</array>
	<key>CFBundleURLTypes</key>
	<array>
	<dict>
		<key>CFBundleURLName</key>
		<string>YandexLoginSDK</string>
		<key>CFBundleURLSchemes</key>
		<array>
			<string>yx27****3</string>
		</array>
	</dict>
	</array>
    ...
</dist>
```
2.2 Add a string into Capability: Associated applinks:yx{Client ID}.aouth.yandex.ru. For example: ```applinks:yx27****3.oauth.yandex.ru```
See the yandex (documentation)[https://yandex.ru/dev/id/doc/ru/mobileauthsdk/ios/3.0.0/sdk-ios-install]

# Android

1 Follow the (instraction)[https://yandex.ru/dev/id/doc/ru/mobileauthsdk/android/3.1.0/sdk-android-use] and add the ClientID:
```java
android {
      defaultConfig {
      manifestPlaceholders = [YANDEX_CLIENT_ID:"<идентификатор приложения_clientID>"]
   }
}
```

# Example of using:

```javascript
import React from 'react';
import {View, Button} from 'react-native';
import { getUserInfo } from 'react-native-yandex-login';

export const YandexLoginButton = () => {
  async function onYandexLogin() {
    
      const secret = "Your secret code";
      const userInfo = await getUserInfo(secret);
      console.log({ userInfo})
  }
  return (
    <View style={{margin: 10}}>
      <Button color="orange" title="Yandex Login" onPress={onYandexLogin} />
    </View>
  );
};
````