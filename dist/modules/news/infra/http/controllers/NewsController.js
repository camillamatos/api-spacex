"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NewsRepository_1 = __importDefault(require("../../repositories/NewsRepository"));
class NewsController {
    async create(request, response) {
        const { title, description, author } = request.body;
        const createNews = new NewsRepository_1.default();
        const news = await createNews.create({
            title,
            description,
            author
        });
        return response.json(news);
    }
    async index(request, response) {
        const findAll = new NewsRepository_1.default();
        const news = await findAll.index();
        return response.json(news);
    }
    async update(request, response) {
        const { id } = request.params;
        const news = request.body;
        const updateNews = new NewsRepository_1.default();
        const updatedNews = await updateNews.update(id, news);
        return response.json(updatedNews);
    }
    async show(request, response) {
        const { id } = request.params;
        const showNews = new NewsRepository_1.default();
        const news = await showNews.show(id);
        return response.json(news);
    }
    async delete(request, response) {
        const { id } = request.params;
        const deleteNews = new NewsRepository_1.default();
        await deleteNews.delete(id);
        return response.sendStatus(204);
    }
}
exports.default = NewsController;
