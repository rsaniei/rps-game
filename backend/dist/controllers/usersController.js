"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScore = exports.getUsersList = exports.login = void 0;
const users_1 = require("../models/users");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        const user = yield users_1.Users.findOne({ userName: name });
        if (!user) {
            const newUser = yield users_1.Users.create({
                userName: name,
                score: 0
            });
            res.json(newUser);
        }
        else
            res.json(user);
    });
}
exports.login = login;
function getUsersList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield users_1.Users.find({});
        res.json(users);
    });
}
exports.getUsersList = getUsersList;
function updateScore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentUser, score } = req.body;
        yield users_1.Users.updateOne({ userName: currentUser }, { score: score });
        res.json({ message: 'ok' });
    });
}
exports.updateScore = updateScore;
