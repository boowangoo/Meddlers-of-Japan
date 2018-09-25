import { BoardSize, TileType, EdgeLoc, VertexLoc } from './constants'
import { GameTileData, EdgeData, VertexData } from './GameTileCtrl'

import * as boardDefaultSmall from '../res/boardDefaultSmall.json'
import * as boardDefaultLarge from '../res/boardDefaultSmall.json'

export class GameBoardCtrl {
    private _neighour(grid: Array<Array<GameTileData>>, y: number, x: number) {
        if (y % 2 === 0) {
            if (grid[y-1]) {
                grid[y][x].changeEdge(EdgeLoc.TOP_L, grid[y-1][x]);
                if (grid[y-1][x+1]) {
                    grid[y][x].changeEdge(EdgeLoc.TOP_R, grid[y-1][x+1]);
                }
            }
            if (grid[y+1]) {
                grid[y][x].changeEdge(EdgeLoc.BOT_L, grid[y+1][x]);
                if (grid[y+1][x+1]) {
                    grid[y][x].changeEdge(EdgeLoc.BOT_R, grid[y+1][x+1]);
                }
            }
        } else {
            if (grid[y-1]) {
                grid[y][x].changeEdge(EdgeLoc.TOP_R, grid[y-1][x] ? grid[y-1][x] : null);
                if (grid[y-1][x-1]) {
                    grid[y][x].changeEdge(EdgeLoc.TOP_L, grid[y-1][x-1]);
                }
            }
            if (grid[y+1]) {
                grid[y][x].changeEdge(EdgeLoc.BOT_R, grid[y+1][x]);
                if (grid[y+1][x-1]) {
                    grid[y][x].changeEdge(EdgeLoc.BOT_L, grid[y+1][x-1]);
                }
            }
        }
        if (grid[y][x-1]) {
            grid[y][x].changeEdge(EdgeLoc.MID_L, grid[y][x-1]);
        }
        if (grid[y][x+1]) {
            grid[y][x].changeEdge(EdgeLoc.MID_R, grid[y][x+1]);
        }
    }

    public makeGrid(size: BoardSize): Array<Array<GameTileData>> {
        const tileCnt = size === BoardSize.SMALL
                ? { DESERT: 1, FIELD: 4, FOREST: 4, PASTURE: 4, MOUNTAIN: 3, HILL: 3 }
                : { DESERT: 2, FIELD: 6, FOREST: 6, PASTURE: 6, MOUNTAIN: 5, HILL: 5 };

        const gridLayout: Array<Array<string>> = size === BoardSize.SMALL
                ? boardDefaultSmall.default : boardDefaultLarge.default;

        const DIMS = gridLayout.length;

        let grid: Array<Array<GameTileData>> = [];

        for (let y = 0; y < DIMS; y++) {
            grid.push([]);
            for (let x = 0; x < DIMS; x++) {
                if (gridLayout[y][x] == 'L') {
                    const keys = Object.keys(tileCnt);
                    let selectedType: string;
                    do {
                        selectedType = keys[keys.length * Math.random() | 0];
                    } while (tileCnt[selectedType] < 1 || selectedType === 'SEA');

                    // console.log("selectedType:", selectedType)
                    grid[y].push(new GameTileData(TileType[selectedType]));
                    tileCnt[selectedType]--;
                    console.log(JSON.stringify(tileCnt));
                    console.log(selectedType);
                } else {
                    grid[y].push(new GameTileData(TileType.SEA));
                }
            }
        }

        for (let y = 0; y < DIMS; y++) {
            for (let x = 0; x < DIMS; x++) {
                this._neighour(grid, y, x);
            }
        }

        return grid;
    }
};

// export { GameBoardCtrl };