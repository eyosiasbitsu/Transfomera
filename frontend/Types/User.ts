export interface PasswordResetParameter{
    userId: string;
    oldPassword: string;
    newPassword: string;
  }

export interface User {
  _id: string;
  email: string;
  fullname: string;
  password: string;
  role: string;
}