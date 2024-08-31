
import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { accountsController } from "./accounts-controller.js";
import dayjs from "dayjs";
import axios from "axios";

export const stationController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
      userid: loggedInUser._id
    };

    let trendChartReport = {};
    const APIKey = "d2b75aa8b4380e1735ee01b663aea663";
    const stationName = station.name;
    const stationCountryCode = station.countryCode;
    const chartUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${stationName},${stationCountryCode}&units=metric&appid=${APIKey}`;
    const result = await axios.get(chartUrl);
    //The result of the API is a json file with the weather from X every 3 hourse since now
    //if result == successful
    if (result.status == 200) {
      //Getting the following information, from each element, from the array return from the API:
      //list.main.temp
      trendChartReport.tempTrend = [];
      //list.main.temp_max
      trendChartReport.tempMax = [];
      //list.main.temp_min
      trendChartReport.tempMin = [];
      //list.main.feels_like
      trendChartReport.feelsLike = [];
      //list.dt_text (date and time)
      trendChartReport.trendLabels = [];
      //list.main.humidity
      trendChartReport.humidity = [];
      const trends = result.data.list;

      //Using the first 10 elements returned from the API 
      for (let i=0; i<10; i++) {
        trendChartReport.tempTrend.push(trends[i].main.temp);
        trendChartReport.tempMax.push(trends[i].main.temp_max);
        trendChartReport.tempMin.push(trends[i].main.temp_min);
        trendChartReport.feelsLike.push(trends[i].main.feels_like);
        trendChartReport.trendLabels.push((trends[i].dt_txt.substring(11,16)));
        trendChartReport.humidity.push(trends[i].main.humidity);
      }
    }
    //Adding trendData to the viewData
    viewData.trendData = trendChartReport;
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
    console.log(`Adding new Report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },
  
  async generateReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const date = new Date;
    const now = dayjs(date).format('DD-MM-YYYY, hh:mm:SSS a');

    const latestReport = await reportStore.getReportCurrentWeather(station.name, station.countryCode);
    latestReport.dateAndTime = now;

    console.log(`Adding Report ${latestReport.code}`);
    await reportStore.addReport(station._id, latestReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    console.log(stationId)
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    await response.redirect("/station/" + stationId);
  } 
};