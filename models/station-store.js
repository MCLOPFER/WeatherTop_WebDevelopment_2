import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { sortListAlphabeticallyByName } from "../utils/station-utils.js";
import { reportStore } from "./report-store.js";

//need to create reportdb to delete on cascade
const stationsdb = initStore("stations");
const reportsdb = initStore("reports");

export const stationStore = {
  async getAllStations() {
    await stationsdb.read();
    return stationsdb.data.stations;
  },

  async addStation(station) {
    await stationsdb.read();
    station._id = v4();
    stationsdb.data.stations.push(station);
    await stationsdb.write();
    return station;
  },

  async getStationById(id) {
    await stationsdb.read();
    const list = stationsdb.data.stations.find((station) => station._id === id);
    list.reports = await reportStore.getReportsByStationId(list._id);
    return list;
  },

  async deleteStationById(stationid) {
    await stationsdb.read();
    await reportsdb.read();

    // generate a list of report objects to delete
    const stationReports = reportsdb.data.reports.filter((report) => report.stationid === stationid);
    await reportStore.deleteReportList(stationReports);

    // finally once the stations assosiated reports are deleted, delete the station
    const stationIndex = stationsdb.data.stations.findIndex((station) => station._id === stationid);
    stationsdb.data.stations.splice(stationIndex, 1);
    await stationsdb.write();
  },

  async deleteAllStations() {
    stationsdb.data.stations = [];
    await stationsdb.write();
  },

  async getStationsByUserId(userid) {
    await stationsdb.read();
    return stationsdb.data.stations.filter((station) => station.userid === userid);
  },

  async getStationsByUserIdAlphabetically(userid) {
    await stationsdb.read();
    return sortListAlphabeticallyByName(stationsdb.data.stations.filter((station) => station.userid === userid));
  },
};