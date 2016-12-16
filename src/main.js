var Boot = require("./states/Boot");
var Preload = require("./states/Preload");
var MainMenu = require("./states/MainMenu");
var Game = require("./states/Game");
var GameOver = require("./states/GameOver");

var game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, 'LightsOut');
game.state.add("Boot", Boot);
game.state.add("Preload", Preload);
game.state.add("MainMenu", MainMenu);
game.state.add("Game", Game);
game.state.add("GameOver", GameOver);
game.state.start("Boot");

