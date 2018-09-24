class GameTile {
    public hex: svgjs.Element;
    public circle: svgjs.Element;

    private _sq3: number;
    private _w: number;
    private _path: Array<number>;
    
	constructor(draw: svgjs.Container, type: any, width: number, cx: number, cy: number) {
		switch (type) {
		}
		this._sq3 = Math.sqrt(3);
		this._w = 0.5 * width / this._sq3;

		this._path = [0, 2, this._sq3, 1, this._sq3, -1, 0, -2, -this._sq3, -1, -this._sq3, 1]
				.map((pt, i) => 2 * this._w * pt);

		this.hex = draw.polygon(this._path).center(cx, cy);
		this.circle = draw.circle(2.5 * this._w).center(cx, cy).fill('#fff');
	}
}

export { GameTile };