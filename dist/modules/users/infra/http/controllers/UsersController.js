"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
class UsersController {
    async create(request, response) {
        const { name, email, address, phone, password } = request.body;
        const createUser = new UserRepository_1.default();
        const user = await createUser.create({
            name,
            email,
            address,
            phone,
            password
        });
        return response.json(user);
    }
    async auth(request, response) {
        const { email, password } = request.body;
        const authUser = new UserRepository_1.default();
        const user = await authUser.auth(email, password);
        return response.json(user);
    }
    async index(request, response) {
        const findAll = new UserRepository_1.default();
        const user = await findAll.index();
        return response.json(user);
    }
    async update(request, response) {
        const { id } = request.params;
        const user = request.body;
        const updateUser = new UserRepository_1.default();
        const updatedUser = await updateUser.update(id, user);
        return response.json(updatedUser);
    }
    async show(request, response) {
        const { id } = request.params;
        const showUser = new UserRepository_1.default();
        const user = await showUser.show(id);
        return response.json(user);
    }
    async delete(request, response) {
        const { id } = request.params;
        const deleteUser = new UserRepository_1.default();
        await deleteUser.delete(id);
        return response.sendStatus(204);
    }
}
exports.default = UsersController;
