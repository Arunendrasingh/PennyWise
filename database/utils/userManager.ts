import { database } from "../database";
import { User } from "../models";

export const createLocalUser = (name: string, email: string) =>
  database.write(async () => {
    return database.get<User>("users").create((user) => {
      user.email = email;
      user.name = name;
    });
  });

export const getLocalUser = () => database.get<User>("users").query().fetch()


