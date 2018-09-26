import SVG, { Container } from 'svg.js';

import { BoardSize, TileType, smallTokens, largeTokens, EdgeLoc } from "./constants";
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

        this._draw = SVG('drawing').size(800, 800);

        this._grid = [];
        for (let y = 0; y < gridData.length; y++) {
            this._grid.push([]);
            for (let x = 0; x < gridData[y].length; x++) {
                this._grid[y].push(new GameTile(this._draw, gridData[y][x], 100, new BoardCoord(y, x)));
            }
        }

        this._setAllTokens();
    }

    private _findTile(coord: BoardCoord): GameTile { return this._grid[coord.y][coord.x]; }

    private _findFirstLandTile(): GameTile {
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[y].length; x++) {
                if (this._grid[y][x].data.type !== TileType.SEA) {
                    return this._grid[y][x];
                }
            }
        }
        return null;
    }

    private _setAllTokens() {
        const tokens: Array<number> = this._size === BoardSize.SMALL ? smallTokens : largeTokens;
        const placingDirs: Array<EdgeLoc> = [EdgeLoc.MID_R, EdgeLoc.BOT_R, EdgeLoc.BOT_L, EdgeLoc.MID_L, EdgeLoc.TOP_L, EdgeLoc.TOP_R];

        let currTData: GameTileData = this._findFirstLandTile().data;
        let pdIndex: number = 0;
        let currDir: EdgeLoc = placingDirs[pdIndex];

        let desertTraversed: boolean = false;
        
        while (tokens.length > 0) {
            if (currTData.type !== TileType.DESERT) {
                this._findTile(currTData.coord).setToken(this._draw, tokens.pop());
            } else {
                desertTraversed = true;
            }
            if (currTData.edges.get(currDir).tileData.type === TileType.SEA ||
                    currTData.edges.get(currDir).tileData.tokenNum ||
                        (currTData.edges.get(currDir).tileData.type === TileType.DESERT && desertTraversed)) {
                pdIndex = (pdIndex + 1) % placingDirs.length;
                currDir = placingDirs[pdIndex];
            }
            currTData = currTData.edges.get(currDir).tileData;
        }
    }

};

export { GameBoard };