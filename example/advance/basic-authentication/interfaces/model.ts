export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  deleted?: boolean;
}

export interface IAuth {
  email: string;
  user: string;
  password: string;
  deleted?: boolean;
}
