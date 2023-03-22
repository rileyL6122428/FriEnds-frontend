export interface Player {
    name: string;
}

export interface Game {
    state: 'waiting' | 'playing' | 'finished';
    players: Player[];
    requiredPlayers: number;
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
        }
    }

    renderWaiting() {
        this.canvasCtx.fillStyle = 'black';
        this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        this.canvasCtx.font = "30px Arial";
        this.canvasCtx.fillStyle = 'white';
        this.canvasCtx.fillText("Waiting for players...", 10, 50);
        this.canvasCtx.fillText(
            `Players: ${this.game.players.length}/${this.game.requiredPlayers}`,
            10,
            100
        );
    }
}