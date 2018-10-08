import SVG from 'svg.js';

import { BoardSize } from "./constants";
import { GameBoardCtrl } from "./GameBoardCtrl";
import { GameTileData } from "./GameTileCtrl";
import { GameTile } from './GameTile';
import { BoardCoord } from './newTypes';
import { Port } from './Port';
import { HoverBox } from './Hoverbox';

class GameBoard {
    private _draw: svgjs.Container;
    private _gbc: GameBoardCtrl;

    private _tileMap: Map<BoardCoord, GameTile> = new Map<BoardCoord, GameTile>();
    private _ports: Array<Port>;

    constructor(size: BoardSize) {
        this._gbc = new GameBoardCtrl(size);

        const tileData: Array<GameTileData> = this.gbc.makeTileData(size);

        this._draw = SVG('drawing').size(800, 800);

        tileData.map((d: GameTileData) => {
            this.tileMap.set(d.coord, new GameTile(this._draw, 100, d));
        });

        this.gbc.setRollNums(this.draw, this.tileMap);

        this._ports = this.gbc.getPortData().map(p => new Port(this.draw, p));

        new HoverBox(this.draw);
        new HoverBox(this.draw, true);
    }

    public get draw(): svgjs.Container { return this._draw; }
    public get gbc(): GameBoardCtrl { return this._gbc; }
    public get tileMap(): Map<BoardCoord, GameTile> { return this._tileMap; }
};

export { GameBoard };