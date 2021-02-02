import fragShader from './BlurPipeline.fs';

class BlurPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game) {
        console.log(fragShader);
        super({
            game,
            renderer: game.renderer,
            fragShader
        })
    }
}

export default BlurPipeline