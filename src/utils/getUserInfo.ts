import type { UserInfo } from '../types/userInfo';
import { request } from './request';

export async function requestUserInfo(secret: string, authToken: string) {
  const params = {
    format: 'json',
    jwt_secret: secret,
  };
  const query = (new URLSearchParams(params)).toString();
  const url = `https://login.yandex.ru/info?${query}`
  
  return request<UserInfo>(url, {
    headers: { Authorization: `OAuth ${authToken}` },
  });
}
