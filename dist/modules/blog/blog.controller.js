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
exports.updateBlog = exports.deleteBlogData = exports.getBlogById = exports.getAllBlog = exports.createBlog = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
exports.createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = 3;
    // const authorId = req.user?.userId;
    // if (!authorId) {
    //     return res.status(401).send({
    //         success: false,
    //         message: "Authorization failed: No valid token or user ID provided."
    //     });
    // }
    // 3. সার্ভিস ফাংশনকে রিকোয়েস্ট বডি এবং authorId পাঠানো হলো
    const blog = yield blog_service_1.blogService.createBlog(req.body, authorId);
    // 4. সফল Response পাঠানো হলো
    res.status(201).send({
        success: true,
        message: "Blog Data Created Successfully",
        data: blog
    });
}));
exports.getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, search, authorId, minViews, maxViews, startDate, endDate, sortBy, order } = req.query;
    const result = yield blog_service_1.blogService.getAllBlogs({
        page: Number(page) || 1,
        limit: Number(limit) || 50,
        search: search,
        authorId: authorId ? Number(authorId) : undefined,
        minViews: minViews ? Number(minViews) : undefined,
        maxViews: maxViews ? Number(maxViews) : undefined,
        startDate: startDate,
        endDate: endDate,
        sortBy: sortBy || "createAt",
        order: order || "desc",
    });
    res.status(200).send(Object.assign({ success: true, message: "Blog data fetched successfully" }, result));
}));
exports.getBlogById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id) {
        throw new Error("Blog ID is missing or invalid.");
    }
    const singleBlog = yield blog_service_1.blogService.getBlogById(id);
    res.status(200).send({
        success: true,
        message: "Single Blog Retrieved Successfully",
        data: singleBlog,
    });
}));
exports.deleteBlogData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBlog = yield blog_service_1.blogService.deleteBlog(Number(req.params.id));
    res.status(201).send({
        success: true,
        message: "Single Blog Deleted Successfully ",
        data: singleBlog
    });
}));
// Update blogs 
exports.updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBlog = yield blog_service_1.blogService.updateBlogs(Number(req.params.id), req.body);
    res.status(201).send({
        success: true,
        message: "Single Blog Updated Successfully ",
        data: singleBlog
    });
}));
