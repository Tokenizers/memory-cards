module.exports = (app) => {
  const scores = require("../controllers/score.controller.js");

  // associate an http route, 'localhost:80/scores' with POST method to a controller function
  app.post("/scores", scores.create);

    // associate an http route, 'localhost:80/scores' with GET method to a controller function
  app.get("/scores", scores.findAll);
};
