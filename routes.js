import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { reportController } from "./controllers/report-controller.js";
import { accountsController } from './controllers/accounts-controller.js';
import { userController } from "./controllers/user-controller.js";


export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.get("/countryCodeInfo", dashboardController.countryCodeInfo);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", stationController.addReport);
router.post("/station/:id/generatereport", stationController.generateReport);
router.get("/station/:stationid/editreport/:reportid", reportController.index);
router.post("/station/:stationid/updatereport/:reportid", reportController.update);
router.get("/station/:stationid/deletereport/:reportid", stationController.deleteReport);

router.get("/user/:userid", userController.index);
router.post("/user/:userid/update", userController.update);
router.get("/deleteuser", userController.deleteUser);

router.get("/about", aboutController.index);

