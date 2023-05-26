"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = require("./routes/usersRoutes");
const port = 8000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
mongoose_1.default.set('strictQuery', true);
app.use('/users', usersRoutes_1.router);
if (process.env.MONGO_DB)
    mongoose_1.default.connect(process.env.MONGO_DB)
        .then(() => {
        console.log("Connected to the Database successfully");
        app.listen(port, "127.0.0.1", () => {
            // if(err)console.log("Server could not be started, err");
            console.log(`server is running on port ${port}...`);
        });
    })
        .catch((err) => {
        console.log("Database connection error!");
        console.log(err);
    });
