import uniqid from 'uniqid';

import { TileType, ResourceType, SettlementType } from './constants'
import { EdgeLoc, VertexLoc } from './constants'
import { BoardCoord } from './newTypes';

class EdgeData {
    public tileData: GameTileData = null;
    public roadOwner: string = null;
    public port: ResourceType = null;
}
class VertexData {
    public type: SettlementType = null;
    public owner: string = null;
}

class GameTileData {
    // private _key: string = uniqid();
    private _type: TileType = null;
    private _coord: BoardCoord = null;
    private _rollNum: number = null;
    private _robbed: boolean = false;

    constructor(type: TileType, coord: BoardCoord) {
        this._type = type;
        this._coord = coord;
        // this._type = type ? type : TileType.SEA;
    }

    // public get key(): string { return this._key; }
    public get type(): TileType { return this._type; }
    public get coord(): BoardCoord { return this._coord; }
    public get rollNum(): number { return this._rollNum; }
    public get robbed(): boolean { return this._robbed; }

    public rob() { this._robbed = true; }
    public unrob() { this._robbed = false; }

    public setToken(tokenNum: number) {
        this._rollNum = tokenNum;
    }
}



export { EdgeData, VertexData, GameTileData };