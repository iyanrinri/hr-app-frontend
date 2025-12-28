export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  hasSubordinates?: boolean;
  firstName?: string;
  lastName?: string;
  tenantId?: string;
  tenantSlug?: string;
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

export interface TenantRegisterPayload {
  email: string;
  tenantName: string;
  slug: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface TenantRegisterResponse {
  message: string;
  access_token: string;
  user: User;
}
