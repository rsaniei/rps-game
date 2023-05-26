import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from './routes/usersRoutes';

const port = 8000;
const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
mongoose.set('strictQuery', true);

app.use('/users', router);

if(process.env.MONGO_DB)
mongoose.connect(process.env.MONGO_DB)
.then(()=>{
  console.log("Connected to the Database successfully");
  app.listen(port, "127.0.0.1", (): void=>{
    // if(err)console.log("Server could not be started, err");
    console.log(`server is running on port ${port}...`);
  })
})
.catch((err)=>{
  console.log("Database connection error!");
  console.log(err);
})
