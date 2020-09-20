const Score = require("../models/score.model.js");

/**
 * function that take http request, process the score creation and return the result in http response
 * @param { Object } req, the http request
 * @param { Object } res, the http response
 * */
exports.create = (req, res) => {
  // Validation de la requête request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!", // of curse !
    });
  }

  //retrieve data from request badi ;)
  const { name, time } = req.body;

  //TODO validations de l'objet !!!
  

  // Create a Score from request data
  const score = new Score({
    name,
    time,
  });

  // Save Score in the database
  Score.create(score, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Score.",
      });
    else res.send(data);
  });
};

/**
 * function that take http request, process retrieving score list and return the result in http response
 * @param { Object } req, the http request
 * @param { Object } res, the http response
 * */
exports.findAll = (req, res) => {

  // retrieve data from DB repository
  Score.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving scores.",
      });
    else res.send(data);
  });
};
