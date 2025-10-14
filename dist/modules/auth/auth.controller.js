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
exports.updateUser = exports.userLogoutController = exports.getProfile = exports.deleteUserData = exports.totalUsers = exports.loginUser = exports.registerUser = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
// User Register 
exports.registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = yield auth_service_1.authService.userCreate(req.body);
    res.status(201).send({
        success: true,
        message: "User Created Successfully",
        data: UserData
    });
}));
// User Login 
exports.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.userLogin(req.body, res);
    res.status(200).send({
        success: true,
        message: "User Login Successfully",
        user,
    });
}));
exports.totalUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.allUsers();
    res.status(200).send({
        sucess: true,
        message: "All User Retrived Successfully!",
        data: user
    });
}));
exports.deleteUserData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBlog = yield auth_service_1.authService.deleteUser(Number(req.params.id));
    res.status(201).send({
        success: true,
        message: "Single User Deleted Successfully ",
        data: singleBlog
    });
}));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.json({ success: true, user });
});
exports.getProfile = getProfile;
const userLogoutController = (req, res) => {
    try {
        const result = auth_service_1.authService.userLogout(res);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during logout."
        });
    }
};
exports.userLogoutController = userLogoutController;
exports.updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBlog = yield auth_service_1.authService.updateUser(Number(req.params.id), req.body);
    res.status(201).send({
        success: true,
        message: "Single User Updated Successfully ",
        data: singleBlog
    });
}));
