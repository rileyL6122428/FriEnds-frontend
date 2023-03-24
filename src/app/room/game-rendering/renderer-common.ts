import { Game } from "../game/game";

export class RendererCommon {
    constructor(
        readonly ctx: CanvasRenderingContext2D,
        readonly canvasWidth: number,
        readonly canvasHeight: number,
        readonly game: Game,
    ) { }
    
    canvasToGridSpace(x: number, y: number) {
        const gridSpaceWidth = this.canvasWidth / this.game.grid.cols;
        const gridSpaceHeight = this.canvasHeight / this.game.grid.rows;
        return {
            col: Math.floor(x / gridSpaceWidth),
            row: Math.floor(y / gridSpaceHeight),
        };
    }

    gridSpaceToCanvas(col: number, row: number) {
        const gridSpaceWidth = this.canvasWidth / this.game.grid.cols;
        const gridSpaceHeight = this.canvasHeight / this.game.grid.rows;
        return {
            x: col * gridSpaceWidth,
            y: row * gridSpaceHeight,
        };
    }

    get gridSpaceWidth() {
        return this.canvasWidth / this.game.grid.cols;
    }

    get gridSpaceHeight() {
        return this.canvasHeight / this.game.grid.rows;
    }
}