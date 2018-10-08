import { VertexLoc, EdgeLoc } from "./constants";

class Coord {
    public y: number;
    public x: number;

    constructor(y: number, x: number) {
        this.y = y;
        this.x = x;
    }

    protected add(y: number, x: number): Coord {
        return new PixelCoord(this.y + y, this.x + x);
    }

    protected addCoord(coord: Coord): Coord {
        return this.add(coord.y, coord.x);
    }
};

class PixelCoord extends Coord{
    constructor(y: number, x: number) {
        super(y, x);
    }
    public add(y: number, x: number): PixelCoord { return <PixelCoord>super.add(y, x); }
    public addCoord(coord: PixelCoord): PixelCoord { return <PixelCoord>super.addCoord(coord); }
};

class BoardCoord extends Coord{
    constructor(y: number, x: number) {
        super(y, x);
    }
    public add(y: number, x: number): BoardCoord { return <BoardCoord>super.add(y, x); }
    public addCoord(coord: BoardCoord): BoardCoord { return <BoardCoord>super.addCoord(coord); }
};



export { BoardCoord, PixelCoord };