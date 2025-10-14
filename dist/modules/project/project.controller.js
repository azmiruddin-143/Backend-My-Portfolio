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
exports.deleteBlogData = exports.getProjectByIdController = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const project_service_1 = require("./project.service");
const project_validate_1 = require("./project.validate");
exports.createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedBody = yield project_validate_1.projectSchema.parseAsync(req.body);
    const project = yield project_service_1.projectService.createProject(validatedBody);
    res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project
    });
}));
exports.getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const search = req.query.search || "";
    const authorId = req.query.authorId ? Number(req.query.authorId) : undefined;
    const features = req.query.features ? req.query.features.split(",") : [];
    const projects = yield project_service_1.projectService.getAllProjects({ page, limit, search, authorId, features });
    res.status(200).json({
        success: true,
        message: "Projects retrieved successfully",
        data: projects
    });
}));
exports.getProjectById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_service_1.projectService.getProjectID(Number(req.params.id));
    res.status(200).send({
        success: true,
        message: "Single Project Get Successfully",
        data: project
    });
}));
exports.updateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_service_1.projectService.updateProjects(Number(req.params.id), req.body);
    res.status(200).send({
        success: true,
        message: " Project Update  Successfully",
        data: project
    });
}));
exports.deleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_service_1.projectService.deleteProject(Number(req.params.id));
    res.status(200).send({
        success: true,
        message: " Project Delete  Successfully",
        data: project
    });
}));
// ---------  Top project Views and Top Click Project Card Take in 5 data-----------
const getProjectByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = Number(req.params.id);
    if (isNaN(projectId)) {
        return res.status(400).json({ success: false, message: "Invalid project ID" });
    }
    const project = yield (0, project_service_1.getProjectByIdAndIncrement)(projectId);
    if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({
        success: true,
        message: "Project retrieved & click count incremented successfully",
        project,
    });
});
exports.getProjectByIdController = getProjectByIdController;
exports.deleteBlogData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleProject = yield project_service_1.projectService.deleteProject(Number(req.params.id));
    res.status(201).send({
        success: true,
        message: "single Project Deleted Successfully ",
        data: singleProject
    });
}));
