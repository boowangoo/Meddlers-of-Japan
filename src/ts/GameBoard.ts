import SVG from 'svg.js';

import { BoardSize } from "./constants";
import { GameBoardCtrl } from "./GameBoardCtrl";
import { GameTileData } from "./GameTileCtrl";
import { GameTile } from './GameTile';

class GameBoard {
    private _draw: svgjs.Container;
    private _grid: Array<Array<GameTile>>;
    private _gbc: GameBoardCtrl;

    constructor(size: BoardSize) {
        this._gbc = new GameBoardCtrl();
        const gridData: Array<Array<GameTileData>> = this._gbc.makeGrid(size);

        const DIMS = gridData.length;

        this._draw = SVG('drawing').size(800, 800);

        this._grid = [];
        for (let y = 0; y < DIMS; y++) {
            this._grid.push([]);
            for (let x = 0; x < DIMS; x++) {
                this._grid[y].push(new GameTile(this._draw, gridData[y][x], 100, y, x));
            }
        }
    }
};

export { GameBoard };