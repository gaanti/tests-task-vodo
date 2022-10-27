export interface productForCart {
  quantity: number
  product: product
}
export interface product {
  id: number
  title: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
  description: string;
}
