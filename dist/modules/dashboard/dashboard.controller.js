"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayVisitorsController = exports.getVisitorStatsController = exports.getVisitorsController = exports.dashboardController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const dashboard_service_1 = require("./dashboard.service");
exports.dashboardController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statics = yield dashboard_service_1.dashboardServices.getDashboardStats();
    res.status(200).send({
        success: true,
        message: "Statics All Data Retrived Successfully",
        data: statics
    });
}));
// --------------VisitorLogger Activity Log ----------------
const getVisitorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const data = yield (0, dashboard_service_1.getAllVisitors)(page, limit);
    res.json(Object.assign({ success: true }, data));
});
exports.getVisitorsController = getVisitorsController;
const getVisitorStatsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield (0, dashboard_service_1.getVisitorStats)();
    res.json({ success: true, stats });
});
exports.getVisitorStatsController = getVisitorStatsController;
// -----------------Today Total Visitor---------------
const getTodayVisitorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, dashboard_service_1.getTodayVisitors)();
    res.json(Object.assign({ success: true, message: "Today's visitors fetched successfully" }, data));
});
exports.getTodayVisitorsController = getTodayVisitorsController;
