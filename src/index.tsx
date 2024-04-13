import 'react-native-url-polyfill/auto';

import { NativeModules, Platform } from 'react-native';
import type { UserInfo } from './types/userInfo';
import { requestUserInfo } from './utils/getUserInfo';

const LINKING_ERROR =
  `The package 'react-native-yandex-login' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const YandexLogin = NativeModules.YandexLogin
  ? NativeModules.YandexLogin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function yandexLogin(): Promise<{ token: string; expiresIn?: number }> {
  return YandexLogin.login();
}

export async function getUserInfo(secret: string): Promise<UserInfo | undefined> {
  try {
    const data = await yandexLogin();
    console.log("[Yandex Login]", { secret, authToken: data.token });
    return requestUserInfo(secret, data.token);
  } catch (e) {
    console.log('[Yandex Login Error]', { e });
  }
}
