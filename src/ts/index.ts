// import SVG from 'svg.js';
// import { GameTile } from './GameTile';

// const draw: svgjs.Container = SVG('drawing').size(300, 300);

// const gt: GameTile = new GameTile(draw, null, 50, 150, 150);

// var pattern = draw.pattern(50, 50, add => { add.image('/js/sea.svg').size(50, 50) });

// gt.hex.attr({ fill: pattern });

import { BoardSize } from './constants'
import { GameBoard } from './GameBoard';

const board = new GameBoard(BoardSize.SMALL);