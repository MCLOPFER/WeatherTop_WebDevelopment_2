import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { validateEmail } from "../utils/account-utils.js";

const db = initStore("users");

export const userStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    if(!validateEmail(user.email)){
      throw "ERROR: Invalid email";
    }
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    console.log(`searching users for id: ${id}`)
    return db.data.users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    await db.read();
    console.log(`searching users for email: ${email}`)
    return await db.data.users.find((user) => user.email === email);
  },

  async authenticateUserByEmail(email, password) {
    await db.read();
    const user = db.data.users.find((user) => user.email === email);
    if(user){
      if( user.password === password){
        console.log(`Successfully authenticated user: ${email}`);
        return user;
      } else {
        console.log(`Authentication error, user: ${email}`);
        return null;
      }
    } else {
      console.log(`Authentication error, user not found: ${email}`);
      return null;
    }
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  async updateUser(userId, updatedUser) {
    const user = await this.getUserById(userId);
    user.firstName = updatedUser.firstName;
    user.lastName =  updatedUser.lastName;
    user.email = updatedUser.email;
    if(!validateEmail(user.email)){
      throw "ERROR: Invalid email";
    }
    await db.write();
  }
};
