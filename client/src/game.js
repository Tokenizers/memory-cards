import GameController from "./js/controllers/game.controller";
import GameModel from "./js/models/game/game.model";
import GameView from "./js/views/game.view";
import "./styles/index.scss";

new GameController(new GameModel(), new GameView())
