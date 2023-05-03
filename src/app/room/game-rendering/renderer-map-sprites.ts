import { BoardPiece } from "../game/game";
import { RendererCommon } from "./renderer-common";

export class AnimationFrame {

    constructor(
        private spriteSheet: HTMLImageElement,
        readonly duration: number,

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
    }
}

const FRAME_WIDTH = 29;
const FRAME_HEIGHT = 29;

export class Animation {

    private _aggregateFrameIdx: number = 0;
    readonly aggregateDuration: number = 0;
    private aggregateFrameIndicesToFrames = new Map<number, AnimationFrame>();

    constructor(
        private frames: AnimationFrame[],
    ) {
        this.aggregateDuration = frames.reduce((acc, frame) => acc + frame.duration, 0);

        let subdividedFrameIndex = 0;
        this.frames.forEach((frame) => {
            for (let i = subdividedFrameIndex; i < subdividedFrameIndex + frame.duration; i++) {
                this.aggregateFrameIndicesToFrames.set(i, frame);
            }
            subdividedFrameIndex += frame.duration;
        });
    }

    render(
        offsetX: number,
        offsetY: number,
        width: number,
        height: number,
    ) {
        // this.frames[this._aggregateFrameIdx].render(
        this.aggregateFrameIndicesToFrames.get(this._aggregateFrameIdx)!.render(
            offsetX,
            offsetY,
            width,
            height,
        );
        this.incrementAggregateFrameIdx();
    }

    incrementAggregateFrameIdx() {
        this._aggregateFrameIdx = (this._aggregateFrameIdx + 1) % this.aggregateDuration;
    }

    set aggregateFrameIdx(idx: number) {
        this._aggregateFrameIdx = idx % this.aggregateDuration;
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
    ];

    return new Animation(frames);
}


const SPRITE_COORDS = {
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
            this.idle.incrementAggregateFrameIdx();
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
            this.hover.aggregateFrameIdx = 0;
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

            // const spriteCoords = SPRITE_COORDS['hector'];
            // const spriteCoords = SPRITE_COORDS['lyn'];
            const spriteCoords = SPRITE_COORDS['eliwood'];
            // const spriteCoords = SPRITE_COORDS['mercenary'];
            // const spriteCoords = SPRITE_COORDS['thief'];
            // const spriteCoords = SPRITE_COORDS['myrmidon'];
            // const spriteCoords = SPRITE_COORDS['fighter'];
            // const spriteCoords = SPRITE_COORDS['knight'];
            // const spriteCoords = SPRITE_COORDS['archer'];
            // const spriteCoords = SPRITE_COORDS['monk'];
            // const spriteCoords = SPRITE_COORDS['cleric'];
            // const spriteCoords = SPRITE_COORDS['mage'];
            // const spriteCoords = SPRITE_COORDS['shaman'];
            // const spriteCoords = SPRITE_COORDS['cavalier'];
            // const spriteCoords = SPRITE_COORDS['troubadaour'];
            // const spriteCoords = SPRITE_COORDS['nomad'];
            // const spriteCoords = SPRITE_COORDS['pegasusKnight'];
            // const spriteCoords = SPRITE_COORDS['wyvernRider'];
            // const spriteCoords = SPRITE_COORDS['pirate'];
            // const spriteCoords = SPRITE_COORDS['brigand'];
            // const spriteCoords = SPRITE_COORDS['dancer'];
            // const spriteCoords = SPRITE_COORDS['archsage'];
            // const spriteCoords = SPRITE_COORDS['knightLord'];
            // const spriteCoords = SPRITE_COORDS['bladeLord'];
            // const spriteCoords = SPRITE_COORDS['greatLord'];
            // const spriteCoords = SPRITE_COORDS['hero'];
            // const spriteCoords = SPRITE_COORDS['assassin'];
            // const spriteCoords = SPRITE_COORDS['swordMaster'];
            // const spriteCoords = SPRITE_COORDS['warrior'];
            // const spriteCoords = SPRITE_COORDS['general'];
            // const spriteCoords = SPRITE_COORDS['sniper'];
            // const spriteCoords = SPRITE_COORDS['bishopMale'];
            // const spriteCoords = SPRITE_COORDS['bishopFemale'];
            // const spriteCoords = SPRITE_COORDS['sageMale'];
            // const spriteCoords = SPRITE_COORDS['druid'];
            // const spriteCoords = SPRITE_COORDS['paladin'];
            // const spriteCoords = SPRITE_COORDS['valkyrie'];
            // const spriteCoords = SPRITE_COORDS['nomadTrooper'];
            // const spriteCoords = SPRITE_COORDS['falconKnight'];
            // const spriteCoords = SPRITE_COORDS['wyvernLord'];
            // const spriteCoords = SPRITE_COORDS['berserker'];
            // const spriteCoords = SPRITE_COORDS['soldier'];
            // const spriteCoords = SPRITE_COORDS['bard'];
            // const spriteCoords = SPRITE_COORDS['darkDruid'];

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