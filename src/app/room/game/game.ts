export interface Player {
    name: string;
}

export interface Grid {
    rows: number;
    cols: number;
}

export interface Game {
    state: 'waiting' | 'playing' | 'finished';
    players: Player[];
    requiredPlayers: number;
    grid: Grid;
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
}