"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async (databaseUrl) => {
    try {
        await mongoose_1.default.connect(databaseUrl);
        console.log('Database Connected');
    }
    catch (error) {
        console.error('Database Connection Error:', error);
        throw error;
    }
};
exports.connect = connect;
