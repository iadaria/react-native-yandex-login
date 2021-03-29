import YandexLogin from './moudles/YandexLogin';

export async function yandexLogin() {
  try {
    const access_token = await YandexLogin.login('dasha.box@yandex.ru');
    console.log('[YandexLogin/success]', access_token);
  } catch (e) {
    console.log('[YandexLogin/error]', e);
  }
}
