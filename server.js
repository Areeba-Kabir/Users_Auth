const express = require("express");
require("dotenv").config();

const connectDB = require("./db/dbConfig.js");
const userRouter  = require("./routes/userRoutes.js");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.get("/", async (req, res) => {
  res.send("api is getting!");
});

connectDB()
  .then(() => {
    console.log("connected to database successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`listening: http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
