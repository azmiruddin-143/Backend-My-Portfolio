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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardServices = exports.getTodayVisitors = exports.getVisitorStats = exports.getAllVisitors = void 0;
const db_1 = require("../../config/db");
const getDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield db_1.prisma.user.count();
    const totalProject = yield db_1.prisma.project.count();
    const totalBlogs = yield db_1.prisma.blog.count();
    const totalResumes = yield db_1.prisma.resume.count();
    const admins = yield db_1.prisma.user.count({ where: { role: "ADMIN" } });
    const normalUsers = yield db_1.prisma.user.count({ where: { role: "USER" } });
    const totalViews = yield db_1.prisma.blog.aggregate({
        _sum: {
            views: true
        }
    });
    const recentBlog = yield db_1.prisma.blog.findMany({
        orderBy: {
            createAt: "desc"
        }
    });
    const recentProject = yield db_1.prisma.project.findMany({
        orderBy: {
            createAt: "desc"
        }
    });
    const recentResume = yield db_1.prisma.resume.findMany({
        orderBy: {
            createAt: "desc"
        }
    });
    const topViews = yield db_1.prisma.blog.findMany({
        orderBy: {
            views: "desc"
        },
        take: 5,
    });
    return {
        totalUsers,
        admins,
        normalUsers,
        totalBlogs,
        totalResumes,
        totalProject,
        totalBlogViews: totalViews._sum.views || 0,
        recentBlog,
        recentResume,
        recentProject,
        topViews,
    };
});
// -------------Visitor Activity Log -------------------
const getAllVisitors = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const visitors = yield db_1.prisma.visitorLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
    });
    const total = yield db_1.prisma.visitorLog.count();
    return {
        visitors,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
exports.getAllVisitors = getAllVisitors;
const getVisitorStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalVisitors = yield db_1.prisma.visitorLog.count();
    // Unique visitors by IP
    const uniqueVisitors = yield db_1.prisma.visitorLog.groupBy({
        by: ["ip"],
        _count: { ip: true },
    });
    const deviceStats = yield db_1.prisma.visitorLog.groupBy({
        by: ["device"],
        _count: { device: true },
    });
    return {
        totalVisitors,
        uniqueVisitors: uniqueVisitors.length,
        deviceStats,
    };
});
exports.getVisitorStats = getVisitorStats;
// ------------- Today Active User -------------------------
// Get Today's Visitors
const getTodayVisitors = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = yield db_1.prisma.visitorLog.count({
        where: {
            createdAt: {
                gte: today,
            },
        },
    });
    return { todayVisitors: count };
});
exports.getTodayVisitors = getTodayVisitors;
exports.dashboardServices = {
    getDashboardStats,
};
