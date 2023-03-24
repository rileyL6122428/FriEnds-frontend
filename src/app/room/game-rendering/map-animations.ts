import { Game, Player, Cursor, BoardPiece } from "../game/game";

export class AnimationFrame {

    private elapsed: number = 0;

    constructor(
        private spriteSheet: HTMLImageElement,
        private duration: number,

        private frameX: number,
        private frameY: number,
        private frameWidth: number,
        private frameHeight: number,

        private canvasCtx: CanvasRenderingContext2D,
    ) { }
        
    render(
        offsetX: number,
        offsetY: number,
        width: number,
        height: number,
    ) {
        this.canvasCtx.drawImage(
            this.spriteSheet,
            this.frameX,
            this.frameY,
            this.frameWidth,
            this.frameHeight,
            offsetX,
            offsetY,
            width,
            height
        );
        this.elapsed += 1;
    }

    isDone() {
        return this.elapsed >= this.duration;
    }

    reset() {
        this.elapsed = 0;
    }
}

const FRAME_WIDTH = 29;
const FRAME_HEIGHT = 29;

export class Animation {

    activeFrameIdx: number = 0;

    constructor(
        private frames: AnimationFrame[],
    ) { }

    render(
        offsetX: number,
        offsetY: number,
        width: number,
        height: number,
    ) {
        this.frames[this.activeFrameIdx].render(
            offsetX,
            offsetY,
            width,
            height,
        );
        if (this.frames[this.activeFrameIdx].isDone()) {
            this.frames[this.activeFrameIdx].reset();
            this.activeFrameIdx += 1;
            if (this.activeFrameIdx >= this.frames.length) {
                this.activeFrameIdx = 0;
            }
        }
    }
}

function getMapIdle(
    spriteSheet: HTMLImageElement,
    canvasCtx: CanvasRenderingContext2D,
    startX: number,
    startY: number
    ) {
    const frames = [
        new AnimationFrame(
            spriteSheet,
            20,

            startX,
            306,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            2,

            startX,
            startY + 32,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            15,

            startX,
            startY + 64,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            5,

            startX,
            startY + 32,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
    ];

    return new Animation(frames);
}

export function getMapHover(
    spriteSheet: HTMLImageElement,
    canvasCtx: CanvasRenderingContext2D,
    startX: number,
    startY: number
    ) {
    const frames = [
        new AnimationFrame(
            spriteSheet,
            3,

            startX,
            startY + 32,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            15,

            startX,
            startY,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            2,

            startX,
            startY + 32,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            14,

            startX,
            startY + 64,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
    ];

    return new Animation(frames);
}


const SRPITE_COORDS = {
    hector: {
        idle: {
            startX: 190,
            startY: 306,
        },
        hover: {
            startX: 322,
            startY: 306,
        },
    }       
}

export function getHectorMapIdle(spriteSheet: HTMLImageElement, canvasCtx: CanvasRenderingContext2D) {
    const frames = [
        new AnimationFrame(
            spriteSheet,
            20,

            190,
            306,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            2,

            190,
            338,
            FRAME_WIDTH,
            FRAME_HEIGHT,
            
            canvasCtx
            ),
        new AnimationFrame(
            spriteSheet,
            15,
            
            190,
            370,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            5,

            190,
            338,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
    ];

    return new Animation(frames);
}

export function getHectorMapHover(spriteSheet: HTMLImageElement, canvasCtx: CanvasRenderingContext2D) {
    const frames = [
        new AnimationFrame(
            spriteSheet,
            3,

            322,
            338,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            15,

            322,
            306,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            2,

            322,
            338,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            14,

            322,
            370,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
    ];

    return new Animation(frames);
}

export class MapSpriteAnimations {
    constructor(
        private idle: Animation,
        private hover: Animation,
        private piece: BoardPiece,
        private game: Game,

        private canvasWidth: number,
        private canvasHeight: number,
    ) { }

    render() {
        const x = this.piece.col * this.canvasWidth / this.game.grid.cols;
        const y = this.piece.row * this.canvasHeight / this.game.grid.rows;
        const gridSpaceWidth = this.canvasWidth / this.game.grid.cols;
        const gridSpaceHeight = this.canvasHeight / this.game.grid.rows;
        if (this.game.cursorIsHovering(this.piece) && this.game.mainPlayerName === this.piece.player.name) {
            this.hover.render(
                x,
                y,
                gridSpaceWidth,
                gridSpaceHeight,
            );
        } else {
            this.idle.render(
                x,
                y,
                gridSpaceWidth,
                gridSpaceHeight,
            );
        }
    }
}

export class MapSpritesRenderer {

    private pieceAnimations: Array<MapSpriteAnimations>;

    constructor(
        private playerSpriteSheet: HTMLImageElement,
        private allySpriteSheet: HTMLImageElement,
        private enemySpriteSheet: HTMLImageElement,

        private game: Game,

        private canvasCtx: CanvasRenderingContext2D,
        private canvasWidth: number,
        private canvasHeight: number,
    ) {
        const mainPlayerName = this.game.mainPlayerName;

        this.pieceAnimations = this.game.boardPieces.map((piece: BoardPiece) => {
            let spriteSheet: HTMLImageElement;
            if (piece.player.name === mainPlayerName) {
                spriteSheet = this.playerSpriteSheet;
            } else if (piece.player.name !== 'ENEMY') {
                spriteSheet = this.allySpriteSheet;
            } else {
                spriteSheet = this.enemySpriteSheet;
            }

            const spriteCoords = SRPITE_COORDS['hector'];

            const idle = getMapIdle(
                spriteSheet,
                this.canvasCtx,
                spriteCoords.idle.startX,
                spriteCoords.idle.startY,
            );
            const hover = getMapHover(
                spriteSheet,
                this.canvasCtx,
                spriteCoords.hover.startX,
                spriteCoords.hover.startY,
            );

            return new MapSpriteAnimations(idle, hover, piece, this.game, this.canvasWidth, this.canvasHeight);
        });
    }

    render() {
        this.pieceAnimations.forEach((pieceAnimation: MapSpriteAnimations) => {
            pieceAnimation.render();
        });
    }

}