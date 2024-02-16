export interface ProductBase {
  _id: string;
  image: string;
  productNumber: string;
  name: string;
  price: string;
}

export interface ProductCreate {
  image: string;
  productNumber: string;
  name: string;
  price: string;
}
