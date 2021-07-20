import Phaser from 'phaser';
import Bootloader from './bootloader.js';
import Cinematic from './cinematic.js';
import Menu from './menu.js';
import SinglePlayerGame from './single_player_game.js';
import MultiPlayerGame from './multi_player_game.js';
import Settings from './settings.js';
import Help from './help.js'

const config = {
    width: 800,
    height: 600,
    scale:{
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    parent: "contenedor",
    physics: {
        default: "arcade",
        debug: true,
    },
    scene: [
        Bootloader,
        Cinematic,
        Menu,
        SinglePlayerGame,
        MultiPlayerGame,
        Settings,
        Help,
    ]
}

new Phaser.Game(config);