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
    selectedPiece: BoardPiece | null = null;
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

    get mainPlayerIsActive(): boolean {
        return this.activePlayer.name === this.mainPlayerName;
    }

    cursorIsHovering(piece: BoardPiece): boolean {
        return this.cursor.row === piece.row && this.cursor.col === piece.col;
    }

    handleEnter() {
        if (this.state === 'waiting') {
            return;
        }

        if (this.state === 'playing') {
            this.handleEnterPlaying();
        }
    }

    handleEnterPlaying() {
        if (!this.mainPlayerIsActive) {
            return;
        }

        const hoveredPiece = this.boardPieces.find(piece => this.cursorIsHovering(piece));
        if (!hoveredPiece) {
            return;
        }

        if (hoveredPiece.player.name !== this.mainPlayerName) {
            return;
        }

        this.selectedPiece = hoveredPiece;
        console.log('selected piece', this.selectedPiece);
    }
}
