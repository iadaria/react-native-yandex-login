import { NativeModules } from 'react-native';
const { YandexLogin } = NativeModules;

interface IYandexLogin {
  login(email: string): void;
  getConstants(): any;
}

export default YandexLogin as IYandexLogin;
