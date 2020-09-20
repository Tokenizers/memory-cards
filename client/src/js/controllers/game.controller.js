/**
 * bind the view and the model
 * @class
 */
class GameController {
  /**
   * called with the new keyword, this create a card instance.
   * @constructs
   * @param { Object } model, the game model
   * @param { Object } view, the game view
   * */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    //associate handlers to views
    this.view.bindFlipCard(this.handleFlipCard);
    this.view.bindValidateHand(this.handleValidateHand);
    this.view.bindHasAllhands(this.handleHasAllhands);
    this.view.bindSaveScore(this.handleSaveScore);
    this.view.bindStartCountdown(this.handleCountDown);

    //associate callback to model
    this.model.bindFlip(this.onFlip);
    this.model.bindValidateHand(this.onValidateHand);
    this.model.bindProgress(this.onProgress);
    this.model.bindVictory(this.onVictory);
    this.model.bindLose(this.onLose);

    // start the app
    this.start();
  }

  //start the view
  start = () => {
    this.view.initView(this.model.cards);
  };

  //callback declaration

  handleCountDown = () => {
    this.model.startcountDown();
  };

  handleFlipCard = (id) => {
    this.model.flipCard(id);
  };

  handleValidateHand = () => {
    this.model.validateHand();
  };

  handleHasAllhands = () => {
    this.model.hasAllhands();
  };

  handleSaveScore = (score) => {
    this.model.saveScore(score);
  };

  onFlip = (cards) => {
    this.view.drawFlip(cards);
  };

  onValidateHand = (cards) => {
    this.view.drawValidateHand(cards);
  };

  onVictory = (time) => {
    this.view.drawVictory(time);
  };

  onProgress = (timer) => {
    this.view.drawProgress(timer);
  };

  onLose = () => {
    this.view.drawLose();
  };
}

export default GameController;
