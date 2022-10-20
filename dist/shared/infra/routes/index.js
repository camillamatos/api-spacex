"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("../../../modules/users/infra/http/routes/users.routes"));
const news_routes_1 = __importDefault(require("../../../modules/news/infra/http/routes/news.routes"));
const routes = (0, express_1.Router)();
routes.use('/users', users_routes_1.default);
routes.use('/news', news_routes_1.default);
exports.default = routes;
