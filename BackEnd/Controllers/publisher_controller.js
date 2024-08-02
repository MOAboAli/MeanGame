require("dotenv").config();
const mongoose = require("mongoose");
let itemModel = mongoose.model(process.env.FirstMODEL);
const ObjectId = require("mongodb").ObjectId;


// Get Operations

module.exports.getOneitembyid = function (req, res) {
    itemModel.findOne({ _id: new ObjectId(req.params.id) }).then((Data) => {
        console.log("Here")
        res.status(200).json(Data.publisher);
    })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}


// Post Operations

function EditPublisherValue(req, res, newPublisher) {
    const gameId = req.params.id;

    itemModel.findByIdAndUpdate(
        gameId,
        { $set: { publisher: newPublisher } },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((updatedGame) => {
            if (!updatedGame) {
                return res.status(404).json({ error: 'Game not found' });
            }
            res.status(200).json(updatedGame);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}


exports.createitem = function (req, res) {
    const newPublisher = { ...req.body };
    console.log(newPublisher);
    EditPublisherValue(req, res, newPublisher);
}


//Delete Operations

module.exports.deletegetOneitembyid = function (req, res) {
    const newPublisher = {};
    EditPublisherValue(req, res, newPublisher);
}


// Update Operations

exports.fullupdateeitem = function (req, res) {
    const newPublisher = { ...req.body };
    EditPublisherValue(req, res, newPublisher);

}

exports.partialupdateeitem = function (req, res) {
    itemModel.findOne({ _id: new ObjectId(req.params.id) }).then((Data) => {
        const newPublisher = { ...Data.publisher, ...req.body };
        EditPublisherValue(req, res, newPublisher);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
}


