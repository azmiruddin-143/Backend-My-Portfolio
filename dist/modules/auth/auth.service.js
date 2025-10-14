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
exports.authService = exports.userLogin = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a User Account 
const userCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const existingUser = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User Already Exist");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield db_1.prisma.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashedPassword }),
    });
    if (!user) {
        throw new Error("User Not Found");
    }
    console.log(user);
    return user;
});
//  for using Production and HTTPS secure
// export const userLogin = async (payload: ILogin, res: Response) => {
//   const user = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });
//   if (!user) {
//     throw new Error("User Not Found in DB");
//   }
//   const isMatchPassword = await bcrypt.compare(payload.password, user.password);
//   if (!isMatchPassword) {
//     throw new Error("Password Didn't Match");
//   }
//   const token = jwt.sign(
//     { userId: user.id, role: user.role },
//     process.env.JWT_SECRET_KEY as string,
//     { expiresIn: process.env.JWT_EXPIRE_KEY || "10d"}
//   );
//  res.cookie("token", token, {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production", 
//     secure: process.env.NODE_ENV === "development", 
//     maxAge: 30 * 24 * 60 * 60 * 1000, 
//   });
//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };
// };
const userLogin = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (!user) {
        throw new Error("User Not Found in DB");
    }
    const isMatchPassword = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isMatchPassword) {
        throw new Error("Password Didn't Match");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_KEY || "10d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
});
exports.userLogin = userLogin;
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findMany();
    if (!user) {
        throw new Error("User Not Found");
    }
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const del = yield db_1.prisma.user.delete({
        where: { id }
    });
    return deleteUser;
});
const userLogout = (res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        expires: new Date(0),
    });
    return { message: "Logout successful. Cookie cleared." };
};
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.user.update({
        where: {
            id: id
        },
        data: data
    });
    return blog;
});
exports.authService = {
    userCreate,
    userLogin: exports.userLogin,
    allUsers,
    userLogout,
    deleteUser,
    updateUser
};
