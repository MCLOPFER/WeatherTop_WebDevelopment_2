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
    const station = {
      name: request.body.name,
      userid: loggedInUser._id
    };
    const latestReport = await reportStore.getReportCurrentWeather(station.name);
    const newStation = {
      name: station.name,
      latestReport,
      userid: loggedInUser._id
     };

    console.log(newStation.latestReport.code);
    console.log(newStation.latestReport.weatherIcon)
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Cascade deleting Station and all reports ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  }
};
