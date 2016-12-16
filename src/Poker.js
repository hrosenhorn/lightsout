
var ACCLERATION = 700;
var DRAG = 100;
var MAXSPEED = 700;

function Poker (game) {
    Phaser.Sprite.call(this, game, 0, 0, 'meteor');

    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.7, 0.7);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.drag.setTo(DRAG, DRAG);
    this.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.body.bounce.set(1);
}
Poker.prototype = Object.create(Phaser.Sprite.prototype);
Poker.constructor = Poker;

Poker.prototype.update = function () {

    if (this.game.input.mousePointer.isDown) {

        this.game.physics.arcade.moveToPointer(this, ACCLERATION);

    }

    //game.physics.arcade.moveToPointer(sprite, 400);

};

module.exports = Poker;
