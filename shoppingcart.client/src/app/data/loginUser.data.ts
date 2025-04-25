export interface LoginUser {
  id: number;
  username: string;
  role: string;
}
export interface LoginUserResult {
  success: boolean;
  errorMessage?: string;
  data?: LoginUser; // Optional property to hold the user data
}
