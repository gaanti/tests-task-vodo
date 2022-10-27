export interface productForCart {
  quantity: number
  color: string
  size: string
  product: product
}
export interface product {
  id: number
  title: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  description: string;
}
