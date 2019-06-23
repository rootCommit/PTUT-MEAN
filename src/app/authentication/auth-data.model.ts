export interface AuthData {
  firstname: string;
  lastname: string;
  age: number;
  address: string;
  city: string;
  postalCode: number;
  country: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
