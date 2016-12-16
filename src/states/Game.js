var Background = require("../Background");
var BallSystem = require("../BallSystem");
var Poker = require("../Poker");

var background = null;
var ballSystem = null;
var gameOver;
var fireButton;
var splitText;
var poker;

var Game = function (game) {
    this.game = game;
};

Game.prototype.preload = function () {
};

Game.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Resize our game world to be a 2000 x 2000 square
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    background = new Background(this.game);
    this.game.world.add(background);

    poker = new Poker(this.game);
    this.game.world.add(poker);

    ballSystem = new BallSystem(this.game, poker);

    //  Game over text
    gameOver = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'spacefont', 'Victory!', 110);
    gameOver.x = gameOver.x - gameOver.textWidth / 2;
    gameOver.y = gameOver.y - gameOver.textHeight / 3;
    gameOver.visible = false;
    gameOver.fixedToCamera = true;

    fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.bgMusic = this.game.add.audio('levelmusic1');
    this.bgMusic.loopFull(1);
    this.bgMusic.play();

    this.starPickupSound = this.game.add.audio('starpickup');



    splitText = this.game.add.bitmapText(this.game.width - 450, 20, 'spacefont', 'Splits ' + ballSystem.score, 40);

    splitText.render = function () {
        splitText.text = 'Splits: ' + Math.max(ballSystem.score, 0);
    };
    splitText.render();
    splitText.fixedToCamera = true;
};

Game.prototype.update = function () {
    background.update();
    splitText.render();
    poker.update();

    this.game.physics.arcade.collide(ballSystem.turrets, ballSystem.turrets, ballSystem.collide, null, ballSystem);

    this.game.physics.arcade.collide(ballSystem.turrets, poker, null, null, null);

    //  Game over?
    
    if (ballSystem.turrets.countLiving() === 0 && gameOver.visible === false) {
        gameOver.visible = true;
        gameOver.alpha = 0;

        var fadeInGameOver = this.game.add.tween(gameOver);
        fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
        fadeInGameOver.onComplete.add(setResetHandlers);
        fadeInGameOver.start();

        function setResetHandlers() {
            //  The "click to restart" handler
            tapRestart = self.game.input.onTap.addOnce(_restart, this);
            spaceRestart = fireButton.onDown.addOnce(_restart, this);
            function _restart() {
                tapRestart.detach();
                spaceRestart.detach();
                console.log("Restarting game");
                self.bgMusic.stop();
                self.game.state.start("Game");
            }
        }
    }
};


module.exports = Game;