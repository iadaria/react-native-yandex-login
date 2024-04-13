import type { UserInfo } from '../types/userInfo';
import { request } from './request';

export async function requestUserInfo(clientId: string, authToken: string) {
  const url = new URL('https://login.yandex.ru/info');
  url.searchParams.set('format', 'json');
  url.searchParams.set('jwt_secret', clientId);

  return request<UserInfo>(url, {
    headers: { Authorization: `OAuth ${authToken}` },
  });
}
