require("dotenv").config();
const mongoose = require("mongoose");
let itemModel = mongoose.model(process.env.FirstMODEL);
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;


// Get Operations

module.exports.getAllitems = function (req, res) {
    itemModel.find().then((Data) => {
        res.status(200).json(Data);
    })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}


const getOneitemCallbackified = callbackify(function (dataCollection, query) {
    return dataCollection.findOne(query);
});
module.exports.getgetOneitembyid = function (req, res) {
    getOneitemCallbackified(itemModel, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) { res.status(500).json({ error: err }); }
        else { res.status(200).json(Data); }
    });

}


// Post Operations

const createitembackified = callbackify((dataCollection, data) => {
    return dataCollection.create(data);
});
exports.createitem = function (req, res) {

    console.log(req.body);
    const Newitem = {
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year

    };

    try {
        createitembackified(itemModel, Newitem, function (err, response) {
            if (err) { res.status(500).json({ error: err }); }
            else { res.status(201).json(response); }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


//Delete Operations

const deleteOneitemCallbackified = callbackify(function (dataCollection, query) {
    return dataCollection.findByIdAndDelete(query);
});
module.exports.deletegetOneitembyid = function (req, res) {
    deleteOneitemCallbackified(itemModel, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) { res.status(500).json({ error: err }); }
        else { res.status(200).json({ message: "Item Deleted" }); }
    });

}


// Update Operations


const fullupdateitembackified = callbackify((dataCollection) => {
    //return dataCollection.findByIdAndUpdate(query, data, { overwrite: false });, query, data, overwriteV
    return dataCollection.save();
});
exports.fullupdateeitem = function (req, res) {

    getOneitemCallbackified(itemModel, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) {
            res.status(500).json({ error: err });
        }
        else {


            const Newitem = {
                ...req.body,
                publisher: Data.publisher,
                reviews: Data.reviews
            };

            Object.keys(Data._doc).forEach(key => {
                if (!Newitem.hasOwnProperty(key) && key != "_id") {
                    delete Data._doc[key];
                }
                else if (key != "_id") {
                    if (typeof Data._doc[key] === 'number') {
                        Data._doc[key] = Number(Newitem[key]);
                    }
                    else {
                        Data._doc[key] = Newitem[key];
                    }


                }

            });


            try {

                fullupdateitembackified(Data, function (err, response) {  //, { _id: new ObjectId(req.params.id) }, Newitem, true
                    if (err) { res.status(500).json({ error: err }); }
                    else { res.status(201).json(response); }
                });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }




        }
    });


}

const partialupdateitembackified = callbackify((dataCollection, query, data, overwriteV) => {
    return dataCollection.findByIdAndUpdate(query, data, { new: true, overwrite: overwriteV });

});
exports.partialupdateeitem = function (req, res) {
    try {
        partialupdateitembackified(itemModel, { _id: new ObjectId(req.params.id) }, { $set: req.body }, false, function (err, response) {
            if (err) { res.status(500).json({ error: err }); }
            else { res.status(201).json(response); }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


