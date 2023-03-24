export interface Player {
    name: string;
}

export interface BoardPiece {
    player: Player;
    row: number;
    col: number;
}

export interface Grid {
    rows: number;
    cols: number;
}

export interface Cursor {
    row: number;
    col: number;
}

export class Game {
    state: 'waiting' | 'playing' | 'finished';
    players: Player[];
    requiredPlayers: number;
    grid: Grid;
    boardPieces: BoardPiece[];
    cursor: Cursor;
    private _humanPlayers: Player[];

    constructor(private mainPlayer: Player) {
        this.state = 'waiting';
        this.players = [];
        this._humanPlayers = [];
        this.requiredPlayers = 2;
        this.boardPieces = [
            { player: { name: 'Corrin59' }, row: 1, col: 0 },
            { player: { name: 'Hector5369' }, row: 1, col: 1 },
            { player: { name: 'ENEMY' }, row: 1, col: 2 },
        ];
        this.grid = {
            rows: 10,
            cols: 10,
        };
        this.cursor = {
            row: 1,
            col: 0,
        };
    }

    patch(data: Partial<Game>) {
        Object.assign(this, data);
        this._humanPlayers = this.players.filter(player => player.name !== 'ENEMY');
    }

    moveCursorTo(row: number, col: number) {
        if (row < 0) {
            row = 0;
        } else if (row >= this.grid.rows) {
            row = this.grid.rows - 1;
        }

        if (col < 0) {
            col = 0;
        } else if (col >= this.grid.cols) {
            col = this.grid.cols - 1;
        }

        this.cursor.row = row;
        this.cursor.col = col;
    }

    moveCursorUp() {
        this.moveCursorTo(this.cursor.row - 1, this.cursor.col);
    }

    moveCursorDown() {
        this.moveCursorTo(this.cursor.row + 1, this.cursor.col);
    }

    moveCursorLeft() {
        this.moveCursorTo(this.cursor.row, this.cursor.col - 1);
    }

    moveCursorRight() {
        this.moveCursorTo(this.cursor.row, this.cursor.col + 1);
    }

    get mainPlayerName(): string {
        return this.mainPlayer.name;
    }

    get activePlayer(): Player {
        return this.players[0];
    }

    get humanPlayers(): Player[] {
        return this._humanPlayers;
    }

    cursorIsHovering(piece: BoardPiece): boolean {
        return this.cursor.row === piece.row && this.cursor.col === piece.col;
    }
}

// export class GameRenderer {
//     constructor(
//         public game: Game,
//         private canvasCtx: CanvasRenderingContext2D,
//         private canvasWidth: number,
//         private canvasHeight: number,
//         private mainPlayerMapSprites: HTMLImageElement,
//         private enemyMapSprites: HTMLImageElement,
//         private allyMapSprites: HTMLImageElement
//     ) {}

//     render() {
//         if (this.game.state === 'waiting') {
//             this.renderWaiting();
//         } else if (this.game.state === 'playing') {
//             this.renderPlaying();
//         }
//     }

//     renderWaiting() {
//         this.renderBackground();
        
//         this.canvasCtx.font = "30px Arial";
//         this.canvasCtx.fillStyle = 'white';
//         this.canvasCtx.fillText("Waiting for players...", 10, 50);
//         this.canvasCtx.fillText(
//             `Players: ${this.game.humanPlayers.length}/${this.game.requiredPlayers}`,
//             10,
//             100
//         );
//     }

//     renderPlaying() {
//         this.renderBackground();

//         this.canvasCtx.font = "30px Arial";
//         this.canvasCtx.fillStyle = 'white';
//         this.canvasCtx.fillText("Playing!", 10, 50);

//         this.renderGrid();
//         this.renderBoardPieces();
//         this.renderCursor();
//         this.renderTurnOrder();
//     }
    
//     renderBackground() {
//         this.canvasCtx.fillStyle = 'black';
//         this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
//     }
    
//     renderGrid() {
//         const gridRows = this.game.grid.rows;
//         const gridCols = this.game.grid.cols;
//         const gridSpaceWidth = this.canvasWidth / gridCols;
//         const gridSpaceHeight = this.canvasHeight / gridRows;
    
//         this.canvasCtx.strokeStyle = 'white';
//         for (let rowIdx = 0; rowIdx < gridRows; rowIdx++) {
//             this.canvasCtx.beginPath();
//             this.canvasCtx.moveTo(0, rowIdx * gridSpaceHeight);
//             this.canvasCtx.lineTo(this.canvasWidth, rowIdx * gridSpaceHeight);
//             this.canvasCtx.stroke();
//         }
    
//         for (let colIdx = 0; colIdx < gridCols; colIdx++) {
//             this.canvasCtx.beginPath();
//             this.canvasCtx.moveTo(colIdx * gridSpaceWidth, 0);
//             this.canvasCtx.lineTo(colIdx * gridSpaceWidth, this.canvasHeight);
//             this.canvasCtx.stroke();
//         }
//     }

//     renderCursor() {
//         const gridRows = this.game.grid.rows;
//         const gridCols = this.game.grid.cols;
//         const gridSpaceWidth = this.canvasWidth / gridCols;
//         const gridSpaceHeight = this.canvasHeight / gridRows;
    
//         this.canvasCtx.fillStyle = 'rgb(0, 255, 255, 0.25)';
//         this.canvasCtx.fillRect(
//             this.game.cursor.col * gridSpaceWidth,
//             this.game.cursor.row * gridSpaceHeight,
//             gridSpaceWidth,
//             gridSpaceHeight,
//         );
//     }

//     renderBoardPieces() {
//         const gridRows = this.game.grid.rows;
//         const gridCols = this.game.grid.cols;
//         const gridSpaceWidth = this.canvasWidth / gridCols;
//         const gridSpaceHeight = this.canvasHeight / gridRows;

//         this.game.boardPieces.forEach(boardPiece => {   
//             let mapSpritesSheet: HTMLImageElement;         
//             if (boardPiece.player.name === 'ENEMY') {
//                 mapSpritesSheet = this.enemyMapSprites;
//             } else if (boardPiece.player.name === this.game.mainPlayerName) {
//                 mapSpritesSheet = this.mainPlayerMapSprites;
//             } else {
//                 mapSpritesSheet = this.allyMapSprites;
//             }

//             const sourceX = 190;
//             const sourceY = 306;
//             const sourceWidth = 29;
//             const sourceHeight = 29;

//             const destWidth = sourceWidth * this.gridSpaceWidth / sourceWidth;
//             const destHeight = sourceHeight * this.gridSpaceHeight / sourceHeight;
//             const destX = boardPiece.col * gridSpaceWidth + gridSpaceWidth / 2 - destWidth / 2 - 1;
//             const destY = boardPiece.row * gridSpaceHeight + gridSpaceHeight / 2 - destHeight / 2 - 1;

//             this.canvasCtx.drawImage(
//                 mapSpritesSheet,
//                 sourceX,
//                 sourceY,
//                 sourceWidth,
//                 sourceHeight,
//                 destX,
//                 destY,
//                 destWidth,
//                 destHeight,
//             )
//         });
//     }

//     renderTurnOrder() {
//         this.canvasCtx.font = "30px Arial";
//         this.canvasCtx.fillStyle = 'white';

//         const widgetOffsetX = this.canvasWidth - 200;
//         const widgetOffsetY = 50;
//         this.canvasCtx.fillText("Turn Order:", widgetOffsetX, widgetOffsetY);
//         this.game.players.forEach((player, idx) => {
//             this.canvasCtx.fillText(
//                 `${idx + 1}. ${player.name}`,
//                 widgetOffsetX,
//                 widgetOffsetY + 50 + idx * 50,
//             );
//         });
//     }

//     handleClick(offsetX: number, offsetY: number) {
//         const gridRows = this.game.grid.rows;
//         const gridCols = this.game.grid.cols;
//         const gridSpaceWidth = this.canvasWidth / gridCols;
//         const gridSpaceHeight = this.canvasHeight / gridRows;

//         const row = Math.floor(offsetY / gridSpaceHeight);
//         const col = Math.floor(offsetX / gridSpaceWidth);

//         this.game.moveCursorTo(row, col);
//     }

//     private get gridSpaceWidth() {
//         return this.canvasWidth / this.game.grid.cols;
//     }

//     private get gridSpaceHeight() {
//         return this.canvasHeight / this.game.grid.rows;
//     }
// }