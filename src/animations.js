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
};
