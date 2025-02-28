import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./src/routers/user"
import storageRouter from './src/routers/storage'
import supplierRouter from './src/routers/supplier'
import cors from "cors"
import { verifyToken } from "./src/middlewares/verifyToken";
dotenv.config()

const PORT = process.env.PORT || 3001
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.wembb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const app = express();
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use("/auth", userRouter)

app.use(verifyToken)
app.use('/storage', storageRouter)
app.use('/supplier', supplierRouter)

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);

    console.log(`Connect to db successfully!!!`);
  } catch (error) {
    console.log(`Can not connect to db ${error}`);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is stating at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });