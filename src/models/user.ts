import { PrismaClient } from "@prisma/client";
import { ModelObject } from "./interfaces/main";

export class UserObject implements ModelObject {
  static prisma: PrismaClient = new PrismaClient();
  static user = UserObject.prisma.user;

  constructor(private id: number) {}

  async is_found(): Promise<boolean> {
    const cnt = await UserObject.user.count({
      where: {
        id: this.id,
      },
    });
    return cnt > 0;
  }
  async get(): Promise<any> {
    return UserObject.user.findUnique({
      where: {
        id: this.id,
      },
    });
  }
  update(body: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
