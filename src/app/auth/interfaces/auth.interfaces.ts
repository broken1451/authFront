export interface AuthResponse {
  ok: boolean;
  uid?: string;
  userLogin?: UserLoginResponse;
  userCreated?: UserCreateResponse;
  token?: string;
  mensaje?: string;
}

export interface ResponseCreate {
  ok?: boolean;
  userCreated?: UserCreateResponse;
  token?: string;
  message?: string;
  uid?: string;
}

export interface UserLoginResponse {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  created?: Date;
  __v?: number;
}

export interface User {
  ok?: boolean;
  uid?: string;
  userLogin?: UserLoginResponse;
  userCreated?: ResponseCreate;
}

export interface UserCreateResponse {
  created?: string;
  email?: string;
  name?: string;
  password?: string;
  __v?: number;
  _id?: string;
}
