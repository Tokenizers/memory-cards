/**
 * Classe card, elle va permettre de manipuler l'état du carte
 *
 */
class Card {
  // Constructeur
  constructor(id, code) {
    this.id = id;
    this.code = code;
    this.flipped = true;
    this.freeze = false;
  }

  getId() {
    return this.id;
  }

  getCode() {
    return this.code;
  }

  isFlipped() {
    return this.flipped;
  }

  flip() {
    this.flipped = false;
  }

  unflip() {
    this.flipped = true;
  }

  setFreeze(freeze) {
    this.freeze = freeze;
  }

  isFreeze() {
    return this.freeze;
  }

  bindFlipCard(callback) {
    this.onTodoListChanged = callback
  }

  bindWon(callback){
    this.onWin = callback
  }

  equals(card) {
    this.code === card.code
  }
}

export default Card;
