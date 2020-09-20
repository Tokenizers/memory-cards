/**
 * bind the view and the model
 * @class
 */
class ScoreController {
  /**
   * called with the new keyword, this create a card instance.
   * @constructs
   * @param { Object } model, the score model
   * @param { Object } view, the score view
   * */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindScore(this.onScorechanged);
    this.start();
  }

  // load score
  start = () => {
    this.model.loadScores();
  };

  //draw the app on scores changed
  onScorechanged = (scores) => {
    this.view.drawScoreBoard(scores);
  };
}

export default ScoreController;
