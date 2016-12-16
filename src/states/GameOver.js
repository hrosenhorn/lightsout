
var GameOver = function (game) {
    this.game = game;
};

GameOver.prototype.create = function () {
    var gameOverTitle = this.game.add.sprite(160,160,"gameover");
    gameOverTitle.anchor.setTo(0.5,0.5);
    var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
    playButton.anchor.setTo(0.5,0.5);
};

GameOver.prototype.playTheGame = function () {
    this.game.state.start("Game");
};

module.exports = GameOver;