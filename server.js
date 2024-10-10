import express from "express";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send(":api is getting!");
});


app.listen(3000, () => {
  console.log("listening: http://localhost:3000");
});
