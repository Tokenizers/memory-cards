/**
 * Create a new card
 * a card is represented by it's image code (from 0 to Utils.CARDS_NUMBERS)
 * a card has a state :
 *  flipped : once it was selected
 * @class
 */
class Card {
  /**
   * called with the new keyword, this create a card instance.
   * @constructs
   * @param { String } id
   * @param { Number } code
   * */
  constructor(id, code) {
    this.id = id;
    this.code = code;
    this.flipped = false;
  }

  // getters section

  /**
   * return the instance's uuid
   * @return { String } id
   * */
  getId() {
    return this.id;
  }

  /**
   * return the instance's image code
   * @return { Number } coode
   * */
  getCode() {
    return this.code;
  }

  /**
   * return the instance's flipped state
   * @return { Boolean } flipped
   * */
  isFlipped() {
    return this.flipped;
  }

  // setters

  /**
   * change the instance's flipped state to false
   * */
  flip() {
    this.flipped = true;
  }

  /**
   * change the instance's flipped state to true
   * */
  unflip() {
    this.flipped = false;
  }

}

export default Card;
