import dayjs from "dayjs";
import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import axios from "axios";

const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tramore,Ireland&units=metric&appid=d2b75aa8b4380e1735ee01b663aea663`;

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const date = new Date;
    const now = dayjs(date).format('MM-DD-YYYY, hh:mm:SSS a');
    const newReport = {
        dateAndTime: now,
        code: Number(request.body.code),
        temperature: Number(request.body.temperature),
        windSpeed: Number(request.body.windSpeed),
        windDirection: request.body.windDirection,
        pressure: Number(request.body.pressure)
    };
    console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);

  },

  async generateReport(request, response) {
    console.log("rendering new report");
    let report = {};
    const lat = request.body.latitude;
    const lng = request.body.longitude;
    const latLongRequestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=d2b75aa8b4380e1735ee01b663aea663`;
    const result = await axios.get(latLongRequestUrl);
    console.log(latLongRequestUrl)
    if (result.status == 200) {
      const currentWeather = result.data;
      report.code = currentWeather.weather[0].id;
      report.temperature = currentWeather.main.temp;
      report.windSpeed = currentWeather.wind.speed;
      report.pressure = currentWeather.main.pressure;
      report.windDirection = currentWeather.wind.deg;
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report,
    };
    response.render("station-view", viewData);
  },

  // async generateReport(request, response) {
  //   const station = await stationStore.getStationById(request.params.id);
  //   console.log(`generating report...`);
  //   await reportStore.generateReport(station._id);
  //   response.redirect("/station/" + station._id);

  // },
  

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    await response.redirect("/station/" + stationId);
  },
};