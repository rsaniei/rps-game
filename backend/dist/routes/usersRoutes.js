"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const usersController_1 = require("../controllers/usersController");
const router = require("express").Router();
exports.router = router;
router.post("/login", usersController_1.login);
router.get("/", usersController_1.getUsersList);
router.post("/updateScore", usersController_1.updateScore);
