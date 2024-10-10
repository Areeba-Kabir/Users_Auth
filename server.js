const express = require('express');
const connectDB= require('./db/dbConfig.js')


const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send(":api is getting!");
});

connectDB().then(() => {
  console.log('connected to database successfully!')
  app.listen(3000, () => {
    console.log("listening: http://localhost:3000");
  });
}).catch((err)=>{
  console.log(err)
})
