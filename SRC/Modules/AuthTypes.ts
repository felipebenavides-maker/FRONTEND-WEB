export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
