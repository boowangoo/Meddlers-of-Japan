import SVG from 'svg.js';
import { HoverBoxType } from './constants';

class HoverBox {
    private _hoverBox: svgjs.Element;

    private _type: HoverBoxType;
    private enabled: boolean;

    constructor(draw: svgjs.Container, type: HoverBoxType) {
        const attrOver = { fill: '#f06', 'fill-opacity': 0.5 };
        const attrOut = { fill: '#f06', 'fill-opacity': 0.2 };

        this._type = type;

        this._hoverBox = draw.circle(100).attr(attrOut)
                .mouseover(function() { this.attr(attrOver) })
                .mouseout(function() { this.attr(attrOut) });
    }
}

export { HoverBox };