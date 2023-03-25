import { BoardPiece } from "../game/game";
import { RendererCommon } from "./renderer-common";

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
            15,

            startX,
            startY + 64,
            FRAME_WIDTH,
            FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            4,

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
    eliwood: {
        idle: {
            startX: 190,
            startY: 42,
        },
        hover: {
            startX: 322,
            startY: 42,
        },
    },
    knightLord: {
        idle: {
            startX: 369,
            startY: 42,
        },
        hover: {
            startX: 500,
            startY: 42,
        },
    },
    lyn: {
        idle: {
            startX: 190,
            startY: 174,
        },
        hover: {
            startX: 322,
            startY: 174,
        },
    },
    bladeLord: {
        idle: {
            startX: 369,
            startY: 174,
        },
        hover: {
            startX: 500,
            startY: 174,
        },
    },
    hector: {
        idle: {
            startX: 190,
            startY: 306,
        },
        hover: {
            startX: 322,
            startY: 306,
        },
    },
    greatLord: {
        idle: {
            startX: 369,
            startY: 306,
        },
        hover: {
            startX: 500,
            startY: 306,
        },
    },
    mercenary: {
        idle: {
            startX: 190,
            startY: 438,
        },
        hover: {
            startX: 322,
            startY: 438,
        },
    },
    hero: {
        idle: {
            startX: 369,
            startY: 438,
        },
        hover: {
            startX: 500,
            startY: 438,
        },
    },
    thief: {
        idle: {
            startX: 190,
            startY: 704,
        },
        hover: {
            startX: 322,
            startY: 704,
        },
    },
    assassin: {
        idle: {
            startX: 369,
            startY: 704,
        },
        hover: {
            startX: 500,
            startY: 704,
        },
    },
    myrmidon: {
        idle: {
            startX: 190,
            startY: 837,
        },
        hover: {
            startX: 322,
            startY: 837,
        },
    },
    swordMaster: {
        idle: {
            startX: 369,
            startY: 837,
        },
        hover: {
            startX: 500,
            startY: 837,
        },
    },
    fighter: {
        idle: {
            startX: 190,
            startY: 1103,
        },
        hover: {
            startX: 322,
            startY: 1103,
        },
    },
    warrior: {
        idle: {
            startX: 369,
            startY: 1103,
        },
        hover: {
            startX: 500,
            startY: 1103,
        },
    },
    knight: {
        idle: {
            startX: 190,
            startY: 1236,
        },
        hover: {
            startX: 322,
            startY: 1236,
        },
    },
    general: {
        idle: {
            startX: 369,
            startY: 1236,
        },
        hover: {
            startX: 500,
            startY: 1236,
        },
    },
    archer: {
        idle: {
            startX: 190,
            startY: 1369,
        },
        hover: {
            startX: 322,
            startY: 1369,
        },
    },
    sniper: {
        idle: {
            startX: 369,
            startY: 1369,
        },
        hover: {
            startX: 500,
            startY: 1369,
        },
    },
    monk: {
        idle: {
            startX: 190,
            startY: 1635,
        },
        hover: {
            startX: 322,
            startY: 1635,
        },
    },
    bishopMale: {
        idle: {
            startX: 369,
            startY: 1635,
        },
        hover: {
            startX: 500,
            startY: 1635,
        },
    },
    cleric: {
        idle: {
            startX: 190,
            startY: 1768,
        },
        hover: {
            startX: 322,
            startY: 1768,
        },
    },
    bishopFemale: {
        idle: {
            startX: 369,
            startY: 1768,
        },
        hover: {
            startX: 500,
            startY: 1768,
        },
    },
    mageMale: {
        idle: {
            startX: 190,
            startY: 1901,
        },
        hover: {
            startX: 322,
            startY: 1901,
        },
    },
    sageMale: {
        idle: {
            startX: 369,
            startY: 1901,
        },
        hover: {
            startX: 500,
            startY: 1901,
        },
    },
    shaman: {
        idle: {
            startX: 190,
            startY: 2167,
        },
        hover: {
            startX: 322,
            startY: 2167,
        },
    },
    druid: {
        idle: {
            startX: 369,
            startY: 2167,
        },
        hover: {
            startX: 500,
            startY: 2167,
        },
    },
    cavalier: {
        idle: {
            startX: 190,
            startY: 2433,
        },
        hover: {
            startX: 322,
            startY: 2433,
        },
    },
    paladin: {
        idle: {
            startX: 369,
            startY: 2433,
        },
        hover: {
            startX: 500,
            startY: 2433,
        },
    },
    troubadaour: {
        idle: {
            startX: 190,
            startY: 2566,
        },
        hover: {
            startX: 322,
            startY: 2566,
        },
    },
    valkyrie: {
        idle: {
            startX: 369,
            startY: 2566,
        },
        hover: {
            startX: 500,
            startY: 2566,
        },
    },
    nomad: {
        idle: {
            startX: 190,
            startY: 2699,
        },
        hover: {
            startX: 322,
            startY: 2699,
        },
    },
    nomadTrooper: {
        idle: {
            startX: 369,
            startY: 2699,
        },
        hover: {
            startX: 500,
            startY: 2699,
        },
    },
    pegasusKnight: {
        idle: {
            startX: 190,
            startY: 2965,
        },
        hover: {
            startX: 324,
            startY: 2965,
        },
    },
    falconKnight: {
        idle: {
            startX: 369,
            startY: 2965,
        },
        hover: {
            startX: 500,
            startY: 2965,
        },
    },
    wyvernRider: {
        idle: {
            startX: 190,
            startY: 3098,
        },
        hover: {
            startX: 324,
            startY: 3098,
        },
    },
    wyvernLord: {
        idle: {
            startX: 360,
            startY: 3098,
        },
        hover: {
            startX: 495,
            startY: 3098,
        },
    },
    pirate: {
        idle: {
            startX: 190,
            startY: 3231,
        },
        hover: {
            startX: 322,
            startY: 3231,
        },
    },
    berserker: {
        idle: {
            startX: 369,
            startY: 3231,
        },
        hover: {
            startX: 500,
            startY: 3231,
        },
    },
    brigand: {
        idle: {
            startX: 190,
            startY: 3364,
        },
        hover: {
            startX: 322,
            startY: 3364,
        },
    },
    soldier: {
        idle: {
            startX: 369,
            startY: 3364,
        },
        hover: {
            startX: 500,
            startY: 3364,
        },
    },
    dancer: {
        idle: {
            startX: 190,
            startY: 3497,
        },
        hover: {
            startX: 322,
            startY: 3497,
        },
    },
    bard: {
        idle: {
            startX: 369,
            startY: 3497,
        },
        hover: {
            startX: 500,
            startY: 3497,
        },
    },
    archsage: {
        idle: {
            startX: 190,
            startY: 3630,
        },
        hover: {
            startX: 322,
            startY: 3630,
        },
    },
    darkDruid: {
        idle: {
            startX: 369,
            startY: 3630,
        },
        hover: {
            startX: 500,
            startY: 3630,
        },
    },
};

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
        private rc: RendererCommon,
    ) { }

    render() {
        const { x, y } = this.rc.gridSpaceToCanvas(this.piece.col, this.piece.row);
        if (this.rc.game.cursorIsHovering(this.piece) && this.rc.game.mainPlayerName === this.piece.player.name) {
            this.hover.render(
                x,
                y,
                this.rc.gridSpaceWidth,
                this.rc.gridSpaceHeight,
            );
        } else {
            this.idle.render(
                x,
                y,
                this.rc.gridSpaceWidth,
                this.rc.gridSpaceHeight,
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
        private rc: RendererCommon,
    ) {
        const mainPlayerName = this.rc.game.mainPlayerName;

        this.pieceAnimations = this.rc.game.boardPieces.map((piece: BoardPiece) => {
            let spriteSheet: HTMLImageElement;
            if (piece.player.name === mainPlayerName) {
                spriteSheet = this.playerSpriteSheet;
            } else if (piece.player.name !== 'ENEMY') {
                spriteSheet = this.allySpriteSheet;
            } else {
                spriteSheet = this.enemySpriteSheet;
            }

            // const spriteCoords = SRPITE_COORDS['hector'];
            // const spriteCoords = SRPITE_COORDS['lyn'];
            // const spriteCoords = SRPITE_COORDS['eliwood'];
            // const spriteCoords = SRPITE_COORDS['mercenary'];
            // const spriteCoords = SRPITE_COORDS['thief'];
            // const spriteCoords = SRPITE_COORDS['myrmidon'];
            // const spriteCoords = SRPITE_COORDS['fighter'];
            // const spriteCoords = SRPITE_COORDS['knight'];
            // const spriteCoords = SRPITE_COORDS['archer'];
            // const spriteCoords = SRPITE_COORDS['monk'];
            // const spriteCoords = SRPITE_COORDS['cleric'];
            // const spriteCoords = SRPITE_COORDS['mage'];
            // const spriteCoords = SRPITE_COORDS['shaman'];
            // const spriteCoords = SRPITE_COORDS['cavalier'];
            // const spriteCoords = SRPITE_COORDS['troubadaour'];
            // const spriteCoords = SRPITE_COORDS['nomad'];
            // const spriteCoords = SRPITE_COORDS['pegasusKnight'];
            // const spriteCoords = SRPITE_COORDS['wyvernRider'];
            // const spriteCoords = SRPITE_COORDS['pirate'];
            // const spriteCoords = SRPITE_COORDS['brigand'];
            // const spriteCoords = SRPITE_COORDS['dancer'];
            // const spriteCoords = SRPITE_COORDS['archsage'];
            // const spriteCoords = SRPITE_COORDS['knightLord'];
            // const spriteCoords = SRPITE_COORDS['bladeLord'];
            // const spriteCoords = SRPITE_COORDS['greatLord'];
            // const spriteCoords = SRPITE_COORDS['hero'];
            // const spriteCoords = SRPITE_COORDS['assassin'];
            // const spriteCoords = SRPITE_COORDS['swordMaster'];
            // const spriteCoords = SRPITE_COORDS['warrior'];
            // const spriteCoords = SRPITE_COORDS['general'];
            // const spriteCoords = SRPITE_COORDS['sniper'];
            // const spriteCoords = SRPITE_COORDS['bishopMale'];
            // const spriteCoords = SRPITE_COORDS['bishopFemale'];
            // const spriteCoords = SRPITE_COORDS['sageMale'];
            // const spriteCoords = SRPITE_COORDS['druid'];
            // const spriteCoords = SRPITE_COORDS['paladin'];
            // const spriteCoords = SRPITE_COORDS['valkyrie'];
            // const spriteCoords = SRPITE_COORDS['nomadTrooper'];
            // const spriteCoords = SRPITE_COORDS['falconKnight'];
            // const spriteCoords = SRPITE_COORDS['wyvernLord'];
            // const spriteCoords = SRPITE_COORDS['berserker'];
            // const spriteCoords = SRPITE_COORDS['soldier'];
            // const spriteCoords = SRPITE_COORDS['bard'];
            const spriteCoords = SRPITE_COORDS['darkDruid'];

            const idle = getMapIdle(
                spriteSheet,
                this.rc.ctx,
                spriteCoords.idle.startX,
                spriteCoords.idle.startY,
            );
            const hover = getMapHover(
                spriteSheet,
                this.rc.ctx,
                spriteCoords.hover.startX,
                spriteCoords.hover.startY,
            );

            return new MapSpriteAnimations(idle, hover, piece, this.rc);
        });
    }

    render() {
        this.pieceAnimations.forEach((pieceAnimation: MapSpriteAnimations) => {
            pieceAnimation.render();
        });
    }

}