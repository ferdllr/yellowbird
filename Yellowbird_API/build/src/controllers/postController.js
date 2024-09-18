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
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const Post_1 = require("../models/Post");
class PostRequestBody {
}
class PostUpdateBody {
}
let PostController = class PostController {
    async create(body) {
        const Post = new Post_1.PostModel(body);
        try {
            await Post.save();
            return 'OK';
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async getAll() {
        try {
            const Posts = await Post_1.PostModel.find();
            return Posts;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async update(body) {
        try {
            const updatedPost = await Post_1.PostModel.findByIdAndUpdate(body.id, body, { new: true });
            return { result: updatedPost };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const Post = await Post_1.PostModel.findByIdAndDelete(id);
            return { data: Post };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getById(id) {
        try {
            const Post = await Post_1.PostModel.findById(id);
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
    __metadata("design:paramtypes", [PostRequestBody]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAll", null);
__decorate([
    (0, tsoa_1.Patch)('/update'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostUpdateBody]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/:id'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)('/getById'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getById", null);
PostController = __decorate([
    (0, tsoa_1.Route)('api/Post')
], PostController);
exports.default = PostController;
