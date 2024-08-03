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


// GEO Search
exports.getGeoSearch = function (req, res) {
    console.log(req.query);
    if (req.query && req.query.lat && req.query.lng) {
        _runGeoQuery(req, res);
        return;
    }
    else {
        res.status(404).json("message: No Params were sent.");
    }
}

const _runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const max = parseFloat(req.query.max);
    const min = parseFloat(req.query.min);
    //Geo JSON Point
    const point = { type: "Point", coordinates: [lng, lat] };
    const query = {
        "publisher.location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: parseFloat(max ?? 500000, 10),
                $minDistance: parseFloat(min ?? 0, 10)
            }
        }
    };

    itemModel.find(query).limit(parseFloat(50, 10)).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(401).json(error);
    });


    // .exec(function
    //     (err, games) {
    //     if (err) {
    //         console.log("Geo error ", err);
    //         res.status(401).json(err);
    //     }
    //     else {
    //         console.log("Geo results", games);
    //         res.status(200).json(games);
    //     }
    // });
}
