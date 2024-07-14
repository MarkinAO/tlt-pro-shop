export type TProduct = {
  id: number;
  name: string;
  quantity: number;
  price: string;
  photoUrl: string;
  manufacturerId: number;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: number[];
};
