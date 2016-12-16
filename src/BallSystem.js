var Turret = require("./Turret");

function createBall() {
    var turret = this.turrets.getFirstExists(false);
    if (turret) {
        var bounds = this.game.world.bounds;
        var x = this.game.rnd.integerInRange(bounds.x + 400, bounds.width - 400);
        var y = this.game.rnd.integerInRange(bounds.y + 400, bounds.height - 400);
        turret.reset(x, y);
        turret.updateColorIndex(this.game.rnd.integerInRange(0, 2));

        var angle = this.game.rnd.integerInRange(0, 360);
        turret.adjustDirection(angle);
    }
}

function BallSystem(game, poker) {
    this.game = game;
    this.spawnTime = 10;
    this.score = 0;
    this.poker = poker;

    this.turrets = this.game.add.group();
    this.turrets.enableBody = true;
    this.turrets.physicsBodyType = Phaser.Physics.ARCADE;
    this.turrets.setAll('anchor.x', 0.5);
    this.turrets.setAll('anchor.y', 0.5);
    this.turrets.inputEnableChildren  = true;

    for (i = 0; i < 10; i++) {
        this.turrets.add(new Turret(this.game, i));
    }
    this.turrets.callAll('kill');

    this.explodeSound = this.game.add.audio('explode');
    this.explosions = null;
    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.forEach(function (explosion) {
        explosion.animations.add('explosion');
    });

    var self = this;
    this.turrets.onChildInputDown.add(function (turret, pointer) {
        self.score += 1;
        //turret.kill();
        this.createBall();
        //this.clone(turret);
    }, this);


    // Create an initial ball
    createBall.bind(this)();
}

BallSystem.constructor = BallSystem;

BallSystem.prototype.explode = function (turret) {
    var explosion = this.explosions.getFirstExists(false);
    if (explosion) {
        explosion.reset(turret.body.x, turret.body.y);
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        this.explodeSound.play();
    }

    turret.kill();
};

BallSystem.prototype.clone = function (origTurret) {
    var turret = this.turrets.getFirstExists(false);
    if (turret) {
        var x = origTurret.x - origTurret.width;
        var y = origTurret.y + origTurret.height;
        turret.reset(x, y);

        var angle = this.game.rnd.integerInRange(0, 360);
        turret.adjustDirection(angle);

    }

};

BallSystem.prototype.createBall = createBall;

BallSystem.prototype.collide = function (first, second) {
    if (first.color == second.color) {
        this.explode(first);
        this.explode(second);
    } else {
        first.updateColorIndex(first.colorIndex + 1);
        second.updateColorIndex(second.colorIndex + 1);
    }

};

module.exports = BallSystem;
