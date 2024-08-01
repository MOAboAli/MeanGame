require("dotenv").config();
const mongoose = require("mongoose");
require("./schema.js");




mongoose.connect(process.env.DB_URL + process.env.DB_NAME, {
    useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to " + process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error " + err);
});


async function gracefulExit(signal) {
    console.log(`Received ${signal}. Closing MongoDB connection...`);
    await mongoose.connection.close();
    console.log(`Mongoose disconnected due to ${signal}`);
    console.log(process.env[`${signal}_MESSAGE`]);
    process.exit(0);
}


process.on("SIGINT", function () {
    gracefulExit("SIGINT");
});

process.on("SIGTERM", function () {
    gracefulExit("SIGTERM");
});

process.once("SIGUSR2", function () {

    mongoose.connection.close(function (err) {
        if (err) {
            console.log(`Error during Mongoose disconnection: ${err}`);
        } else {
            console.log("Mongoose disconnected due to SIGUSR2");
        }
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    });
});





