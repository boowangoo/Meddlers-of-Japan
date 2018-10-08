import SVG from 'svg.js';
import { GameTileData } from './GameTileCtrl';
import { TileType } from './constants';

import desertSVG from '../res/patterns/desert.svg';
import fieldSVG from '../res/patterns/field.svg';
import forestSVG from '../res/patterns/forest.svg';
import hillSVG from '../res/patterns/hill.svg';
import mountainSVG from '../res/patterns/mountain.svg';
import pastureSVG from '../res/patterns/pasture.svg';
import seaSVG from '../res/patterns/sea.svg';
import { BoardCoord, PixelCoord } from './newTypes';
import { Utils } from './utils';

const svgPaths = { DESERT: desertSVG, FIELD: fieldSVG, FOREST: forestSVG, HILL: hillSVG, MOUNTAIN: mountainSVG, PASTURE: pastureSVG, SEA: seaSVG };

class GameTile {
    private _data: GameTileData;
    private _center: PixelCoord;

    private _hex: svgjs.Element;
    private _circle: svgjs.Element;

    constructor(draw: svgjs.Container, width: number, data: GameTileData) {
        this._data = data;
        
        this._center = Utils.toPixels(data.coord, width);

        const cx: number = this.center.x;
        const cy: number = this.center.y;
        const unitX: number = Utils.toPixelX(1, width);
        const unitY: number = Utils.toPixelY(1, width)

		const path = [
            cx, cy + 2 * unitY,
            cx + unitX, cy + unitY,
            cx + unitX, cy - unitY,
            cx, cy - 2 * unitY,
            cx - unitX, cy - unitY,
            cx - unitX, cy + unitY
        ]

        this._hex = draw.polygon(path).fill('#f00');

        this.applyPattern(draw, this._data.type, width);
    }

    private applyPattern(draw: svgjs.Container, type: TileType, tileSize?: number) {
        const tSize: number = tileSize ? tileSize : 50;
        let pattern: svgjs.Pattern = draw.pattern(tSize, tSize, add => { add.image(svgPaths[TileType[type]]).size(tSize, tSize) });
        this._hex.fill(pattern);
    }

    public setRollNum(draw: svgjs.Container, rollNum: number) {
        draw.circle(30).center(this.center.x, this.center.y).fill('#fff');
        draw.text(rollNum.toString()).center(this.center.x, this.center.y);
    }

    public get center(): PixelCoord { return this._center; }
    public get data(): GameTileData { return this._data; }
}

export { GameTile };