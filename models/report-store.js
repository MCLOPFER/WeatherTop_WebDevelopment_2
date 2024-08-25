import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { cardinalDirectionToDegrees } from "../utils/report-utils.js";
import { degreesToCardinalDirection } from "../utils/report-utils.js";
import { kelvinToCelcius } from "../utils/station-utils.js";
import { kelvinToFahrenheit } from "../utils/station-utils.js";
import { getWeatherIcon } from "../utils/store-utils.js";
import axios from "axios";

const reportsdb = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await reportsdb.read();
    return reportsdb.data.reports;
 },

  async addReport(stationId, report) {
    await reportsdb.read();
    report._id = v4();
    report.stationid = stationId;
    report.windDirection = cardinalDirectionToDegrees(report.windDirection);
    reportsdb.data.reports.push(report);
    await reportsdb.write();
    return report;
  },

  async getReportsByStationId(id) {
    await reportsdb.read();
    return reportsdb.data.reports.filter((report) => report.stationid === id);
  },

  async getReportById(id) {
    await reportsdb.read();
    return reportsdb.data.reports.find((report) => report._id === id);
  },

  async deleteReport(id) {
    await reportsdb.read();
    const index = reportsdb.data.reports.findIndex((report) => report._id === id);
    reportsdb.data.reports.splice(index, 1);
    await reportsdb.write();
  },

  async deleteReportList(reportList) {
    await reportsdb.read();
    reportList.forEach(reportToDelete => {
      console.log(`deleting report: ${reportToDelete._id}`)
      const index = reportsdb.data.reports.findIndex((report) => report._id === reportToDelete._id);
      reportsdb.data.reports.splice(index, 1);
    });
    await reportsdb.write();
  },

  async deleteAllReports() {
    reportsdb.data.reports = [];
    await reportsdb.write();
  },

  async updateReport(reportId, updatedReport) {
    const report = await this.getReportById(reportId._id);
    report.dateAndTime = updatedReport.dateAndTime,
    report.code = updatedReport.code;
    report.temperature = updatedReport.temperature;
    report.windSpeed = updatedReport.windSpeed;
    report.windDirection = cardinalDirectionToDegrees(updatedReport.windDirection);
    report.pressure = updatedReport.pressure;
    await reportsdb.write();
  },

  async getReportCurrentWeather(station){
    const APIKey = "d2b75aa8b4380e1735ee01b663aea663";
    let generateReport ={};
    const stationName = station;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${stationName}&appid=${APIKey}`;
    const result =  await axios.get(requestUrl);
    if (result.status == 200) {
      const currentWeather = result.data;
      generateReport.weatherIcon = getWeatherIcon(currentWeather.weather[0].id);
      generateReport.code = currentWeather.weather[0].id;
      generateReport.description = currentWeather.weather[0].description;
      generateReport.temperature = kelvinToCelcius(currentWeather.main.temp);
      generateReport.tempFahrenheit = kelvinToFahrenheit(currentWeather.main.temp);
      generateReport.tempMin = currentWeather.main.temp_min;
      generateReport.tempMax = currentWeather.main.temp_max;
      generateReport.tempFeelsLike = currentWeather.main.feels_like;
      generateReport.windSpeed = currentWeather.wind.speed;
      generateReport.pressure = currentWeather.main.pressure;
      generateReport.windDirection = degreesToCardinalDirection(currentWeather.wind.deg);
      generateReport.windDirectionDegrees = currentWeather.wind.deg;
      generateReport.visibility = currentWeather.visibility;
      generateReport.latitude = currentWeather.coord.lat;
      generateReport.longitude = currentWeather.coord.lon;
    }

    const latestReport = {
    name: stationName,
    latitude: generateReport.latitude,
    longitude: generateReport.longitude,
    weatherIcon: generateReport.weatherIcon,
    code: generateReport.code,
    description: generateReport.description,
    temperature: generateReport.temperature,
    tempFahrenheit: generateReport.tempFahrenheit,
    tempFeelsLike: generateReport.tempFeelsLike,
    tempMin: generateReport.tempMin,
    tempMax: generateReport.tempMax,
    windSpeed: generateReport.windSpeed,
    windDirection: generateReport.windDirection,
    windDirectionDegrees: generateReport.windDirectionDegrees,
    pressure: generateReport.pressure,
    weatherIcon: generateReport.weatherIcon
    }

    return latestReport;
  }
};