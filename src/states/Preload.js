var Preload = function (game) {
  this.game = game;
};

Preload.prototype.preload = function () {
    var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loading");
    loadingBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loadingBar);

    var infoText = this.game.add.text(0, 0, "LOADING", { font: "87px Tahoma", fill: "#ffffff", wordWrap: true, wordWrapWidth: 300, align: "center" });
    infoText.anchor.set(0.5);
    infoText.x = this.game.world.centerX + 10;
    infoText.y = this.game.world.centerY - 100;

    // The rest of the stuff to preload
    this.game.load.image("menupanel","assets/glassPanel_cornerTL.png");
    this.game.load.image("buttonBlue","assets/buttonBlue.png");
    this.game.load.bitmapFont('spacefont', 'assets/fonts/paddington.png', 'assets/fonts/paddington.fnt');

    this.game.load.image('ufoRed', 'assets/ufoRed.png');
    this.game.load.image('ufoGreen', 'assets/ufoGreen.png');
    this.game.load.image('ufoBlue', 'assets/ufoBlue.png');
    this.game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);

    var number = this.game.rnd.integerInRange(1, 7);
    this.game.load.image('background', 'assets/background/background' + number + '.jpg');

    // Audio stuff
    this.game.load.audio('opening', ['assets/sound/Opening.ogg']);
    this.game.load.audio('levelmusic1', ['assets/sound/Fecit-potentiam.ogg']);
    this.game.load.audio('levelmusic2', ['assets/sound/Danger.ogg']);
};

Preload.prototype.create = function () {
    this.game.state.start("MainMenu");
};

module.exports = Preload;