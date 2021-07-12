import Bootloader from './bootloader.js';
import Cinematic from './cinematic.js';
import Menu from './menu.js';
import SinglePlayerGame from './single_player_game.js';
import MultiPlayerGame from './multi_player_game.js';
import Settings from './settings.js';
import Help from './help.js'

const config = {
    width: 640,
    height: 400,
    parent: "contenedor",
    physics: {
        default: "arcade"
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