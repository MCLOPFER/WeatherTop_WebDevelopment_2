
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { validateEmail } from "../utils/utils.js";
import { stationStore } from "./station-store.js";

const userdb = initStore("users");
const stationsdb = initStore("stations");
const reportsdb = initStore("reports");

export const userStore = {
  async addUser(user) {
    //if an invalid email is entered throw error
    if(!validateEmail(user.email)){
      throw "ERROR: Invalid email";
    }
    await userdb.read();
    user._id = v4();
    userdb.data.users.push(user);
    await userdb.write();
    return user;
  },

  async getUserById(id) {
    await userdb.read();
    console.log(`searching users for id: ${id}`)
    return userdb.data.users.find((user) => user._id === id);
  },

  async authenticateUserByEmail(email, password) {
    await userdb.read();
    //Find user by email
    const user = userdb.data.users.find((user) => user.email === email);
    //if user found
    if(user){
      //if password of user found matches the password entered
      if( user.password === password){
        //authentication successful
        console.log(`Successfully authenticated user: ${email}`);
        return user;
      //if password does not match with the password entered
      } else {
        //authentication failed
        console.log(`Authentication error, user: ${email}`);
        return null;
      }
    //if user not found, authentication failed
    } else {
      console.log(`Authentication error, user not found: ${email}`);
      return null;
    }
  },

  async deleteUserById(userid) {
    await userdb.read();
    await stationsdb.read();
    await reportsdb.read();
    //Generate a list of stations objects by user Id
    const stationList = stationsdb.data.stations.filter((station) => station.userid === userid);
    //Deleting the list of stations
    stationList.forEach(stationToDelete => {
      console.log(`deleting users station: ${stationToDelete._id}`);
      //Deleting reports on cascade from 'stationStore.deleteStationById()'
      stationStore.deleteStationById(stationToDelete._id);
    });
    //Deleting user
    const index = userdb.data.users.findIndex((user) => user._id === userid);
    userdb.data.users.splice(index, 1);
    await userdb.write();
  },

  async updateUser(userId, updatedUser) {
    const user = await this.getUserById(userId);
    user.firstName = updatedUser.firstName;
    user.lastName =  updatedUser.lastName;
    user.email = updatedUser.email;
    //if an invalid email is entered throw error
    if(!validateEmail(user.email)){
      throw "ERROR: Invalid email";
    }
    await userdb.write();
  }
};
