import { BoardSize } from "./constants";
import { GameBoardCtrl } from "./GameBoardCtrl";
import { GameTileData } from "./GameTileCtrl";

class GameBoard {
    private _grid: Array<Array<GameTileData>>;

    constructor(size: BoardSize) {
        this._grid = GameBoardCtrl.makeGrid(size);
    }
};