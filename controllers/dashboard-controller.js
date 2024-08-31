
import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";


export const dashboardController = { 

  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      name: "Station Dashboard",
      stations: await stationStore.getStationsByUserIdAlphabetically(loggedInUser._id),
      userid: loggedInUser._id
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      name: "Station Dashboard",
      stations: await stationStore.getStationsByUserIdAlphabetically(loggedInUser._id),
      userid: loggedInUser._id
    };
    let latestReport = {};
    let newStation = {};
    //Try add new station, if details entered are invalid, catching the error and redirect it
    try{
      latestReport = await reportStore.getReportCurrentWeather(request.body.name, request.body.countryCode);
      newStation = {
        name: (request.body.name).charAt(0).toUpperCase() + (request.body.name).slice(1),
        userid: loggedInUser._id,
        latestReport
      }
      console.log(`Adding Station ${newStation.name}`);
      await stationStore.addStation(newStation);
      response.redirect("/dashboard");
    } catch(err){
      console.log(`ERROR: failed to add Station: ${err}`);
      response.render("dashboard-view-error", viewData);
    }
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Cascade deleting Station and all reports ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },

  async countryCodeInfo(request, response) {
    const userId = await accountsController.getLoggedInUser(request);
    const countryCodes = await stationStore.getcountryCodes();
    const viewData = {
      title: "Country Codes Info",
      countryCodes,
      userid: userId._id
    };
    response.render("countryCodeInfo-view", viewData);
  }
};
