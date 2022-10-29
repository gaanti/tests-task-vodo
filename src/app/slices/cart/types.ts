export interface productForCart {
  quantity: number;
  color: colors;
  size: string;
  product: product;
  chosenAddOns: addOns[]
}

export interface product {
  id: number;
  title: string;
  price: number;
  sizes: string[];
  colors: colors[];
  description: string;
  addOns: addOns[]
}

export interface colors {
  color: string;
  url: string;
}
export interface addOns {
  title: string;
  imageUrl: string;
}
