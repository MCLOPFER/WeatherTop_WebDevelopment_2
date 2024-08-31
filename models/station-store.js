
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { sortListAlphabeticallyByName } from "../utils/utils.js";
import { reportStore } from "./report-store.js";

const stationsdb = initStore("stations");
//Create reportdb to delete on cascade
const reportsdb = initStore("reports");
//Create countryCodesdb to read countryCodes.json
const countryCodesdb = initStore("countryCodes");

export const stationStore = {
  //Reading de data from countryCodes.json file
  async getcountryCodes(){
    await countryCodesdb.read();
    return countryCodesdb.data.countryCodes;
  },

  async addStation(station) {
    await stationsdb.read();
    station._id = v4();
    stationsdb.data.stations.push(station);
    await stationsdb.write();
    return station;
  },

  async getStationById(stationid) {
    await stationsdb.read();
    const list = stationsdb.data.stations.find((station) => station._id === stationid);
    list.reports = await reportStore.getReportsByStationId(list._id);
    return list;
  },

  async deleteStationById(stationid) {
    await stationsdb.read();
    await reportsdb.read();
    //Generate a list of report objects to delete
    const stationReports = reportsdb.data.reports.filter((report) => report.stationid === stationid);
    await reportStore.deleteReportList(stationReports);
    //Finally once the stations assosiated reports are deleted, delete the station
    const stationIndex = stationsdb.data.stations.findIndex((station) => station._id === stationid);
    stationsdb.data.stations.splice(stationIndex, 1);
    await stationsdb.write();
  },

  async getStationsByUserId(userid) {
    await stationsdb.read();
    return stationsdb.data.stations.filter((station) => station.userid === userid);
  },

  //Generate a list of stations by user Id and sorting the list Alphabetically
  async getStationsByUserIdAlphabetically(userid) {
    await stationsdb.read();
    return sortListAlphabeticallyByName(stationsdb.data.stations.filter((station) => station.userid === userid));
  },

};