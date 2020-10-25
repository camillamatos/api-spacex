"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const mongo_helper_1 = require("./mongo-helper");
mongo_helper_1.MongoHelper.connect('mongodb+srv://dbSpaceX:spacex@cluster0.vsp1e.mongodb.net/dbSpaceX?retryWrites=true&w=majority');
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.PORT, () => { console.log('Server running on port 3333'); });
