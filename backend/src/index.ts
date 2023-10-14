import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routes/router";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", Router);

const dbUri = process.env.DB_URI ?? "default-mongodb-uri";

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

if (dbUri) {
  mongoose
    .connect(dbUri, dbOptions)
    .then(() => console.log("DB Connected!"))
    .catch((err: Error) => console.log(err));
} else {
  console.error("DB_URI is not defined in the environment variables.");
}
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
