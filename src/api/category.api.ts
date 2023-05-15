import { request } from '../utils/request';
import { URLs } from './constant';

export const apiGetAllCategories = (langId: string, menuId: number) => {
  return request(
    `${URLs.getAllCategories}?sort=sorter&filters[menu][id]=${menuId}&locale=${langId}`,
  );
};
