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

const svgPaths = { DESERT: desertSVG, FIELD: fieldSVG, FOREST: forestSVG, HILL: hillSVG, MOUNTAIN: mountainSVG, PASTURE: pastureSVG, SEA: seaSVG };

class GameTile {
    private _data: GameTileData;
    private _center: PixelCoord;
    private _path: Array<number>;
    
    private _hex: svgjs.Element;
    private _circle: svgjs.Element;
    
	constructor(draw: svgjs.Container, data: GameTileData, width: number, coord: BoardCoord) {
        this._data = data;
        
		const sq3: number = Math.sqrt(3);
		const wScale: number = 0.5 * width / sq3;

		this._path = [0, 2, sq3, 1, sq3, -1, 0, -2, -sq3, -1, -sq3, 1]
                .map(pt => wScale * pt);

        const h: number = width * 0.5 * sq3 - 0.5; // the -0.5 at the end is just for removing small gaps of the tiles
        const cx = coord.y % 2 === 0 ? (coord.x + 1) * width : (coord.x + 0.5) * width;
        const cy = coord.y * h + (width / sq3);
        this._center = new PixelCoord(cy, cx);
        // console.log(this._center);

        this._hex = draw.polygon(this._path).center(cx, cy).fill('#f00');

        if (this._data.type !== TileType.SEA && this._data.type !== TileType.DESERT) {
            this._circle = draw.circle(width * 0.25).center(cx, cy).fill('#fff');
        }
        
        this.applyPattern(draw, this._data.type);
    }

    private applyPattern(draw: svgjs.Container, type: TileType, tileSize?: number) {
        const tSize: number = tileSize ? tileSize : 50;
        let pattern: svgjs.Pattern = draw.pattern(tSize, tSize, add => { add.image(svgPaths[TileType[type]]).size(tSize, tSize) });
        this._hex.attr({ fill: pattern })
    }
    
    public get center(): PixelCoord { return this._center; }
    public get data(): GameTileData { return this._data; }

    public setToken(draw: svgjs.Container, tokenNum: number) {
        this._data.setToken(tokenNum);
        draw.text(tokenNum.toString()).center(this._center.x, this._center.y);
    }
}

export { GameTile };