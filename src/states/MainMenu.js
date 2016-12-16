var Background = require("../Background");

var MainMenu = function (game) {
    this.game = game;
};

MainMenu.prototype.preload = function () {

};


var startGameButton;

MainMenu.prototype.create = function () {
    this.game.world.add(new Background(this.game));

    //gameOver = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'spacefont', 'GAME OVER!', 110);
    //gameOver.x = gameOver.x - gameOver.textWidth / 2;
    //gameOver.y = gameOver.y - gameOver.textHeight / 3;

    var menuButton = this.add.button(this.game.world.centerX, this.game.world.centerY,
        'buttonBlue', this.startGame, this, 1, 0, 2);
    menuButton.anchor.setTo(0.5, 0.5);

    //  Game over text
    var gameTitle = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 200, 'spacefont', 'Lights Out!!', 50);
    gameTitle.anchor.setTo(0.5, 0.5);


    var menuPanel = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, "menupanel");
    menuPanel.anchor.setTo(0.5, 0.5);
    menuPanel.scale.setTo(5, 2);

    var infoText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 70, 'spacefont', 'Split and match', 30);
    infoText.anchor.setTo(0.5, 0.5);

    var buttonText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'spacefont', 'Start', 25);
    buttonText.anchor.setTo(0.5, 0.5);

    startGameButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    var self = this;
    var startGameButtonPressed = startGameButton.onDown.addOnce(function () {
        startGameButtonPressed.detach();
        self.startGame();
    }, this);


    this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.music = this.game.add.audio('opening');
    this.music.loopFull(1);
    this.music.play();
};

MainMenu.prototype.update = function () {
    if (startGameButton.isDown) {
        startGameButton.detatch();
        this.startGame();
    }
};

MainMenu.prototype.startGame = function () {
    this.music.stop();
    this.game.state.start("Game");
};

module.exports = MainMenu;