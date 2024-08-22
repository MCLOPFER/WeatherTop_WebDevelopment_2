import { userStore } from "../models/user-store.js";

export const userController = {
    async index(request, response) {
      const currentUser = await userStore.getUserById(request.params.userid);
      const viewData = {
        userid: request.params.userid,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "********"
      };
      console.log("user details rendering");
      response.render("user-view", viewData);
    },

  
    async update(request, response) {
      const userId = request.params.userid;
      const currentUser = await userStore.getUserById(userId);
       const viewData = {
         userid: userId,
         firstName: currentUser.firstName,
         lastName: currentUser.lastName,
         email: currentUser.email,
         password: "********"
       };
      const userUpdate = {
        userid: userId,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: "********"
      };
      console.log(`Updating User ${userId}`);
      try{
        await userStore.updateUser(userId, userUpdate);
        console.log("User updated successfully")
        response.cookie("station", userUpdate.email);
        response.render("user-view-updated-successfully", userUpdate);
      } catch(err) {
        console.log('ERROR: failed to update user');
        console.log(err);
        response.render("user-view-error", viewData);
      } 
    }
  };
