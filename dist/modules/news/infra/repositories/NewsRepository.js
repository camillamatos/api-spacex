"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("../../../../shared/infra/mongo-helper");
const mongodb_1 = require("mongodb");
class NewsRepository {
    async index() {
        const newsCollection = await mongo_helper_1.MongoHelper.getCollection('news');
        const result = newsCollection.find({}).toArray();
        return result;
    }
    async create(news) {
        const newsCollection = await mongo_helper_1.MongoHelper.getCollection('news');
        const result = await newsCollection.insertOne(news);
        const data = await newsCollection.findOne({ _id: result.insertedId });
        return data;
    }
    async update(id, { title, description }) {
        const newsCollection = await mongo_helper_1.MongoHelper.getCollection('news');
        const result = await newsCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                title,
                description
            }
        });
        const news = result.value;
        return news;
    }
    async show(id) {
        const newsCollection = await mongo_helper_1.MongoHelper.getCollection('news');
        const result = await newsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return result;
    }
    async delete(id) {
        const newsCollection = await mongo_helper_1.MongoHelper.getCollection('news');
        await newsCollection.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
}
exports.default = NewsRepository;
