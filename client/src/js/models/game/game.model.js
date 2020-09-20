import {
  CARDS_NUMBER,
  shuffle,
  uuidv4,
  GAME_MAX_DURATION,
  ONE_SECOND,
} from "../../common.utils";
import Card from "./card.model";
import ScoreService from "../../Services/score.service";

/**
 * Create a new game
 * it's the "game engine"
 * a game several state elements :
 *  cards : a list of shuffled cards
 *  hand : the current selected cards with a max of two (flipped by user)
 *  validatedHand: the list of founded cards code.
 *  updateCountDown: a reference to the function that create timer
 *  animating : async atomated animation lock's state.
 *  time: the current time elapsed in the game
 *  paused: pause indicator
 * @class
 */
class Game {
  // Constructeur
  constructor() {
    this.cards = this._buildArrayAndShuffle();
    this.hand = [];
    this.validatedHand = [];
    this.updateCountDown;
    this.time = 0;
    this.animating = false;
    this.paused = false;
  }

  /**
   * Internal function to prepare the game.
   * @return { Array } the shuffled cards list
   */
  _buildArrayAndShuffle() {
    // generate a range array from 0 to Utils.CARDS_NUMBER.
    const range = [...Array(CARDS_NUMBER).keys()];
    // each element of this array is transformed into a new card instance.
    let cards_model_set1 = [...range].map((code) => new Card(uuidv4(), code));
    // i repeat this to have pairs
    let cards_model_set2 = [...range].map((code) => new Card(uuidv4(), code));

    // we merge the two array and shuffle the result.
    const cards = shuffle(cards_model_set1.concat(cards_model_set2));
    return cards;
  }

  /**
   * function to flip card from it's id.
   * it search the card model and then flip it if it's not already flipped
   */
  flipCard(id) {
    if (!this.paused && this.hand.length < 2) {
      this.cards.forEach((card) => {
        if (card.getId() === id && !card.isFlipped()) {
          card.flip();
          this.hand.push(card);
        }
      });
      // we call the view throught callback to say "now you just redraw the cards please"
      this.drawFlipCard(this.cards);
    }
  }

  /**
   * function which will validate the current user hand
   *
   */
  validateHand() {
    if (this.hand.length === 2 && !this.animating) {
      this.animating = true;
      setTimeout(() => {
        // we retrieved the two cards in the hand
        const card1 = this.hand[0];
        const card2 = this.hand[1];

        // if the two cards get the same image code, then we won this hand
        if (card1.code === card2.code) {
          this.validatedHand.push(card1.code);
        } else {
          // if the two cards arent equals then, we unflip the cards to try again
          card1.unflip();
          card2.unflip();
        }
        //we reset the current user hand
        this.hand = [];

        //we call the view refresh to draw the new game.model state
        this.drawValidateHand(this.cards);
        this.animating = false;
      }, 400);
    }
  }
  /**
   * function which will verify if we won the game
   *
   */
  hasAllhands() {
    // if we got all hand validated and the max time isn't reached
    if (
      this.validatedHand.length === CARDS_NUMBER &&
      this.time !== GAME_MAX_DURATION
    ) {
      // we stop the timer and update the view to show the victory
      clearInterval(this.updateCountDown);
      this.drawVictory(this.time);
    }
  }

  /**
   * function which start the countdown
   *
   */
  startcountDown() {
    this.updateCountDown = setInterval(() => {
      this.time += 1;
      this.drawProgress(this.time);
      if (this.time === GAME_MAX_DURATION) {
        clearInterval(this.updateCountDown);
        this.paused = true;
        this.drawLose();
      }
    }, ONE_SECOND);
  }


  // function that use ScoreService to save the score.
  saveScore(score) {
    ScoreService.save(score);
  }

  //binders

  bindFlip(callback) {
    this.drawFlipCard = callback;
  }

  bindValidateHand(callback) {
    this.drawValidateHand = callback;
  }

  bindVictory(callback) {
    this.drawVictory = callback;
  }

  bindProgress(callback) {
    this.drawProgress = callback;
  }

  bindLose(callback) {
    this.drawLose = callback;
  }
}

export default Game;
