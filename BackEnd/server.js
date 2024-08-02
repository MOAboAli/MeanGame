require("dotenv").config();
require("./db.js")
const express = require("express");
const route = require("./router.js");




const app = express();

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/games", route);


const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});