export interface IUser {
  id: string;
  name: string;
  email: string;
  access_token: string
  refresh_token: string;
}

export interface IUserLoginResponse {
  id: string;
  name: string;
  email: string;
  access_token: string
  refresh_token: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
