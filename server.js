const express = require("express");
const env = require("dotenv");
env.config();
const app = express();

const router = require("./route/allRoutes");

app.use(express.static("./frontend/"));
app.use(express.json());


app.use(router)

const PORT = process.env.PORT || 3000  

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
