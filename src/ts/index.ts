// import SVG from 'svg.js';
// import { GameTile } from './GameTile';

// const draw: svgjs.Container = SVG('drawing').size(300, 300);

// const gt: GameTile = new GameTile(draw, null, 50, 150, 150);

// var pattern = draw.pattern(50, 50, add => { add.image('/js/sea.svg').size(50, 50) });

// gt.hex.attr({ fill: pattern });

import { BoardSize, TileType } from './constants'
import { GameBoardCtrl } from './GameBoardCtrl'

const gbc = new GameBoardCtrl();
console.log(gbc.makeGrid(BoardSize.SMALL).map(o1 => o1.map(o2 => TileType[o2.type])));