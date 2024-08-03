const express = require("express");
const router = express.Router();
const path = require('path');

const Controller = require("./controller.js");
const publisherController = require("./Controllers/publisher_controller.js");
const ReviewsController = require("./Controllers/review_controller.js");


//Games

router.route("/GeoSearch")
    .get(Controller.getGeoSearch)

router.route("/")
    .get(Controller.getAllitems)
    .post(Controller.createitem);

router.route("/:id")
    .get(Controller.getgetOneitembyid)
    .delete(Controller.deletegetOneitembyid)
    .put(Controller.fullupdateeitem)
    .patch(Controller.partialupdateeitem)




//Games/Publisher
router.route("/:id/publisher")
    .get(publisherController.getOneitembyid)
    .post(publisherController.createitem)
    .delete(publisherController.deletegetOneitembyid)
    .put(publisherController.fullupdateeitem)
    .patch(publisherController.partialupdateeitem);


//Games/Reviews
router.route("/:id/reviews")
    .get(ReviewsController.getOneitembyid)
    .post(ReviewsController.createitem)

router.route("/:id/reviews/:reviewid")
    .get(ReviewsController.getOneitembyidsingle)
    .delete(ReviewsController.deletegetOneitembyid)
    .put(ReviewsController.fullupdateeitem)
    .patch(ReviewsController.partialupdateeitem);


module.exports = router;