import { getUsersList, login, updateScore } from "../controllers/usersController";
const router = require("express").Router();

router.post("/login", login);
router.get("/", getUsersList);
router.post("/updateScore", updateScore)

export { router };
