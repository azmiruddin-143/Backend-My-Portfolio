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
exports.projectService = exports.getProjectByIdAndIncrement = void 0;
const db_1 = require("../../config/db");
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.project.create({
        data: {
            title: payload.title,
            description: payload.description,
            features: payload.features,
            thumbnail: payload.thumbnail,
            liveUrl: payload.liveUrl,
            projectUrl: payload.projectUrl,
            user: {
                connect: { id: payload.authorId }
            }
        }
    });
});
const getAllProjects = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit, search, authorId, features }) {
    const skip = (page - 1) * limit;
    const where = {};
    if (search && search.trim() !== "") {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } }
        ];
    }
    if (authorId) {
        where.authorId = authorId;
    }
    if (features && features.length > 0) {
        where.features = { hasEvery: features };
    }
    const data = yield db_1.prisma.project.findMany({
        skip,
        take: limit,
        where,
        orderBy: { id: "asc" },
        include: {
            user: { select: { id: true, name: true, email: true } }
        }
    });
    const total = yield db_1.prisma.project.count({ where });
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
});
// todo Get project Single Id 
const getProjectID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.findUnique({
        where: { id }
    });
    return project;
});
const updateProjects = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield db_1.prisma.project.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("Project not found with this ID");
    }
    const project = yield db_1.prisma.project.update({
        where: { id },
        data: payload
    });
    return project;
});
const getProjectByIdAndIncrement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.findUnique({ where: { id } });
    if (!project)
        return null;
    const updated = yield db_1.prisma.project.update({
        where: { id },
        data: {
            clickCount: { increment: 1 },
        },
    });
    return updated;
});
exports.getProjectByIdAndIncrement = getProjectByIdAndIncrement;
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const del = yield db_1.prisma.project.delete({
        where: { id }
    });
    return deleteProject;
});
exports.projectService = {
    createProject,
    getAllProjects,
    getProjectID,
    updateProjects,
    deleteProject,
};
