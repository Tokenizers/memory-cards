// Create an element with an optional CSS class
import { GAME_MAX_DURATION } from "../common.utils";

/**
 * Create elements injected in the root div
 * @class
 */
class GameView {
  /**
   * called with the "new" keyword, this create a GameView instance
   * @constructs
   * */
  constructor() {
    this.app = document.querySelector("#root");
    this.cards = this.createElement("div", "cards");
    this.won = this.createElement("p", "won");
    this.progress_bar = this.createElement("progress", "progress");
    this.progress_bar.setAttribute("value", "0");
    this.progress_bar.setAttribute("max", "100");
    this.progress_bar.innerText = "0%";
    this.app.append(this.cards);
    this.app.append(this.progress_bar);
    this.app.append(this.won);
  }

  /**
   * utility method to create a new element in the dom.
   * @param { String } tag, the html tag name
   * @param { String } className, the html class to append
   * */
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  /**
   * utility method to get element from dom.
   * @param { String } selector, the selector (ie : #myid or .myclass or mytag)
   * */
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  /**
   * internal method which take a card model and draw it in the dom.
   * @param { Card } card, the Card model instance
   * */
  _createCard = (card) => {
    let card_vue = document.createElement("div");
    card_vue.classList.add("card");
    card_vue.id = card.getId();
    if (!card.isFlipped()) {
      card_vue.classList.add("is-flipped");
    } else {
      card_vue.classList.add(`fruit-${card.getCode()}`);
    }
    return card_vue;
  };

  /**
   * internal method which take a score model and draw it in the dom.
   * @param { Score } score, the Score model instance
   * */
  _createScore = ({ name, time }) => {
    let score_vue = document.createElement("li");
    score_vue.innerText = `${name} ${time}`;
    score_vue.classList.add("score");
    return score_vue;
  };

  /**
   * internal method which take a list of cards model and draw it in the dom.
   * @param { Array } cards, an Card's array
   * */
  _drawCards(cards) {
    while (this.cards.firstChild) {
      this.cards.removeChild(this.cards.firstChild);
    }
    cards.forEach((card) => {
      this.cards.append(this._createCard(card));
    });
  }

  /**
   * init the view
   * @param { Array } cards, an Card's array
   * */
  initView(cards) {
    this._drawCards(cards);
    this.startCountdown();
  }

  /**
   * redraw on flip
   * @param { Array } cards, an Card's array
   * */
  drawFlip(cards) {
    this._drawCards(cards);
    this.validateHand();
  }

  /**
   * redraw after flip to evaluate hand
   * @param { Array } cards, an Card's array
   * */
  drawValidateHand(cards) {
    this._drawCards(cards);
    this.hasAllHands();
  }

  /**
   * draw victory
   * */
  drawHasAllHands() {
    victory();
  }

  drawVictory(time) {
    this.won.innerText = "Vous avez gagné ! (poil au nez)";
    let name = prompt(
      "Bravo vous avez gagné, quel est votre nom ?",
      "john doe"
    );
    this.saveScore({ name, time });
    window.location = "/";
  }

  /**
   * draw progress bar
   * @param { Number } timer, the countdown
   * */
  drawProgress(timer) {
    const percent = (timer * 100) / GAME_MAX_DURATION;
    this.progress_bar.setAttribute("value", percent);
    this.progress_bar.setAttribute("max", "100");
    this.progress_bar.innerText = `${percent}%`;
  }

    /**
   * draw Lose message
   * */
  drawLose() {
    setTimeout(function () {
      if (window.confirm("vous avez perdu, recommencer ?")) {
        window.location = "/";
      }
    }, 500);
  }

  //binders

  bindFlipCard(handler) {
    this.cards.addEventListener("click", (e) => {
      const id = e.target.id;
      handler(id);
    });
  }

  bindStartCountdown(handler) {
    this.startCountdown = handler;
  }

  bindSaveScore(handler) {
    this.saveScore = handler;
  }

  bindValidateHand(handler) {
    this.validateHand = handler;
  }

  bindHasAllhands(handler) {
    this.hasAllHands = handler;
  }

  bindVictory(handler) {
    this.victory = handler;
  }
}

export default GameView;
