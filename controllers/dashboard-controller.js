import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";
import axios from "axios";


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
    const newstation = {
      name: request.body.name,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userid: loggedInUser._id
    };
    console.log(`adding station ${newstation.name}`);
    await stationStore.addStation(newstation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Cascade deleting Station and all reports ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  }
};


// async addReport(request, response) {
//   const station = await stationStore.getStationById(request.params.id);
//   const newReport = {
//       code: Number(request.body.code),
//       temperature: Number(request.body.temperature),
//       windSpeed: Number(request.body.windSpeed),
//       windDirection: request.body.windDirection,
//       pressure: Number(request.body.pressure)
//   };
//   console.log(`adding report ${newReport.code}`);
//   await reportStore.addReport(station._id, newReport);
//   response.redirect("/station/" + station._id);