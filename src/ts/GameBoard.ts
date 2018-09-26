import SVG from 'svg.js';

import { BoardSize } from "./constants";
import { GameBoardCtrl } from "./GameBoardCtrl";
import { GameTileData } from "./GameTileCtrl";
import { GameTile } from './GameTile';
import { BoardCoord } from './newTypes';

class GameBoard {
    private _draw: svgjs.Container;
    private _gbc: GameBoardCtrl;

    private _grid: Array<Array<GameTile>>;
    private _size: BoardSize;

    constructor(size: BoardSize) {
        this._gbc = new GameBoardCtrl();
        this._size = size;

        const gridData: Array<Array<GameTileData>> = this._gbc.makeGrid(this._size);

        const DIMS = gridData.length;

        this._draw = SVG('drawing').size(800, 800);

        this._grid = [];
        for (let y = 0; y < DIMS; y++) {
            this._grid.push([]);
            for (let x = 0; x < DIMS; x++) {
                this._grid[y].push(new GameTile(this._draw, gridData[y][x], 100, new BoardCoord(y, x)));
            }
        }
    }

    private setTokens(gridData: Array<Array<GameTileData>>) {
        this._gbc.setTokens(gridData, this._size);
        const DIMS = this._grid.length;

        for (let y = 0; y < DIMS; y++) {
            for (let x = 0; x < DIMS; x++) {
                this._grid[y][x].setRollNum(this._draw, this._grid[y][x].data.rollNum)
            }
        }
    }

};

export { GameBoard };