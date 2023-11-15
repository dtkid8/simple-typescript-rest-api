import express, { response } from "express";
import * as mongoose from "mongoose";
import AuthRouter from "./feature/auth/auth.router";
import UserRouter from "./feature/user/user.router";
import Config from "./shared/config/config";
import morgan from "morgan";

mongoose.connect(Config.MONGO_DB_URL,
  {
    user: Config.MONGO_DB_USERNAME,
    pass: Config.MONGO_DB_PASSWORD,
    dbName: Config.MONGO_DB_DATABASE
  },
)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true, }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Mongo");
});

app.use(AuthRouter);
app.use(UserRouter);

app.listen(Config.PORT, () => {
  console.log(`Server is Fire at http://localhost:${Config.PORT}`)
});
