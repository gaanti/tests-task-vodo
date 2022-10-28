export interface productForCart {
  quantity: number;
  color: colors;
  size: string;
  product: product;
}

export interface product {
  id: number;
  title: string;
  price: number;
  sizes: string[];
  colors: colors[];
  description: string;
}

export interface colors {
  color: string;
  url: string;
}
