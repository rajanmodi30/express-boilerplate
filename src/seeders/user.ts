import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const USERS: Prisma.UserCreateInput[] = [];

export async function createUser(): Promise<Prisma.UserCreateInput> {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: await bcrypt.hashSync("12345678"),
  };
}

export const users = async (count: number) => {
  for (let i = 0; i < count; i++) {
    USERS.push(await createUser());
  }
  USERS.push({
    firstName: "rajan",
    lastName: "mode",
    email: "rajanmodi30@gmail.com",
    password: bcrypt.hashSync("12345678"),
  });
  return USERS;
};
