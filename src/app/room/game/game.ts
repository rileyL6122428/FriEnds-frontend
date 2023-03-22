export interface Player {
    name: string;
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
    cursor: Cursor;

    constructor() {
        this.state = 'waiting';
        this.players = [];
        this.requiredPlayers = 2;
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
            `Players: ${this.game.players.length}/${this.game.requiredPlayers}`,
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
        this.renderCursor();
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
    
        this.canvasCtx.fillStyle = 'rgb(0, 255, 255, 0.5)';
        this.canvasCtx.fillRect(
            this.game.cursor.col * gridSpaceWidth,
            this.game.cursor.row * gridSpaceHeight,
            gridSpaceWidth,
            gridSpaceHeight,
        );
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