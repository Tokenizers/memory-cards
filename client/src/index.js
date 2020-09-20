import GameController from "./js/controllers/game.controller";
import GameModel from "./js/models/game/game.model";
import GameView from "./js/views/game.view";
import ScoreController from "./js/controllers/score.controller";
import ScoreModel from "./js/models/score.model";
import ScoreView from "./js/views/score.view";
import "./styles/index.scss";

new ScoreController(new ScoreModel(), new ScoreView())
