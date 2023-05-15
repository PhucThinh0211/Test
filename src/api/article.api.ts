import { request } from '../utils/request';
import { URLs } from './constant';

export const apiGetArticlesByCategoryId = (
  categoryId: number,
  langId: string,
  pageSize: number = 25,
  page: number = 1,
) => {
  return request(
    `${URLs.getAllArticles}?populate=media&filters[categories][id]=${categoryId}` +
      `&sort=publishedAt:desc&locale=${langId}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
  );
};

export const apiGetArticlesByMenuId = (menuId: number, langId: string) => {
  return request(
    `${URLs.getAllArticles}?filters[categories][menu][id]=${menuId}&locale=${langId}`,
  );
};

export const apiGetArticleById = (id: number, lang: string) =>
  request(`${URLs.getAllArticles}/${id}?locale=${lang}`);

export const apiFindArticles = (query: string, lang: string) =>
  request(
    `${URLs.getAllArticles}?filters[content][$contains]=${query}&sort=publishedAt:desc&locale=${lang}`,
  );
