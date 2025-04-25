import { LoginUser } from '../data/loginUser.data';

export interface LoginResponse {
  jwt: string; // JWT token returned from the server
  data: LoginUser; // User data returned from the server
}
