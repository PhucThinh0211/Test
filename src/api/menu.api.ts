import { request } from '../utils/request';
import { URLs } from './constant';

export const apiGetAllMenus = (langId: string) => {
  return request(
    `${URLs.getAllMenus}?locale=${langId}&fields=title,slug,category&populate=banner&sort=sorter:asc&pagination[limit]=300`,
  );
};
