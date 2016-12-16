function Background(game) {
    Phaser.TileSprite.call(this, game, 0, 0, game.width, game.height, 'background');
    this.game = game;
    this.fixedToCamera = true;
}

Background.prototype = Object.create(Phaser.TileSprite.prototype);
Background.constructor = Background;

Background.prototype.update = function () {
    this.tilePosition.x = -this.game.camera.x;
    this.tilePosition.y = -this.game.camera.y;
};

module.exports = Background;
