import { LoginBody, UserSafeBody } from "./users";

export class AuthABS {
  static async is_username_found(username: string):Promise<boolean> {
    throw new Error('not implemented')
  }
  static async is_email_found(username: string): Promise<boolean> {
    throw new Error('not implemented')
  }
}


export interface IAuth {
  signup(body: UserSafeBody): Promise<any>;
  signin(body: LoginBody): Promise<any>;
}