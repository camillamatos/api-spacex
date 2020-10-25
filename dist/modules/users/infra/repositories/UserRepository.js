"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("../../../../shared/infra/mongo-helper");
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = require("jsonwebtoken");
const HashProvider_1 = __importDefault(require("../../providers/HashProvider"));
class UsersRepository {
    async index() {
        const userCollection = await mongo_helper_1.MongoHelper.getCollection('users');
        const result = await userCollection.find({}).toArray();
        return result;
    }
    async create({ name, email, address, phone, password }) {
        const hashProvider = new HashProvider_1.default();
        const userCollection = await mongo_helper_1.MongoHelper.getCollection('users');
        const hashedPassword = await hashProvider.generateHash(password);
        const result = await userCollection.insertOne({ name, email, address, phone, hashedPassword });
        return result.ops[0];
    }
    async update(id, { name, email, address, phone, password }) {
        const hashProvider = new HashProvider_1.default();
        const userCollection = await mongo_helper_1.MongoHelper.getCollection('users');
        const hashedPassword = await hashProvider.generateHash(password);
        const result = await userCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: {
                name: name,
                email: email,
                address: address,
                phone: phone,
                hashedPassword: hashedPassword
            } });
        return result.value;
    }
    async show(id) {
        const userCollection = await mongo_helper_1.MongoHelper.getCollection('users');
        const result = await userCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return result;
    }
    async delete(id) {
        const userCollection = await mongo_helper_1.MongoHelper.getCollection('users');
        await userCollection.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async auth(email, password) {
        const hashProvider = new HashProvider_1.default();
        const userCollection = await mongo_helper_1.MongoHelper.getCollection('users');
        const result = await userCollection.findOne({ email });
        if (!result) {
            return null;
        }
        const passwordMatched = await hashProvider.compareHash(password, result.hashedPassword);
        if (!passwordMatched) {
            return null;
        }
        console.log(result);
        const token = jsonwebtoken_1.sign({}, '05513af514', {
            subject: result.name
        });
        return { result, token };
    }
}
exports.default = UsersRepository;
