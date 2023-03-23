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
            row: 0,
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
}

export class GameRenderer {
    constructor(
        public game: Game,
        private canvasCtx: CanvasRenderingContext2D,
        private canvasWidth: number,
        private canvasHeight: number,
    ) {}

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
        this.renderBoardPieces();
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
            if (boardPiece.player.name === 'ENEMY') {
                this.canvasCtx.fillStyle = 'rgb(255, 0, 0, 1)';
            } else if (boardPiece.player.name === this.game.mainPlayerName) {
                this.canvasCtx.fillStyle = 'rgb(0, 0, 255, 1)';
            } else {
                this.canvasCtx.fillStyle = 'rgb(0, 255, 0, 1)';
            }
            this.canvasCtx.beginPath();
            this.canvasCtx.ellipse(
                boardPiece.col * gridSpaceWidth + gridSpaceWidth / 2,
                boardPiece.row * gridSpaceHeight + gridSpaceHeight / 2,
                gridSpaceWidth / 2,
                gridSpaceHeight / 2,
                0,
                0,
                2 * Math.PI,
            );
            this.canvasCtx.fill();
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
}