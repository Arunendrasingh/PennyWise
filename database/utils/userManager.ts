import { ProfileValues } from "@/config/types";
import { database } from "../database";
import { User } from "../models";

export const createLocalUser = (name: string, email: string) =>
  database.write(async () => {
    return database.get<User>("users").create((user) => {
      user.email = email;
      user.name = name;
    });
  });

export const getLocalUser = () => database.get<User>("users").query().fetch();

export const checkExistingUser = async () => {
  const user = await getLocalUser();
  console.log("User: ", user);

  if (user.length > 0) {
    return user[0];
  } else {
    return null;
  }
};

// Create a user if No user is Present
export const createUser = async (
  userName: string,
  userEmail: string,
  phoneNumber: string
) => {
  const newCreateUser = await database.write(async () => {
    return await database.get<User>("users").create((user) => {
      user.name = userName;
      user.email = userEmail;
      user.phoneNumber = phoneNumber;
    });
  });

  return newCreateUser;
};

// fetch the user using userID.
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await database.get<User>("users").find(userId);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// update the user name
export const updateUserName = async (userId: string, newName: string) => {
  try {
    const user = await database.get<User>("users").find(userId);
    database.write(async () => {
      await user.update((u) => {
        u.name = newName;
      });
    });
  } catch (error) {
    console.log(error);
  }
};


// update the user
export const updateUser = async (
  userId: string,
  updatedUser: ProfileValues
): Promise<User | null> => {
  try {
    const user = await database.get<User>("users").find(userId);
    if (user) {
      await database.write(async () => {
        await user.update((u) => {
          u.name = updatedUser.name;
          u.email = updatedUser.email;
          u.phoneNumber = updatedUser.phoneNumber;
        });
      });
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};