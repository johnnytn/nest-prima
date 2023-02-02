// export type RoleType = 'user' | 'admin';
export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
}

export class History {
  id: string;
  userId: string;
  symbol: string;
  metadata: JSON;
}

export class User {
  id: string;
  email: string;
  role: RoleType;
  password: string;
}
