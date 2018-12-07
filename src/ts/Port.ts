import SVG from 'svg.js';
import { BoardCoord, PixelCoord } from "./newTypes";
import { Utils } from './utils';

// import portSVG from '../res/port.svg';

class PortData {
    public a: BoardCoord;
    public b: BoardCoord;
}

class Port {
    private _data: PortData;
    private _port: svgjs.Element;

    constructor(draw: svgjs.Container, data: PortData) {
        let width = 100;
        const sq3 = Math.sqrt(3);
        
        this._data = data;
        
        let pCenter: PixelCoord;
        let pCenterIcon: PixelCoord;
        let rot: number;

        if (data.a.x === data.b.x && data.a.y < data.b.y) {
            pCenter = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(1, -0.25, width));
            pCenterIcon = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(1, -1, width));

            rot = -90;
            
        } else if (data.a.x === data.b.x && data.a.y > data.b.y) {
            pCenter = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(-1, 0.25, width));
            pCenterIcon = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(-1, 1, width));

            rot = 90;

        } else if (data.a.x < data.b.x && data.a.y < data.b.y) {
            pCenter = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(0.875, 0.375, width));
            pCenterIcon = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(2, 0, width));

            rot = -150;

        } else if (data.a.x < data.b.x && data.a.y > data.b.y) {
            pCenter = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(-0.875, 0.375, width));
            pCenterIcon = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(-2, 0, width));

            rot = -30;

        } else if (data.a.x > data.b.x && data.a.y < data.b.y) {
            pCenter = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(0.875, -0.375, width));
            pCenterIcon = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(2, 0, width));

            rot = 150;

        } else if (data.a.x > data.b.x && data.a.y > data.b.y) {
            pCenter = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(-0.875, -0.375, width));
            pCenterIcon = Utils.toPixels(data.a, width)
                    .addCoord(Utils.toPixelYX(-2, 0, width));

            rot = 30;

        }

        draw.polygon([
            0, 0,
            0, 0.5,
            1, 0.5,
            1, 0,
            0.8, 0,
            0.8, 0.3,
            0.2, 0.3,
            0.2, 0,
            1, 0
        ].map(n => n * width / 2))
            .center(pCenter.x, pCenter.y)
            .transform({ rotation: rot })
            .fill('#863');

        draw.circle(width / 2).center(pCenterIcon.x, pCenterIcon.y).fill('#fff');
    }
}

export { Port, PortData };