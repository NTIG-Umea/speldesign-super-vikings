import ground from './ground';
import Phaser from 'phaser';
import Animations from './animations';

window.cameraX = 500;

export default {
    balls: [],
    player: null,
    gravity: 15,
    friction: 0.7,
    feelGoodFormula: 40, // Magic number that defines the "feel" of the game
    flipSpeed: 500,
    flipAmount: 0,
    groundOffset: -45, // The offset that the player has to the ground, to make sure the feet follows the ground, and not the body
    bracing: false,
    flipping: false,

    velocity: { x: 100, y: -2 },

    preload(phaser) {
        ground.preload(phaser);
    },

    keyTrick: false,
    keyBrace: false,
    keyFlipLeft: false,
    keyFlipRight: false,

    create(phaser) {
        ground.create(phaser);

        this.createAnimations(phaser);

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

                if (Math.abs(deltaAngle) > 20) {
                    this.velocity.x =
                        this.velocity.x / 2 +
                        (this.velocity.x / 2) *
                            Math.cos((deltaAngle / 180) * Math.PI);
                }

                if (
                    Math.abs(deltaAngle) < 45 &&
                    Math.abs(this.flipAmount) / 270 > 1
                ) {
                    const flips = Math.floor(
                        (Math.abs(this.flipAmount) + 90) / 360
                    );

                    this.velocity.x += 25 * flips;
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

        this.handleAnimationState();

        window.cameraX += deltaTime * this.velocity.x * 10;
    },
};
