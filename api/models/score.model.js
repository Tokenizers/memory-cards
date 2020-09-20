const sql = require("./db.js");

/**
 * called with the new keyword, this create a score instance.
 * this is the persistence layer
 * @constructs
 * @param { Score } score
 * */
const Score = function (score) {
  this.score_name = score.name;
  this.score_time = score.time;
};

/**
 * static method to create a new score
 * @param { Object } newScore, the score model
 * @param { function } result, callback function to handle success or failure
 * */
Score.create = (newScore, result) => {
  sql.query("INSERT INTO memory_scores SET ?", newScore, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // data transfert object (to hide real columns names)
    scoreDto = {
      id: res.insertId,
      name: newScore.score_name,
      time: newScore.score_time,
    };

    console.log("created score: ", scoreDto);
    result(null, scoreDto);
  });
};

/**
 * static method to findAll store data
 * @param { function } result, callback function to handle success or failure
 * */
Score.findAll = (result) => {
  sql.query(
    "SELECT score_name as name, score_time as time FROM memory_scores limit 10",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("scores: ", res);
      result(null, res);
    }
  );
};

module.exports = Score;
