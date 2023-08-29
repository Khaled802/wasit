import { PrismaClient, User, Prisma } from "@prisma/client";
import { ModelList } from "./interfaces/main";
import { LoginBody, UserSafeBody } from "./interfaces/users";
import bcrypt from "bcrypt";
import { IAuth } from "./interfaces/auth";
import { CError } from "../errors/custome_error";
import { StatusCodes } from "http-status-codes";

export class Auth implements IAuth {
  static prisma: PrismaClient = new PrismaClient();
  static user = Auth.prisma.user;

  static async is_username_found(username: string) {
    const cnt = await this.user.count({ where: { username } });
    return cnt > 0;
  }

  static async is_email_found(email: string) {
    const cnt = await this.user.count({ where: { email } });
    return cnt > 0;
  }

  static async encrypt_password(password: string) {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async signup(body: UserSafeBody): Promise<any> {
    const { username, email, password } = body;
    const hashed_password = await Auth.encrypt_password(password);
    return Auth.user.create({
      data: {
        username,
        email,
        password: hashed_password,
      },
    });
  }

  async signin(body: LoginBody): Promise<User> {
    const { email, password } = body;
    const user = await Auth.user.findUnique({
      where: {
        email,
      },
    });
    if (user === null) 
      throw new CError('User not found', StatusCodes.BAD_REQUEST);

    if (!(await bcrypt.compare(password, user.password)))
      throw new CError('password is wrong', StatusCodes.BAD_REQUEST);

    return user;
  }
}
