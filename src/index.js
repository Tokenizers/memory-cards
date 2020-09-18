
import GameController from "./js/Controller/game.controller";
import GameModel from "./js/Model/game.model";
import GameView from "./js/View/game.view";
import "./styles/index.scss";

new GameController(new GameModel(), new GameView());
