require("dotenv").config();
const mongoose = require("mongoose");
let itemModel = mongoose.model(process.env.FirstMODEL);
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;


// Get Operations

module.exports.getAllitems = function (req, res) {
    itemModel.find().then((Data) => { res.status(200).json(Data); })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

module.exports.getgetOneitembyid = function (req, res) {
    itemModel.findOne({ _id: new ObjectId(req.params.id) }).then((Data) => { res.status(200).json(Data); })
        .catch((err) => {
            res.status(500).json({ error: err });
        });

}


// Post Operations

exports.createitem = function (req, res) {
    const Newitem = { ...req.body };
    itemModel.create(Newitem).then((response) => { res.status(201).json(response); })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}


//Delete Operations

module.exports.deletegetOneitembyid = function (req, res) {
    itemModel.findByIdAndDelete({ _id: new ObjectId(req.params.id) })
        .then((response) => { res.status(200).json({ message: "Item Deleted", ItemDeleted: response }); })
        .catch((err) => {
            res.status(500).json({ error: err });
        });


}


// Update Operations

exports.fullupdateeitem = function (req, res) {
    itemModel.findOneAndReplace(
        { _id: new ObjectId(req.params.id) },
        { ...req.body },
        {
            new: true, useFindAndModify: true, runValidators: true,
        }
    )
        .then((RData) => {
            if (!RData) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json(RData);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });

}

exports.partialupdateeitem = function (req, res) {
    itemModel.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: req.body }, { new: true, overwrite: false }).then((Data) => {
        res.status(201).json(Data);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });


}


