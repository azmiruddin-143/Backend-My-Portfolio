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
exports.blogService = void 0;
const db_1 = require("../../config/db");
const createBlog = (payload, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    // Prisma-তে ব্লগ তৈরি করার সময় authorId কে data অবজেক্টের মধ্যে যুক্ত করা হলো।
    const blog = yield db_1.prisma.blog.create({
        data: Object.assign(Object.assign({}, payload), { 
            // ✅ সমস্যার সমাধান: JWT থেকে আসা লেখকের ID যুক্ত করা হলো
            authorId: authorId })
    });
    return blog;
});
const getAllBlogs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, search, authorId, minViews, maxViews, startDate, endDate, sortBy = "createAt", order = "desc", }) {
    const skip = (page - 1) * limit;
    const where = {};
    //  search filter
    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
        ];
    }
    // 👤 author filter
    if (authorId) {
        where.authorId = authorId;
    }
    if (minViews || maxViews) {
        where.views = {};
        if (minViews)
            where.views.gte = minViews;
        if (maxViews)
            where.views.lte = maxViews;
    }
    if (startDate || endDate) {
        where.createAt = {};
        if (startDate)
            where.createAt.gte = new Date(startDate);
        if (endDate)
            where.createAt.lte = new Date(endDate);
    }
    const blogs = yield db_1.prisma.blog.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
            [sortBy]: order,
        },
        select: {
            id: true,
            title: true,
            content: true,
            image: true,
            views: true,
            createAt: true,
            updateAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    const total = yield db_1.prisma.blog.count({ where });
    return {
        data: blogs,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
// const getBlogById = async (id:number) => {
//     const singleBlog = await prisma.blog.update({
//         where:{id},
//         data:{
//           views:{
//             increment:1
//           }
//         }
//     })
//     return singleBlog
// }
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield db_1.prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) {
        throw new Error("Blog not found");
    }
    const updatedBlog = yield db_1.prisma.blog.update({
        where: { id },
        data: {
            views: { increment: 1 },
        },
    });
    return updatedBlog;
});
// Update Blog
const updateBlogs = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.update({
        where: {
            id: id
        },
        data: data
    });
    return blog;
});
// delete blog 
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const del = yield db_1.prisma.blog.delete({
        where: { id }
    });
    return deleteBlog;
});
exports.blogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlogs,
};
