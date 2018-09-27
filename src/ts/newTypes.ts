class Coord {
    public y: number;
    public x: number;

    constructor(y: number, x: number) {
        this.y = y;
        this.x = x;
    }
};

class BoardCoord extends Coord{ constructor(y: number, x: number) { super(y, x); } };
class PixelCoord extends Coord{ constructor(y: number, x: number) { super(y, x); } };

export { BoardCoord, PixelCoord };