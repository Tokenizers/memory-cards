import ScoreService from "../services/score.service";

/**
 * create a new score
 * @class
 */
class Score {
  
  /** @constructs */
  constructor() {
    this.scores = [];
  }

  /**
   * Find Scores list using fetch api and call the callback binded to the view.
   */
  loadScores() {
    ScoreService.findAll().then((scores) => {
      this.scores = scores;
      this.drawscore(scores);
    });
  }

  /**
   * bind the view draw function to the model throught controller.
   * @param { Function } callback
   */
  bindScore(callback) {
    this.drawscore = callback;
  }
}

export default Score;
