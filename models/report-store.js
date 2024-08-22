import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { cardinalDirectionToDegrees } from "../utils/report-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();
    report._id = v4();
    report.stationid = stationId;
    report.windDirection = cardinalDirectionToDegrees(report.windDirection);
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  // async generateReport(stationId) {
  //   await db.read();
  //   const report = {
  //     _id: v4(),
  //     stationid: stationId,
  //     dateAndTime: "RANDOM",
  //     code: "RANDOM",
  //     temperature: "RANDOM",
  //     windSpeed: "RANDOM",
  //     windDirection: "RANDOM",
  //     pressure: "RANDOM"
  //   }
  //   db.data.reports.push(report);
  //   await db.write();
  //   return report;
  // },

  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationid === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  async deleteReportList(reportList) {
    await db.read();
    reportList.forEach(reportToDelete => {
      console.log(`deleting report: ${reportToDelete._id}`)
      const index = db.data.reports.findIndex((report) => report._id === reportToDelete._id);
      db.data.reports.splice(index, 1);
    });
    await db.write();
  },

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },

  async updateReport(reportId, updatedReport) {
    const report = await this.getReportById(reportId._id);
    report.dateAndTime = updatedReport.dateAndTime,
    report.code = updatedReport.code;
    report.temperature = updatedReport.temperature;
    report.windSpeed = updatedReport.windSpeed;
    report.windDirection = cardinalDirectionToDegrees(updatedReport.windDirection);
    report.pressure = updatedReport.pressure;
    await db.write();
  },
};