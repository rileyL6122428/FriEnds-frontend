import { Game } from "../game/game";
import { getHectorMapIdle, Animation, getHectorMapHover, MapSpritesRenderer } from "./map-animations";

export class GameRenderer {

    private hectorPlayerMapIdle: Animation;
    private hectorPlayerMapHover: Animation;
    private hectorAllyMapAnimation: Animation;
    private hectorEnemyMapAnimation: Animation;

    private spritesRenderer!: MapSpritesRenderer;

    constructor(
        public game: Game,
        private canvasCtx: CanvasRenderingContext2D,
        private canvasWidth: number,
        private canvasHeight: number,
        private mainPlayerMapSprites: HTMLImageElement,
        private enemyMapSprites: HTMLImageElement,
        private allyMapSprites: HTMLImageElement
    ) {
        this.hectorPlayerMapIdle = getHectorMapIdle(
            this.mainPlayerMapSprites,
            this.canvasCtx
        );
        this.hectorPlayerMapHover = getHectorMapHover(
            this.mainPlayerMapSprites,
            this.canvasCtx
        );
        this.hectorAllyMapAnimation = getHectorMapIdle(
            this.allyMapSprites,
            this.canvasCtx
        );
        this.hectorEnemyMapAnimation = getHectorMapIdle(
            this.enemyMapSprites,
            this.canvasCtx
        );

        this.onGameStateChanged();
    }
    
    onGameStateChanged() {
        this.spritesRenderer = new MapSpritesRenderer(
            this.mainPlayerMapSprites,
            this.allyMapSprites,
            this.enemyMapSprites,
            this.game,
            this.canvasCtx,
            this.canvasWidth,
            this.canvasHeight
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

        this.canvasCtx.font = "30px Arial";
        this.canvasCtx.fillStyle = 'white';
        this.canvasCtx.fillText("Waiting for players...", 10, 50);
        this.canvasCtx.fillText(
            `Players: ${this.game.humanPlayers.length}/${this.game.requiredPlayers}`,
            10,
            100
        );
    }

    renderPlaying() {
        this.renderBackground();

        this.canvasCtx.font = "30px Arial";
        this.canvasCtx.fillStyle = 'white';
        this.canvasCtx.fillText("Playing!", 10, 50);

        this.renderGrid();
        // this.renderBoardPieces();
        this.spritesRenderer.render();
        this.renderCursor();
        this.renderTurnOrder();
    }

    renderBackground() {
        this.canvasCtx.fillStyle = 'black';
        this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    renderGrid() {
        const gridRows = this.game.grid.rows;
        const gridCols = this.game.grid.cols;
        const gridSpaceWidth = this.canvasWidth / gridCols;
        const gridSpaceHeight = this.canvasHeight / gridRows;

        this.canvasCtx.strokeStyle = 'white';
        for (let rowIdx = 0; rowIdx < gridRows; rowIdx++) {
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(0, rowIdx * gridSpaceHeight);
            this.canvasCtx.lineTo(this.canvasWidth, rowIdx * gridSpaceHeight);
            this.canvasCtx.stroke();
        }

        for (let colIdx = 0; colIdx < gridCols; colIdx++) {
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(colIdx * gridSpaceWidth, 0);
            this.canvasCtx.lineTo(colIdx * gridSpaceWidth, this.canvasHeight);
            this.canvasCtx.stroke();
        }
    }

    renderCursor() {
        const gridRows = this.game.grid.rows;
        const gridCols = this.game.grid.cols;
        const gridSpaceWidth = this.canvasWidth / gridCols;
        const gridSpaceHeight = this.canvasHeight / gridRows;

        this.canvasCtx.fillStyle = 'rgb(0, 255, 255, 0.25)';
        this.canvasCtx.fillRect(
            this.game.cursor.col * gridSpaceWidth,
            this.game.cursor.row * gridSpaceHeight,
            gridSpaceWidth,
            gridSpaceHeight,
        );
    }

    renderBoardPieces() {
        const gridRows = this.game.grid.rows;
        const gridCols = this.game.grid.cols;
        const gridSpaceWidth = this.canvasWidth / gridCols;
        const gridSpaceHeight = this.canvasHeight / gridRows;

        this.game.boardPieces.forEach(boardPiece => {
            let mapSpritesSheet: HTMLImageElement;
            let animation: Animation;
            if (boardPiece.player.name === 'ENEMY') {
                mapSpritesSheet = this.enemyMapSprites;
                animation = this.hectorEnemyMapAnimation;
            } else if (boardPiece.player.name === this.game.mainPlayerName) {
                mapSpritesSheet = this.mainPlayerMapSprites;
                if (boardPiece.row === this.game.cursor.row && boardPiece.col === this.game.cursor.col) {
                    animation = this.hectorPlayerMapHover;
                } else {
                    animation = this.hectorPlayerMapIdle;
                }
            } else {
                mapSpritesSheet = this.allyMapSprites;
                animation = this.hectorAllyMapAnimation;
            }
            
            
            // const sourceX = 190;
            // const sourceY = 366;
            // // const sourceX = 190;
            // // const sourceY = 336;
            // // const sourceX = 190;
            // // const sourceY = 306;
            const sourceWidth = 29;
            const sourceHeight = 29;
            
            const destWidth = sourceWidth * this.gridSpaceWidth / sourceWidth;
            const destHeight = sourceHeight * this.gridSpaceHeight / sourceHeight;
            const destX = boardPiece.col * gridSpaceWidth + gridSpaceWidth / 2 - destWidth / 2 - 1;
            const destY = boardPiece.row * gridSpaceHeight + gridSpaceHeight / 2 - destHeight / 2 - 1;
            
            animation.render(
                destX,
                destY,
                destWidth,
                destHeight,
            )

            // this.canvasCtx.drawImage(
            //     mapSpritesSheet,
            //     sourceX,
            //     sourceY,
            //     sourceWidth,
            //     sourceHeight,
            //     destX,
            //     destY,
            //     destWidth,
            //     destHeight,
            // )
        });
    }

    renderTurnOrder() {
        this.canvasCtx.font = "30px Arial";
        this.canvasCtx.fillStyle = 'white';

        const widgetOffsetX = this.canvasWidth - 200;
        const widgetOffsetY = 50;
        this.canvasCtx.fillText("Turn Order:", widgetOffsetX, widgetOffsetY);
        this.game.players.forEach((player, idx) => {
            this.canvasCtx.fillText(
                `${idx + 1}. ${player.name}`,
                widgetOffsetX,
                widgetOffsetY + 50 + idx * 50,
            );
        });
    }

    handleClick(offsetX: number, offsetY: number) {
        const gridRows = this.game.grid.rows;
        const gridCols = this.game.grid.cols;
        const gridSpaceWidth = this.canvasWidth / gridCols;
        const gridSpaceHeight = this.canvasHeight / gridRows;

        const row = Math.floor(offsetY / gridSpaceHeight);
        const col = Math.floor(offsetX / gridSpaceWidth);

        this.game.moveCursorTo(row, col);
    }

    private get gridSpaceWidth() {
        return this.canvasWidth / this.game.grid.cols;
    }

    private get gridSpaceHeight() {
        return this.canvasHeight / this.game.grid.rows;
    }
}