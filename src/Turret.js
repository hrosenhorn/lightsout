
var colors = ["ufoRed", "ufoGreen", "ufoBlue"];


function calculateTexture(self, colorIndex) {
    self.colorIndex = colorIndex % colors.length;
    self.color = colors[self.colorIndex];
    self.loadTexture(self.color, 0);
}

function Turret(game, colorIndex) {
    Phaser.Sprite.call(this, game, 0, 0, 'ufoRed');

    calculateTexture(this, colorIndex);

    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.7, 0.7);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
}
Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.constructor = Turret;

Turret.prototype.adjustDirection = function (angle) {
    this.body.angle += angle;
    this.game.physics.arcade.velocityFromAngle(this.body.angle, 500, this.body.velocity);
};


Turret.prototype.updateColorIndex = function (newIndex) {
    calculateTexture(this, newIndex);
};

module.exports = Turret;
