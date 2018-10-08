import { GameTile } from './GameTile';
import { GameTileData, EdgeData, VertexData } from './GameTileCtrl';
import { BoardCoord } from './newTypes';
import { BoardSize, TileType, EdgeLoc, VertexLoc, smallTokens, largeTokens } from './constants';

import boardTemplates from '../res/boardTemplates.json';
import { Port, PortData } from './Port';

class GameBoardCtrl {
    private _size: BoardSize;
    private _tileCnt;
    private _boardTemplate;
    private _tokens: Array<number>;
    
    constructor(size: BoardSize) {
        this._size = size;
        this._boardTemplate = boardTemplates[BoardSize[size]];

        if (size === BoardSize.SMALL) {
            this._tileCnt = { DESERT: 1, FIELD: 4, FOREST: 4, PASTURE: 4, MOUNTAIN: 3, HILL: 3 };
            this._tokens = smallTokens;
        } else {
            this._tileCnt = { DESERT: 2, FIELD: 6, FOREST: 6, PASTURE: 6, MOUNTAIN: 5, HILL: 5 };
            this._tokens = largeTokens;
        }
    }

    public makeTileData(size: BoardSize): Array<GameTileData> {
        const data: Array<GameTileData> = [];

        let keys = Object.keys(this.tileCnt);

        let selectedType: string;

        this.boardTemplate.SEA.map((sea: BoardCoord) => {
            data.push(new GameTileData(TileType.SEA, sea));
        });

        this.boardTemplate.LAND.map((land: BoardCoord) => {
            do {
                selectedType = keys[keys.length * Math.random() | 0];
            }
            while (this.tileCnt[selectedType] < 1);

            data.push(new GameTileData(TileType[selectedType], land));
            this.tileCnt[selectedType]--;
        });

        return data;
    }

    public getPortData() {
        return this.boardTemplate.PORT;
    }

    public setRollNums(draw: svgjs.Container, tMap: Map<BoardCoord, GameTile>) {
        let t = 0;
        this.boardTemplate.LAND.map((land: BoardCoord) => {
            const tile: GameTile = tMap.get(land);

            if (tile.data.type != TileType.DESERT) {
                tile.setRollNum(draw, this.tokens[t++]);
            }
        });
    }

    public get size() { return this._size; }
    public get tileCnt() { return this._tileCnt; }
    public get boardTemplate() { return this._boardTemplate; }
    public get tokens() { return this._tokens; }
};

export { GameBoardCtrl };