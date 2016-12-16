var Background = require("../Background");
var BallSystem = require("../BallSystem");

var background = null;
var ballSystem = null;
var gameOver;
var fireButton;
var splitText;

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

    ballSystem = new BallSystem(this.game);

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

    // leftEmitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY);
    // leftEmitter.bounce.setTo(0.5, 0.5);
    // leftEmitter.setXSpeed(100, 200);
    // leftEmitter.setYSpeed(-50, 50);
    // leftEmitter.makeParticles('turret', 0, 5, true, true);
    // leftEmitter.start(false, 5000, 20);

};

Game.prototype.update = function () {
    background.update();
    splitText.render();

    this.game.physics.arcade.collide(ballSystem.turrets, ballSystem.turrets, ballSystem.collide, null, null);

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