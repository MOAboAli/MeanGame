require("dotenv").config();
const mongoose = require("mongoose");



const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    location: {
        coordinates: {
            type: [Number],
            required: false,
        },
    },
    country: {
        type: String,
        required: false,
    },
    established: {
        type: Number,
        required: false,
    },
}, { _id: false });



const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    review: {
        type: String,
        required: false,
    },
    postDate: {
        type: Date,
        required: false,
    },
}, { _id: true });



const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    minPlayers: {
        type: Number,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
    publisher: publisherSchema,
    reviews: [reviewSchema],
    minAge: {
        type: Number,
        required: true,
    },
    designers: {
        type: [String],
        required: false,
    },
});

module.exports = mongoose.model(process.env.FirstMODEL, gameSchema, process.env.Firstcollection);

