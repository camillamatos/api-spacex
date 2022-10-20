"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NewsController_1 = __importDefault(require("../controllers/NewsController"));
const newsRouter = (0, express_1.Router)();
const newsController = new NewsController_1.default();
newsRouter.get('/', newsController.index);
newsRouter.get('/:id', newsController.show);
newsRouter.post('/', newsController.create);
newsRouter.put('/:id', newsController.update);
newsRouter.delete('/:id', newsController.delete);
exports.default = newsRouter;
