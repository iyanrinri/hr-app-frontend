export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  hasSubordinates?: boolean;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}
