import { request } from '../utils/request';
import { URLs } from './constant';

export const apiGetAllPosts = (langId: string) => {
  return request(`${URLs.getAllPosts}?locale=${langId}`);
};
