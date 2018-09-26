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
    private _tokenNum: number = null;
    private _robbed: boolean = false;
    private _coord: BoardCoord;

    private _edges = new Map<EdgeLoc, EdgeData>([
        [EdgeLoc.TOP_L, new EdgeData()],
        [EdgeLoc.TOP_R, new EdgeData()],
        [EdgeLoc.MID_L, new EdgeData()],
        [EdgeLoc.MID_R, new EdgeData()],
        [EdgeLoc.BOT_L, new EdgeData()],
        [EdgeLoc.BOT_R, new EdgeData()],
    ]);
    private _vertices = new Map<VertexLoc, VertexData>([
        [VertexLoc.TOP_L, new VertexData()],
        [VertexLoc.TOP_M, new VertexData()],
        [VertexLoc.TOP_R, new VertexData()],
        [VertexLoc.BOT_L, new VertexData()],
        [VertexLoc.BOT_M, new VertexData()],
        [VertexLoc.BOT_R, new VertexData()],
    ]);

    constructor(type: TileType, coord: BoardCoord) {
        this._type = type ? type : TileType.SEA;
        this._coord = coord;
    }

    // public get key(): string { return this._key; }
    public get type(): TileType { return this._type; }
    public get coord(): BoardCoord { return this._coord; }
    public get tokenNum(): number { return this._tokenNum; }
    public get robbed(): boolean { return this._robbed; }
    public get edges(): Map<EdgeLoc, EdgeData> { return this._edges; }

    public rob() { this._robbed = true; }
    public unrob() { this._robbed = false; }

    public changeEdge(loc: EdgeLoc, data?: GameTileData, roadOwner?: string, port?: ResourceType) {
        if (data) { this._edges.get(loc).tileData = data; }
        if (roadOwner) { this._edges.get(loc).roadOwner = roadOwner; }
        if (port) { this._edges.get(loc).port = port; }
    }
    public changeVertex(loc: VertexLoc, type?: SettlementType, owner?: string) {
        if (type) { this._vertices.get(loc).type = type; }
        if (owner) { this._vertices.get(loc).owner = owner; }
    }
    public setToken(tokenNum: number) { this._tokenNum = tokenNum; }
}

export { EdgeData, VertexData, GameTileData };