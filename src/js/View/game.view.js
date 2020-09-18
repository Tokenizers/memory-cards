// Create an element with an optional CSS class
import { GAME_MAX_DURATION } from "../Utils";

class GameView {
  constructor() {
    this.app = document.querySelector("#root");
    this.board = this.createElement("div", "board");
    this.cards = this.createElement("div", "cards");
    this.won = this.createElement("p", "won");
    this.progress_bar = this.createElement("progress", "progress");
    this.progress_bar.setAttribute("value", "0");
    this.progress_bar.setAttribute("max", "100");
    this.progress_bar.innerHTML = "0%";

    this.board.append(this.cards);
    this.app.append(this.board);
    this.app.append(this.progress_bar);
    this.app.append(this.won);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  _createCard = (card) => {
    let card_vue = document.createElement("div");
    card_vue.classList.add("card");
    card_vue.id = card.getId();

    if (card.isFlipped()) {
      card_vue.classList.add("is-flipped");
    } else {
      card_vue.classList.add(`fruit-${card.getCode()}`);
    }
    return card_vue;
  };

  drawCards(cards) {
    while (this.cards.firstChild) {
      this.cards.removeChild(this.cards.firstChild);
    }
    cards.forEach((card) => {
      this.cards.append(this._createCard(card));
    });
  }

  sayYouWin(time) {
    this.won.innerHTML = "Vous avez gagné ! (poil au nez)";
    let tag = prompt("Bravo vous avez gagné, quel est votre nom ?", "john doe");
    saveScore({ name, time });
  }

  updateProgress(timer) {
    const percent = (timer * 100) / GAME_MAX_DURATION;
    this.progress_bar.setAttribute("value", percent);
    this.progress_bar.setAttribute("max", "100");
    this.progress_bar.innerHTML = `${percent}%`;
  }

  youLose() {
    if (window.confirm("vous avez perdu, recommencer ?")) {
      window.location = "/";
    }
  }

  bindFlipCard(handler) {
    this.cards.addEventListener("click", (e) => {
      const id = e.target.id;
      handler(id);
    });
  }

  bindsaveScore(handler) {
    this.saveScore = handler;
  }
}

export default GameView;
