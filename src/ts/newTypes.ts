class Coord {
    public y: number;
    public x: number;

    constructor(y: number, x: number) {
        y = this.y;
        x = this.x;
    }
};

class BoardCoord extends Coord{};
class PixelCoord extends Coord{};