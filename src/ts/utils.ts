import { EdgeLoc, VertexLoc } from "./constants";
import { PixelCoord, BoardCoord } from "./newTypes";

class Utils {
    public static toPixelX(boardX: number,  width: number): number {
        return boardX * width / 2;
    }      

    public static toPixelY(boardY: number,  width: number): number {
        return boardY * width / 2 / Math.sqrt(3);
    }      

    public static toPixels(boardCoord: BoardCoord, width: number): PixelCoord {
        return new PixelCoord(
            this.toPixelY(boardCoord.y, width),
            this.toPixelX(boardCoord.x, width)
        );
    }

    public static toPixelYX(y: number, x: number, width: number): PixelCoord {
        return this.toPixels(new BoardCoord(y, x), width);
    }
}

export { Utils };