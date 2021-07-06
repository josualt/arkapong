import Bootloader from './bootloader.js';
import ScenePlay from './scene_play.js';

const config = {
    width: 640,
    height: 400,
    parent: "contenedor",
    physics: {
        default: "arcade"
    },
    scene: [
        Bootloader,
        ScenePlay
    ]
}

new Phaser.Game(config);