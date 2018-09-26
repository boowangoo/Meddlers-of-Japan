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

const svgPaths = { DESERT: desertSVG, FIELD: fieldSVG, FOREST: forestSVG, HILL: hillSVG, MOUNTAIN: mountainSVG, PASTURE: pastureSVG, SEA: seaSVG };

class GameTile {
    private _data: GameTileData;
    private _cx: number;
    private _cy: number;
    private _path: Array<number>;
    
    private _hex: svgjs.Element;
    private _circle: svgjs.Element;
    
	constructor(draw: svgjs.Container, data: GameTileData, width: number, y: number, x: number) {
        this._data = data;
        
		const sq3: number = Math.sqrt(3);
		const wScale: number = 0.5 * width / sq3;

		this._path = [0, 2, sq3, 1, sq3, -1, 0, -2, -sq3, -1, -sq3, 1]
                .map(pt => wScale * pt);

        const h: number = width * 0.5 * sq3 - 0.5; // the -0.5 at the end is just for removing small gaps of the tiles
        this._cx = y % 2 === 0 ? (x + 1) * width : (x + 0.5) * width;
        this._cy = y * h + (width / sq3);

        this._hex = draw.polygon(this._path).center(this._cx, this._cy).fill('#f00');

        if (this._data.type !== TileType.SEA && this._data.type !== TileType.DESERT) {
            this._circle = draw.circle(width * 0.5).center(this._cx, this._cy).fill('#fff');
        }
        
        this.applyPattern(draw, this._data.type);
    }

    private applyPattern(draw: svgjs.Container, type: TileType, tileSize?: number) {
        const tSize: number = tileSize ? tileSize : 50;
        let pattern: svgjs.Pattern = draw.pattern(tSize, tSize, add => { add.image(svgPaths[TileType[type]]).size(tSize, tSize) });
        this._hex.attr({ fill: pattern })
    }
    
    public get center(): Set<number> { return new Set([this._cx, this._cy]); }
}

export { GameTile };