/**
 * Create elements injected in the root div
 * @class
 */
class ScoreView {
  /**
   * called with the "new" keyword, this create a ScoreView instance
   * @constructs
   * */
  constructor() {
    this.app = document.querySelector("#root");
    this.scoreboard = this.createElement("div", "scoreboard_wrapper");
    this.startbutton = this.createElement("button", "button");
    this.startbutton.classList.add("start-button");
    this.startbutton.innerText = "Commencer le jeu ! ";


    this.startbutton.addEventListener(
      "click",
      () => (window.location.href = "/game.html")
    );
    this.box = this.createElement("div", "box");
    this.box.append(this.scoreboard);
    this.box.append(this.startbutton);
    this.app.append(this.box);
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
   * internal method which take a score model and draw it in the dom.
   * @param { Score } score, the Score model instance
   * */
  _createScore = ({ name, time }) => {
    let score_vue = document.createElement("li");
    score_vue.innerText = `${name} ${time} seconds`;
    score_vue.classList.add("score");
    return score_vue;
  };

  /**
   * method which take a score model'list  and draw it in the dom.
   * @param { Array } scores, the Score model instance
   * */
  drawScoreBoard(scores) {
    while (this.scoreboard.firstChild) {
      this.scoreboard.removeChild(this.scoreboard.firstChild);
    }
    let titre1 = this.createElement("h1");
    titre1.innerText = "Liste des meilleurs scores ";
    this.scoreboard.append(titre1);
    let scoreboard = this.createElement("ul", "scoreboard");
    scores.forEach((score) => {
      scoreboard.append(this._createScore(score));
    });

    this.scoreboard.append(scoreboard);
  }

  //binders

  bindSaveScore(handler) {
    this.saveScore = handler;
  }
}

export default ScoreView;
