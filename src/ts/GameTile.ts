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

class GameTile {
    private _data: GameTileData;
    private _cx: number;
    private _cy: number;
    private _path: Array<number>;
    
    private hex: svgjs.Element;
    private circle: svgjs.Element;
    
	constructor(draw: svgjs.Container, data: GameTileData, width: number, y: number, x: number) {
        this._data = data;
        
		const sq3: number = Math.sqrt(3);
		const wScale: number = 0.5 * width / sq3;

		this._path = [0, 2, sq3, 1, sq3, -1, 0, -2, -sq3, -1, -sq3, 1]
                .map(pt => wScale * pt);

        const h: number = width * 0.5 * sq3;
        this._cx = y % 2 === 0 ? (x + 1) * width : (x + 0.5) * width;
        this._cy = y * h + (width / sq3);

		this.hex = draw.polygon(this._path).center(this._cx, this._cy).fill('#f00');
        this.circle = draw.circle(width * 0).center(this._cx, this._cy).fill('#fff');
        
        this.applyPattern(draw, this._data.type);
    }

    private applyPattern(draw: svgjs.Container, type: TileType, tileSize?: number) {
        const tSize: number = tileSize ? tileSize : 50;
        let pattern: svgjs.Pattern;

        switch (type) {
            case TileType.DESERT:
                pattern = draw.pattern(tSize, tSize, add => { add.image(desertSVG).size(tSize, tSize) });
                break;
            case TileType.FIELD:
                pattern = draw.pattern(tSize, tSize, add => { add.image(fieldSVG).size(tSize, tSize) });
                break;
            case TileType.FOREST:
                pattern = draw.pattern(tSize, tSize, add => { add.image(forestSVG).size(tSize, tSize) });
                break;
            case TileType.HILL:
                pattern = draw.pattern(tSize, tSize, add => { add.image(hillSVG).size(tSize, tSize) });
                break;
            case TileType.MOUNTAIN:
                pattern = draw.pattern(tSize, tSize, add => { add.image(mountainSVG).size(tSize, tSize) });
                break;
            case TileType.PASTURE:
                pattern = draw.pattern(tSize, tSize, add => { add.image(pastureSVG).size(tSize, tSize) });
                break;
            case TileType.SEA:
                pattern = draw.pattern(tSize, tSize, add => { add.image(seaSVG).size(tSize, tSize) });
                break;
            default:
                break;
        }

        this.hex.attr({ fill: pattern })
    }
    
    public get center(): Set<number> { return new Set([this._cx, this._cy]); }
}

export { GameTile };