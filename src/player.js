import ground from './ground';
import Phaser from 'phaser';
import Animations from './animations';
import pointManager from './pointManager';
import SnowParticle from '../assets/image/snow-particle.png';
import Hiscore from './Hiscore';

window.cameraX = 500;

export default {
    particles: null,
    snowEmitter: null,
    doEmitSnow: false,
    player: null,
    fadeRect: null,
    gravity: 15,
    friction: 0.7,
    feelGoodFormula: 40, // Magic number that defines the "feel" of the game
    flipSpeed: 400,
    flipAmount: 0,
    groundOffset: -45, // The offset that the player has to the ground, to make sure the feet follows the ground, and not the body
    bracing: false,
    flipping: false,

    velocity: { x: 100, y: -2 },

    preload(phaser) {
        ground.preload(phaser);
        phaser.load.image('snow-particle', SnowParticle);
    },

    keyTrick: false,
    keyBrace: false,
    keyFlipLeft: false,
    keyFlipRight: false,

    create(phaser) {
        ground.create(phaser);
        this.createAnimations(phaser);

        this.particles = phaser.add.particles('snow-particle');
        this.snowEmitter = this.particles.createEmitter({
            frames: 0,
            speedX: {
                onEmit: (particle, key, t, value) => {
                    return -this.velocity.x * 8 * (Math.random()/2 + 0.5);
                }
            },
            speedY: {
                onEmit: (particle, key, t, value) => {
                    return -this.velocity.x * 6 * Math.random();
                }
            },
            visible: {
                onEmit: (particle, key, t, value) => {
                    return this.doEmitSnow;
                }
            },
            lifespan: 150,
            rotate: { start: 0, end: 360 },
            scale: { start: 0.1, end: 0.5 },
            blendMode: 'NORMAL',
            frequency: 1,
            quantity: 3,
        });

        this.player = phaser.add.sprite(100, 200, 'pack-result', '');
        this.player.setScale(0.7, 0.7);
        this.player.play('jesus_idle');

        this.keyTrick = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );
        this.keyBrace = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.keyFlipLeft = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        this.keyFlipRight = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );

        this.fadeRect = phaser.add.rectangle(400, 300, 800, 600, 0x000000, 0);
    },

    createAnimations(phaser) {
        const animations = [
            {
                key: 'jesus_idle',
                frames: Animations.getPackedFrames('jesus_idle', 0, 0),
                frameRate: 120,
                repeat: -1
            },
            {
                key: 'jesus_grab_end',
                frames: Animations.getPackedFrames('jesus_grab_end', 0, 21),
                frameRate: 120,
                repeat: 0
            },
            {
                key: 'jesus_grab',
                frames: Animations.getPackedFrames('jesus_grab_start', 0, 0),
                frameRate: 120,
                repeat: 0
            },
            {
                key: 'jesus_grab_start',
                frames: Animations.getPackedFrames('jesus_grab_start', 0, 21),
                frameRate: 120,
                repeat: 0
            },
            {
                key: 'jesus_hopdown',
                frames: Animations.getPackedFrames('jesus_hopdown', 0, 23),
                frameRate: 120,
                repeat: 0
            },
            {
                key: 'jesus_hopup',
                frames: Animations.getPackedFrames('jesus_hopup', 0, 22),
                frameRate: 120,
                repeat: 0
            },
            {
                key: 'jesus_speedup_start',
                frames: Animations.getPackedFrames('jesus_speedup_start', 0, 22),
                frameRate: 120,
                repeat: 0
            },
            {
                key: 'jesus_speedup',
                frames: Animations.getPackedFrames('jesus_speedup', 0, 0),
                frameRate: 120,
                repeat: -1
            },
            {
                key: 'jesus_speedup_end',
                frames: Animations.getPackedFrames('jesus_speedup_end', 0, 22),
                frameRate: 120,
                repeat: 0
            }
        ]

        animations.forEach(config => phaser.anims.create(config));
    },

    lastBracing: false,
    lastFlipping: false,
    handleAnimationState() {
        if(this.flipping && !this.lastFlipping) {
            Animations.chain(this.player, 'jesus_grab_start', 'jesus_grab');
        }
        if(!this.flipping && this.lastFlipping) {
            Animations.chain(this.player, 'jesus_grab_end', 'jesus_idle');
        }
        if(this.bracing && !this.lastBracing) {
            Animations.chain(this.player, 'jesus_speedup_start', 'jesus_speedup');
        }
        if(!this.bracing && this.lastBracing) {
            Animations.chain(this.player, 'jesus_speedup_end', 'jesus_idle');
        }

        this.lastBracing = this.bracing;
        this.lastFlipping = this.flipping;
    },

    update(phaser, time, deltaTime) {
        ground.update(phaser, time, deltaTime);

        if (this.player != null) {
            const groundPos = ground.getGroundHeight(
                this.player.x + window.cameraX
            );
            const nextGroundPos = ground.getGroundHeight(
                this.player.x + window.cameraX + 1
            );

            console.log(this.velocity.x);
            if (Math.abs(this.player.y - this.groundOffset - groundPos) < 10 && this.velocity.x > 115) {
                const snowXOffset = 30;
                const snowYOffset = 50;

                this.snowEmitter.setPosition(
                        this.player.x + snowXOffset * Math.cos((this.player.angle + 180)/180*Math.PI) + snowYOffset * Math.cos((this.player.angle + 90)/180*Math.PI),
                        this.player.y + snowXOffset * Math.sin((this.player.angle + 180)/180*Math.PI) + snowYOffset * Math.sin((this.player.angle + 90)/180*Math.PI)
                    );
                    
                if (!this.doEmitSnow) {
                    setTimeout(() => {
                        this.doEmitSnow = true;
                    }, 100)
                }
            }
            else if (this.doEmitSnow) {
                this.doEmitSnow = false; 
                
                this.snowEmitter.setPosition( -100, -100 );
            }


            if (this.player.y < groundPos) {
                this.velocity.y += this.gravity * deltaTime;
            } else if (this.velocity.y > 0) {
                this.velocity.y = 0;
                this.player.y = groundPos + this.groundOffset;
            }

            if (
                nextGroundPos + this.groundOffset <
                this.player.y + this.velocity.y + 2
            ) {
                const sx = 1;
                const sy = nextGroundPos - groundPos;

                if (sy / sx >= 0) {
                    this.velocity.x +=
                        this.gravity *
                        (sy / sx) *
                        deltaTime *
                        this.feelGoodFormula;
                } else {
                    this.velocity.x +=
                        this.friction *
                        this.gravity *
                        this.velocity.x *
                        deltaTime *
                        -((sy / sx) ** 2);
                }

                let deltaAngle = this.player.angle;
                this.player.angle = Math.atan2(sy, sx) * (180 / Math.PI);
                deltaAngle = this.player.angle - deltaAngle;

                if (Math.abs(deltaAngle) > 45) {
                    this.velocity.x =
                        this.velocity.x / 2 +
                        (this.velocity.x / 2) *
                            Math.cos((deltaAngle / 180) * Math.PI);

                    pointManager.resetMultiplier();
                }

                if (
                    Math.abs(deltaAngle) < 45 &&
                    Math.abs(this.flipAmount) / 270 > 1
                ) {
                    const flips = Math.floor(
                        (Math.abs(this.flipAmount) + 90) / 360
                    );

                    this.velocity.x += 25 * flips;
                    pointManager.addPoints(1000 * flips, false);
                    pointManager.increaseMultiplier(flips);
                }
                this.flipAmount = 0;
            }

            while (
                nextGroundPos + this.groundOffset <
                this.player.y + this.velocity.y
            ) {
                this.velocity.y -= deltaTime;
            }

            this.player.y += this.velocity.y;
        }

        if (this.keyBrace.isDown) {
            if(!this.bracing) {
                this.gravity = 30;
                this.velocity.y = Math.max(this.velocity.y, 0);

                this.bracing = true;
            }
        } else {
            if(this.bracing) {
                this.gravity = 10;

                this.bracing = false;
            }

            let flip = this.keyFlipRight.isDown - this.keyFlipLeft.isDown;
            this.flipping = false;
            if (flip != 0) {
                this.player.angle += flip * this.flipSpeed * deltaTime;
                this.flipAmount += flip * this.flipSpeed * deltaTime;

                if(Math.abs(this.flipAmount) > 20) {
                    this.flipping = true;
                }
            }
        }

        if (this.velocity.x <= 10) {
            this.fadeRect.alpha += deltaTime / 5;
            if (this.fadeRect.alpha >= 1) {
                this.gameOver();
            }
        } else this.fadeRect.alpha = 0;

        this.handleAnimationState();

        window.cameraX += deltaTime * this.velocity.x * 10;
        pointManager.addPoints(deltaTime * this.velocity.x * 3, true);
    },

    async gameOver() {
        const hiscore = new Hiscore('https://localhost:1234');
        const name = prompt(`
            Game Over!
            Du fick ${pointManager.points} poäng.

            Vad vill du heta på topplistan?
        `);

        await hiscore.postScore(7, pointManager.points, name);
        location.reload();
    },
};
