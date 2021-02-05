module.exports = {
    load(phaser, config) {
        phaser.load.spritesheet(config.image, config.image, {
            frameWidth: config.frameWidth,
            frameHeight: config.frameHeight,
        });
    },

    create(game, config) {
        game.anims.create({
            key: config.key,
            frames: game.anims.generateFrameNumbers(
                config.image,
                config.frames
            ),
            frameRate: config.frameRate,
            repeat: config.repeat,
        });
    },

    getPackedFrames(name, start, end) {
        const frames = [];

        for(let i = start; i <= end; i++) {
            frames.push({ key: 'pack-result', frame: `atlases/${name}/${i}.png` })
        }

        return frames;
    },

    chain(sprite, ...animations) {
        return new Promise(resolve => {
            let onAnimationComplete = (anim) => {
                var next = animations.shift();
            
                if (next) {
                    sprite.play(next);
                } else {
                    sprite.off("animationcomplete", onAnimationComplete);
                    resolve()
                }
            }

            sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, onAnimationComplete);
            sprite.play(animations[0]);
        })
    }
};
