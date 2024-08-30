
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { cardinalDirectionToDegrees } from "../utils/utils.js";
import { degreesToCardinalDirection } from "../utils/utils.js";
import { kelvinToCelcius } from "../utils/utils.js";
import { kelvinToFahrenheit } from "../utils/utils.js";
import { getWeatherIcon } from "../utils/utils.js";
//Library component to make API request
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
    //Because the options values are cardinal direction points, convert to degrees
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

  //Pull data from the OpenWeather API
  async getReportCurrentWeather(station, countryCode){
    //Storing APIKey to a variable
    const APIKey = "d2b75aa8b4380e1735ee01b663aea663";
    //Creating generatedReport that will be filled after
    let generateReport ={};
    //Getting Station name and/or country code from the data entry by the user to use it in the API
    const stationName = station;
    const stationCountryCode = countryCode;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${stationName},${stationCountryCode}&appid=${APIKey}`;
    //Axios to make API requests to external services
    const result =  await axios.get(requestUrl);
    //200 indicates a request has succeeded
    if (result.status == 200) {
      //Pulling the data from the API that it will be needed for Stations/Reports
      const currentWeather = result.data;
      generateReport.countryCode = currentWeather.sys.country;
      generateReport.latitude = currentWeather.coord.lat;
      generateReport.longitude = currentWeather.coord.lon;
      generateReport.weatherIcon = getWeatherIcon(currentWeather.weather[0].id);
      generateReport.code = currentWeather.weather[0].id;
      generateReport.description = currentWeather.weather[0].description;
      generateReport.temperature = kelvinToCelcius(currentWeather.main.temp);
      generateReport.tempFahrenheit = kelvinToFahrenheit(currentWeather.main.temp);
      generateReport.tempMin = kelvinToCelcius(currentWeather.main.temp_min);
      generateReport.tempMax = kelvinToCelcius(currentWeather.main.temp_max);
      generateReport.tempFeelsLike = kelvinToCelcius(currentWeather.main.feels_like);
      generateReport.windSpeed = currentWeather.wind.speed;
      generateReport.pressure = currentWeather.main.pressure;
      generateReport.windDirection = degreesToCardinalDirection(currentWeather.wind.deg);
      generateReport.windDirectionDegrees = currentWeather.wind.deg;
      generateReport.visibility = currentWeather.visibility;
    }
    //Creating an array giving value to 'names' used in the HTML
    const latestReport = {
    name: stationName,
    countryCode: generateReport.countryCode,
    latitude: generateReport.latitude,
    longitude: generateReport.longitude,
    weatherIcon: generateReport.weatherIcon,
    code: generateReport.code,
    description: generateReport.description,
    temperature: generateReport.temperature,
    tempFahrenheit: generateReport.tempFahrenheit,
    tempMin: generateReport.tempMin,
    tempMax: generateReport.tempMax,
    tempFeelsLike: generateReport.tempFeelsLike,
    windSpeed: generateReport.windSpeed,
    pressure: generateReport.pressure,
    windDirection: generateReport.windDirection,
    windDirectionDegrees: generateReport.windDirectionDegrees,
    visibility: generateReport.visibility
    }

    return latestReport;
  }
};