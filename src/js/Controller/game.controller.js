class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    //affiche directement les cartes au démarrage
    this.onCardsChanged(this.model.cards);
    this.view.bindFlipCard(this.handleFlipCard);
    this.view.bindsaveScore(this.saveScore)
    this.model.bindFlip(this.onCardsChanged);
    this.model.bindProgress(this.onProgressChanged);
    this.model.bindWon(this.onWinChanged);
    this.model.bindYouLose(this.onLose);

    this.start();
  }

  start = () => {
    this.view.drawCards(this.model.cards);
    this.model.startcountDown();
  };

  onCardsChanged = (cards) => {
    this.view.drawCards(cards);
  };

  handleFlipCard = (id) => {
    this.model.flipCardAndVerify(id);
  };

  saveScore(score){
    this.model.saveScore(score);
  }

  onWinChanged = (time) => {
    this.view.sayYouWin(time);
  };

  onProgressChanged = (timer) => {
    this.view.updateProgress(timer);
  };

  onLose= () => {
    this.view.youLose();
  };
}

export default GameController;
