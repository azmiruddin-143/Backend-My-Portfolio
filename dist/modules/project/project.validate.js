"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    title: zod_1.z.string().min(4, { message: "Title must be at least 4 characters long" }).max(100, { message: "Title must be a maximum 100 charcter" }).trim(),
    description: zod_1.z.string().min(10, { message: "description must be at least  10 characters" }).max(300, { message: "description must be a maximum chatcter 300 " }).trim(),
    features: zod_1.z.array(zod_1.z.string()).nonempty(),
    thumbnail: zod_1.z.array(zod_1.z.string().url()).nonempty(),
    liveUrl: zod_1.z.string().url().min(4, { message: "Title must be url http or https" }),
    projectUrl: zod_1.z.string().url().min(4, { message: "Title must be url http or https" }),
    authorId: zod_1.z.number().int().positive()
});
