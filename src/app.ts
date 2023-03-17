import express from "express";
import mongoose from "mongoose";
import http from "http";
import { routes } from "./route";
import cors from "cors";
export const app = express();
const server = http.createServer(app);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const port = 3000;
export const TOKEN_KEY = "lifiting_ledger_api";

routes(app);

const url = `mongodb+srv://gabrielneuman:Red5owl0513@lifting-ledger.chlyuji.mongodb.net/?retryWrites=true&w=majority`; // place your mongoDB url here
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!", url);
  })
  .catch((error) => {
    console.log("Connection failed!:", error);
  });

server.listen(port, () => {
  console.log(`Express server listening ${port}`);
});
