const express = require("express");
// const tourControllers = require("../Controllers/tourController");
const { getAllTours, createTour, getTour, updateTour, deleteTour } = require("../Controllers/tourController");

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;