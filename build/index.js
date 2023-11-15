"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const auth_router_1 = __importDefault(require("./feature/auth/auth.router"));
const user_router_1 = __importDefault(require("./feature/user/user.router"));
const config_1 = __importDefault(require("./shared/config/config"));
const app = (0, express_1.default)();
mongoose.connect(config_1.default.MONGO_DB_URL, {
    user: config_1.default.MONGO_DB_USERNAME,
    pass: config_1.default.MONGO_DB_PASSWORD,
    dbName: config_1.default.MONGO_DB_DATABASE
})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.use(express_1.default.urlencoded({ extended: true, }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello Mongo");
});
app.use(auth_router_1.default);
app.use(user_router_1.default);
app.listen(config_1.default.PORT, () => {
    console.log(`Server is Fire at http://localhost:${config_1.default.PORT}`);
});
