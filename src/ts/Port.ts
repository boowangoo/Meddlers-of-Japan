import { BoardCoord, PixelCoord } from "./newTypes";

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

        this._data = data;

        const sq3 = Math.sqrt(3);

        const pCenter = new PixelCoord(
            (width / 2/ sq3) * (data.a.y + data.b.y) / 2,
            (width / 2) * (data.a.x + data.b.x) / 2
        );

        const pCenter2 = new PixelCoord(
            (width / 2 / sq3) * (data.a.y - 0.875),
            (width / 2) * (data.a.x + 0.64952 / sq3)
        );

        console.log(data.a)

        // draw.circle(10).center(
        //     (width / 2) * (data.a.x) + (0.64952 * width / sq3 / 2),
        //     (width / 2 / sq3) * (data.a.y) - (0.875 * width / sq3 / 2)
        // );

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
            .center(pCenter2.x, pCenter2.y)
            .transform({rotation: -30})
    }
}

export { Port, PortData };