export type Passowrd = 'user' | 'admin';

export class User {
  email: string;
  role: Passowrd;
  password: string;
}
