import { Game } from "../game/game";
import { RendererCommon } from "./renderer-common";
import { MapSpritesRenderer } from "./renderer-map-sprites";

export class GameRenderer {

    private spritesRenderer!: MapSpritesRenderer;
    private rc: RendererCommon;

    constructor(
        public game: Game,
        canvasCtx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        private mainPlayerMapSprites: HTMLImageElement,
        private enemyMapSprites: HTMLImageElement,
        private allyMapSprites: HTMLImageElement
    ) {
        this.rc = new RendererCommon(
            canvasCtx,
            canvasWidth,
            canvasHeight,
            game
        );
        this.onGameOverwritten();
    }
    
    onGameOverwritten() {
        this.spritesRenderer = new MapSpritesRenderer(
            this.mainPlayerMapSprites,
            this.allyMapSprites,
            this.enemyMapSprites,
            this.rc,
        );
    }


    render() {
        if (this.game.state === 'waiting') {
            this.renderWaiting();
        } else if (this.game.state === 'playing') {
            this.renderPlaying();
        }
    }

    renderWaiting() {
        this.renderBackground();

        this.rc.ctx.font = "30px Arial";
        this.rc.ctx.fillStyle = 'white';
        this.rc.ctx.fillText("Waiting for players...", 10, 50);
        this.rc.ctx.fillText(
            `Players: ${this.game.humanPlayers.length}/${this.game.requiredPlayers}`,
            10,
            100
        );
    }

    renderPlaying() {
        this.renderBackground();
        this.renderGrid();
        this.spritesRenderer.render();
        this.renderCursor();
        this.renderTurnOrder();
    }

    renderBackground() {
        this.rc.ctx.fillStyle = 'black';
        this.rc.ctx.fillRect(0, 0, this.rc.canvasWidth, this.rc.canvasHeight);
    }

    renderGrid() {
        const gridRows = this.game.grid.rows;
        const gridCols = this.game.grid.cols;

        this.rc.ctx.strokeStyle = 'white';
        for (let rowIdx = 0; rowIdx < gridRows; rowIdx++) {
            this.rc.ctx.beginPath();
            this.rc.ctx.moveTo(0, rowIdx * this.rc.gridSpaceHeight);
            this.rc.ctx.lineTo(this.rc.canvasWidth, rowIdx * this.rc.gridSpaceHeight);
            this.rc.ctx.stroke();
        }

        for (let colIdx = 0; colIdx < gridCols; colIdx++) {
            this.rc.ctx.beginPath();
            this.rc.ctx.moveTo(colIdx * this.rc.gridSpaceWidth, 0);
            this.rc.ctx.lineTo(colIdx * this.rc.gridSpaceWidth, this.rc.canvasHeight);
            this.rc.ctx.stroke();
        }
    }

    renderCursor() {
        this.rc.ctx.fillStyle = 'rgb(0, 255, 255, 0.25)';
        this.rc.ctx.fillRect(
            this.game.cursor.col * this.rc.gridSpaceWidth,
            this.game.cursor.row * this.rc.gridSpaceHeight,
            this.rc.gridSpaceWidth,
            this.rc.gridSpaceHeight,
        );
    }

    renderTurnOrder() {
        this.rc.ctx.font = "30px Arial";
        this.rc.ctx.fillStyle = 'white';

        const widgetOffsetX = this.rc.canvasWidth - 200;
        const widgetOffsetY = 50;
        this.rc.ctx.fillText("Turn Order:", widgetOffsetX, widgetOffsetY);
        this.game.players.forEach((player, idx) => {
            this.rc.ctx.fillText(
                `${idx + 1}. ${player.name}`,
                widgetOffsetX,
                widgetOffsetY + 50 + idx * 50,
            );
        });
    }

    handleClick(offsetX: number, offsetY: number) {
        const { row, col } = this.rc.canvasToGridSpace(offsetX, offsetY);
        this.game.moveCursorTo(row, col);
    }
}