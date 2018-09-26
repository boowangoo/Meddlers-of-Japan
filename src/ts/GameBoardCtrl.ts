import { BoardSize, TileType, EdgeLoc, VertexLoc, smallTokens, largeTokens } from './constants'
import { GameTileData, EdgeData, VertexData } from './GameTileCtrl'
import { BoardCoord } from './newTypes';

import * as boardDefaultSmall from '../res/boardDefaultSmall.json'
import * as boardDefaultLarge from '../res/boardDefaultSmall.json'
import { GameTile } from './GameTile';

export class GameBoardCtrl {
    private _neighour(grid: Array<Array<GameTileData>>, coord: BoardCoord) {
        const y = coord.y;
        const x = coord.x;
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
        if (grid[y] && grid[y][x-1]) {
            grid[y][x].changeEdge(EdgeLoc.MID_L, grid[y][x-1]);
        }
        if (grid[y] && grid[y][x+1]) {
            grid[y][x].changeEdge(EdgeLoc.MID_R, grid[y][x+1]);
        }
    }

    // private _findFirstLandTile(grid: Array<Array<GameTileData>>): GameTileData {
    //     const DIMS: number = grid.length;

    //     for (let y = 0; y < DIMS; y++) {
    //         for (let x = 0; x < DIMS; x++) {
    //             if (grid[y][x].type !== TileType.SEA) {
    //                 return grid[y][x];
    //             }
    //         }
    //     }

    //     return null;
    // }

    // public setTokens(grid: Array<Array<GameTileData>>, size: BoardSize) {
    //     const tokens: Array<number> = size === BoardSize.SMALL ? smallTokens : largeTokens;
    //     const placingDirs: Array<EdgeLoc> = [EdgeLoc.MID_R, EdgeLoc.BOT_R, EdgeLoc.BOT_L, EdgeLoc.MID_L, EdgeLoc.TOP_L, EdgeLoc.TOP_R];
        
    //     let pdIndex: number = 0;
    //     let currTile: GameTileData = this._findFirstLandTile(grid);
    //     let currDir: EdgeLoc = placingDirs[pdIndex];

    //     while (tokens.length > 0) {
    //         if (currTile.type !== TileType.DESERT) {
    //             currTile.setToken(tokens.pop());
    //         }
    //         while (currTile.edges.get(currDir).tileData.type === TileType.SEA) {
    //             pdIndex = (pdIndex + 1) % placingDirs.length;
    //             currDir = placingDirs[pdIndex];
    //         }
    //         currTile = currTile.edges.get(currDir).tileData;
    //     }
    // }

    public makeGrid(size: BoardSize): Array<Array<GameTileData>> {
        const tileCnt = size === BoardSize.SMALL
                ? { DESERT: 1, FIELD: 4, FOREST: 4, PASTURE: 4, MOUNTAIN: 3, HILL: 3 }
                : { DESERT: 2, FIELD: 6, FOREST: 6, PASTURE: 6, MOUNTAIN: 5, HILL: 5 };

        const gridLayout: Array<Array<string>> = size === BoardSize.SMALL
                ? boardDefaultSmall.default : boardDefaultLarge.default;

        let grid: Array<Array<GameTileData>> = [];

        for (let y = 0; y < gridLayout.length; y++) {
            grid.push([]);
            for (let x = 0; x < gridLayout[y].length; x++) {
                if (gridLayout[y][x] == 'L') {
                    const keys = Object.keys(tileCnt);
                    let selectedType: string;
                    do {
                        selectedType = keys[keys.length * Math.random() | 0];
                    } while (tileCnt[selectedType] < 1 || selectedType === 'SEA');

                    // console.log("selectedType:", selectedType)
                    grid[y].push(new GameTileData(TileType[selectedType], new BoardCoord(y, x)));
                    tileCnt[selectedType]--;
                    // console.log(JSON.stringify(tileCnt));
                    // console.log(selectedType);
                } else {
                    grid[y].push(new GameTileData(TileType.SEA, new BoardCoord(y, x)));
                }
            }
        }

        for (let y = 0; y < gridLayout.length; y++) {
            for (let x = 0; x < gridLayout[y].length; x++) {
                this._neighour(grid, new BoardCoord(y, x));
            }
        }

        return grid;
    }

    
};

// export { GameBoardCtrl };