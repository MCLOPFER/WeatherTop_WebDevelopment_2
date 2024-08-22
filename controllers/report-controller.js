
import dayjs from "dayjs";
import { reportStore } from "../models/report-store.js";
import { stationStore } from "../models/station-store.js";

export const reportController = {
    async index(request, response) {
      const stationId = request.params.stationid;
      const reportId = request.params.reportid;
      console.log(`Editing Report ${reportId} from Station ${stationId}`);
      const viewData = {
        title: "Edit Report",
        station: await stationStore.getStationById(stationId),
        report: await reportStore.getReportById(reportId),
      };
      response.render("report-view", viewData);
    },
  
    async update(request, response) {
      const stationId = request.params.stationid;
      const reportId = request.params.reportid;
      const date = new Date;
      const now = dayjs(date).format('MM-DD-YYYY,hh:mm:SSS a');
      const updatedReport = {
        dateAndTime: now,
        code: Number(request.body.code),
        temperature: Number(request.body.temperature),
        windSpeed: Number(request.body.windSpeed),
        windDirection: request.body.windDirection,
        pressure: Number(request.body.pressure),
      };
      console.log(`Updating Report ${reportId} from Station ${stationId}`);
      const report = await reportStore.getReportById(reportId);
      await reportStore.updateReport(report, updatedReport);
      await response.redirect("/station/" + stationId);
    },
  };