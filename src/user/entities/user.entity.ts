// export type RoleType = 'user' | 'admin';
export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  email: string;
  role: RoleType;
  password: string;
}
