
import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Sign up to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const viewData = {
      title: "Register to the Service",
    };
    const user = request.body;
    console.log(`registering ${user.email}`);
    //Try add user, if email invalid, catching the error and redirect it
    try{
      await userStore.addUser(user);
      response.redirect("/");
    } catch(err) {
      console.log('ERROR: failed to register user');
      console.log(err);
      response.render("signup-view-error", viewData);
    } 
  },

  async authenticate(request, response) {
    const user = await userStore.authenticateUserByEmail(request.body.email, request.body.password);
    if (user) {
      response.cookie("userid", user._id);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      console.log(`Failed login attempt for user: ${request.body.email}`);
      response.render("login-view-error");
    }
  },

  async getLoggedInUser(request) {
    //Saving the user ID as a cookie
    const userId = request.cookies.userid;
    return await userStore.getUserById(userId);
  },
};