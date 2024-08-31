
import { accountsController } from "./accounts-controller.js";

export const aboutController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "About WeatherTop",
      userid: loggedInUser._id
    };
    console.log("About rendering");
    response.render("about-view", viewData);
  },
};


