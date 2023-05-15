

export enum CategoryDisplay {
  card = 'card',
  news = 'news',
  list = 'list',
  tree = 'tree',
  profileCard = 'profileCard',
  productCard = 'productCard',
  infoCard = 'infoCard',
  blogCard = 'blogCard',
  contentCard = 'contentCard',
  mediaCard = 'mediaCard',
  anatomyCard = 'anatomyCard',
  collectionsCard = 'collectionsCard',
  linkList = 'linkList',
}

export enum MenuCategory {
  home = 'home',
  introductions = 'introductions',
  products = 'products',
  service = 'services',
  news = 'news',
  contact = 'contact',
  infoPages = 'infoPages',
  simpleLink = 'simpleLink',
}

export enum WigetComponent {
  contact = 'contact',
  news = 'news',
}

export enum WigetPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  center = 'center',
}

export interface Media {
  url: string;
}
