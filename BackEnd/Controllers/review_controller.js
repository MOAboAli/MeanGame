require("dotenv").config();
const mongoose = require("mongoose");
let itemModel = mongoose.model(process.env.FirstMODEL);
const ObjectId = require("mongodb").ObjectId;


// Get Operations

module.exports.getOneitembyid = function (req, res) {
    itemModel.findOne({ _id: new ObjectId(req.params.id) }).then((Data) => {
        res.status(200).json(Data.reviews);
    })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
        });
}

module.exports.getOneitembyidsingle = function (req, res) {
    const reviewid = req.params.reviewid;
    itemModel.findById({ _id: new ObjectId(req.params.id) }).select("reviews").then((Data) => {
        res.status(200).json(Data.reviews.id(reviewid));
    })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
        });
}


// Post Operations

exports.createitem = function (req, res) {

    const newreview = { _id: new ObjectId(), ...req.body };

    itemModel.findById({ _id: new ObjectId(req.params.id) }).select("reviews").then((Data) => {
        if (Data == null)
            throw new Error("Main Document is not found.");
        Data.reviews.push(newreview);
        Data.save().then((Data) => {
            res.status(200).json(Data);
        }).catch((err) => {
            throw new Error(err);
        });
    }).catch((err) => {
        res.status(500).json({ error: err.toString() });
    });
}


//Delete Operations

module.exports.deletegetOneitembyid = function (req, res) {
    itemModel.findById({ _id: new ObjectId(req.params.id) }).select("reviews").then((Data) => {
        if (Data == null)
            throw new Error("Main Document is not found.");
        const Index = Data.reviews.findIndex(a => a._id.toString() === new ObjectId(req.params.reviewid));
        if (Index == -1)
            throw new Error("Sub Document is not found.");
        Data.reviews.splice(Index, 1);
        Data.save().then((Data) => {
            res.status(200).json({ "message": "Item has been deleted" });
        }).catch((err) => {
            throw new Error(err);
        });

    })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
        });
}


// Update Operations

exports.fullupdateeitem = function (req, res) {

    const reviewid = req.params.reviewid;
    itemModel.findById({ _id: new ObjectId(req.params.id) }).select("reviews").then((Data) => {  //.findOne({ _id: new ObjectId(reviewid) })
        if (Data == null)
            throw new Error("Main Document is not found.");
        const Index = Data.reviews.findIndex(a => a._id.toString() === reviewid);
        if (Index == -1)
            throw new Error("Sub Document is not found.");

        Data.reviews[Index] = { ...req.body };
        Data.save().then((Data) => {
            res.status(200).json({ Data });
        }).catch((err) => {
            throw new Error(err);
        });
    })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
        });

}

exports.partialupdateeitem = function (req, res) {
    const updatedReview = { ...req.body };
    const reviewid = req.params.reviewid;
    itemModel.findById({ _id: new ObjectId(req.params.id) }).select("reviews").then((Data) => {
        if (Data == null)
            throw new Error("Main Document is not found.");
        const Index = Data.reviews.findIndex(a => a._id.toString() === reviewid);
        if (Index == -1)
            throw new Error("Sub Document is not found.");
        Object.keys(updatedReview).forEach(key => {
            Data.reviews[Index][key] = updatedReview[key];
        });
        Data.save().then((Data) => {
            res.status(200).json({ Data });
        }).catch((err) => {
            throw new Error(err);
        });
    })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
        });
}


