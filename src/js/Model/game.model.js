import { CARDS_NUMBER, shuffle, uuidv4, GAME_MAX_DURATION } from "../Utils";
import Card from "./card.model";
import { ScoreStore } from "../Repositories/score.store";
class Game {
  // Constructeur
  constructor() {
    const range = [...Array(CARDS_NUMBER).keys()];
    let cards_model_set1 = [...range].map((code) => new Card(uuidv4(), code));
    let cards_model_set2 = [...range].map((code) => new Card(uuidv4(), code));
    this.cards = shuffle(cards_model_set1.concat(cards_model_set2));
    this.selectedCards = [];
    this.results = [];
    this.locked = false;
    this.updateCountDown;
    this.time = 0;
  }

  startcountDown() {
    this.updateCountDown = setInterval(() => {
      this.time += 1;
      this.updateProgress(this.time);
      if (this.time === GAME_MAX_DURATION) {
        clearInterval(this.updateCountDown);
        this.youLose();
      }
    }, 1000);
  }

  flipCardAndVerify(id) {
    this._flipCard(id);
    this._verifySet();
  }

  saveScore(score){
    ScoreStore.save(score);
  }

  _flipCard(id) {
    if (this.selectedCards.length <= 1) {
      this.cards.forEach((card) => {
        if (
          card.getId() === id &&
          !this.selectedCards.includes(card) &&
          !card.isFreeze()
        ) {
          card.flip();
          this.selectedCards.push(card);
        }
      });
      this.refreshView(this.cards);
    }
  }

  _verifySet() {
    if (this.selectedCards.length === 2 && !this.locked) {
      this.locked = true;
      setTimeout(() => {
        const card1 = this.selectedCards[0];
        const card2 = this.selectedCards[1];

        if (card1.code === card2.code) {
          card1.setFreeze(true);
          card2.setFreeze(true);
          this.results.push(card1.code);

          if (this.results.length === 18 && this.time !== 180) {
            clearInterval(this.updateCountDown);
            this.showWin(this.time);
          }
        } else {
          card1.unflip();
          card2.unflip();
        }

        this.selectedCards = [];

        this.refreshView(this.cards);
        this.locked = false;
      }, 500);
    }
  }

  bindFlip(callback) {
    this.refreshView = callback;
  }

  bindWon(callback) {
    this.showWin = callback;
  }

  bindProgress(callback) {
    this.updateProgress = callback;
  }

  bindYouLose(callback) {
    this.youLose = callback;
  }
}

export default Game;
