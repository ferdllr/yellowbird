"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
let UserController = class UserController {
    async create(body) {
        const hashedPass = await bcrypt_1.default.hash(body.password, 10);
        const user = new User_1.UserModel({
            name: body.name,
            email: body.email,
            password: hashedPass
        });
        try {
            await user.save();
            return 'OK';
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async login(body) {
        try {
            const user = await User_1.UserModel.findOne({ email: body.email });
            if (!user) {
                return { error: 'Email ou senha incorretos' };
            }
            const passwordMatch = await bcrypt_1.default.compare(body.password, user.password);
            if (!passwordMatch) {
                return { error: 'Email ou senha incorretos' };
            }
            const secretKey = process.env.SECRET_KEY || "";
            const jwtToken = await (0, jsonwebtoken_1.sign)({
                _id: user.id,
                email: user.email,
                name: user.name,
            }, secretKey);
            return { message: 'Login bem-sucedido', token: jwtToken };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async all() {
        try {
            const users = await User_1.UserModel.find();
            return users;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async update(body) {
        try {
            const updatedUser = await User_1.UserModel.findByIdAndUpdate(body.id, body, { new: true });
            const secretKey = process.env.SECRET_KEY || "";
            const jwtToken = await (0, jsonwebtoken_1.sign)({
                _id: body.id,
                email: body.email,
                name: body.name,
            }, secretKey);
            return { result: updatedUser, token: jwtToken };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const user = await User_1.UserModel.findByIdAndDelete(id);
            return { data: user };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getByEmail(email) {
        try {
            const user = await User_1.UserModel.findOne({ email: email });
            if (!user) {
                return { error: 'User not found' };
            }
            return user;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getById(id) {
        try {
            const Post = await User_1.UserModel.findById(id);
            if (!Post) {
                return { error: 'Post not found' };
            }
            return Post;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
};
__decorate([
    (0, tsoa_1.Post)('/create'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
__decorate([
    (0, tsoa_1.Patch)('/update'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)('/getByEmail'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getByEmail", null);
__decorate([
    (0, tsoa_1.Get)('/getById'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
UserController = __decorate([
    (0, tsoa_1.Route)('api/User')
], UserController);
exports.default = UserController;
