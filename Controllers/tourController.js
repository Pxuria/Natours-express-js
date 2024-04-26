const fs = require("fs");
const Tour = require("../models/tourModel");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8"));

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  return res.status(200).json({
    status: "success",
    data: { tour },
  });
};
exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save().then((doc) => {});
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent.",
    });
  }
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: { tour: "<Updating tour...>" },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
