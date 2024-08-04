const { ObjectId } = require("mongodb");
const dataAccess = require("../data/dataAccess")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()



const _UserObject = function (req, hashedPWD) {
    return new Promise((resolve, reject) => {
        const user = {
            "name": req.body.name,
            "username": req.body.username,
            "password": hashedPWD
        }
        resolve(user)
    });
}


const NewUSER = function (req, res) {
    const response = { status: 200, text: "" }

    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
        .then((salt) => bcrypt.hash(req.body.password, salt))
        .then((hashedPWD) => _UserObject(req, hashedPWD))
        .then(newUser => dataAccess.addNewUser_promise(newUser))
        .then(data => {
            response.status = 201
            response.text = "User created successfully..."
        })
        .catch(error => {
            response.status = 401
            response.text = error
        })
        .finally(() => {
            res.status(response.status).send(response.text)

        })

}


module.exports = {
    addNewUser: NewUSER
}