require("dotenv").config();
require("./db.js")
const express = require("express");
const route = require("./router.js");




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/games", route);


const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});