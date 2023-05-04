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

const DEFAULT_FRAME_WIDTH = 29;
const DEFAULT_FRAME_HEIGHT = 29;

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
    spriteName: string,
    ) {
    const spriteCoords = SPRITE_COORDS[spriteName].idle;
    const coordsAndDuration = [
        [spriteCoords.top, 20],
        [spriteCoords.mid, 2],
        [spriteCoords.bottom, 15],
        [spriteCoords.mid, 4],
    ];
    const frames = coordsAndDuration.map(([coords, duration]) => {
        return new AnimationFrame(
            spriteSheet,
            duration,

            coords.startX,
            coords.startY,
            coords.width,
            coords.height,

            canvasCtx
        );
    });

    return new Animation(frames);
}

export function getMapHover(
    spriteSheet: HTMLImageElement,
    canvasCtx: CanvasRenderingContext2D,
    spriteName: string,
    ) {

    const spriteCoords = SPRITE_COORDS[spriteName].hover;
    const coordsAndDuration = [
        [spriteCoords.mid, 2],
        [spriteCoords.bottom, 14],
        [spriteCoords.mid, 3],
        [spriteCoords.top, 15],
    ];
    const frames = coordsAndDuration.map(([coords, duration]) => {
        return new AnimationFrame(
            spriteSheet,
            duration,

            coords.startX,
            coords.startY,
            coords.width,
            coords.height,

            canvasCtx
        );
    });
    return new Animation(frames);
}

function getFramesCoords({ top, mid, bottom }: any = {}) {
    if (top.width === undefined) {
        top.width = DEFAULT_FRAME_WIDTH;
    }
    if (top.height === undefined) {
        top.height = DEFAULT_FRAME_HEIGHT;
    }

    if (mid === undefined) {
        mid = {
            width: DEFAULT_FRAME_WIDTH,
            height: DEFAULT_FRAME_HEIGHT,
            startX: top.startX,
            startY: top.startY + DEFAULT_FRAME_HEIGHT + 3,
        }        
    }
    if (bottom === undefined) {
        bottom = {
            width: DEFAULT_FRAME_WIDTH,
            height: DEFAULT_FRAME_HEIGHT,
            startX: mid.startX,
            startY: mid.startY +  DEFAULT_FRAME_HEIGHT + 3,
        }
    }

    return { top, mid, bottom, };
}


const SPRITE_COORDS: any = {
    eliwood: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 42,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 42,
            }
        })
    },
    knightLord: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 42,
            },
        }),
        hover: getFramesCoords({
            top: {
               startX: 500,
                startY: 42,
            },
        }),
    },
    lyn: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 174,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 174,
            }
        }),
    },
    bladeLord: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 174,
            },
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 174,
            }
        }),
    },
    hector: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 306,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 306,
            }
        }),
    },
    greatLord: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 306,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 306,
            }
        }),
    },
    mercenary: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 438,
            },
        }), 
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 438,
            },
        }),
    },
    hero: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 438,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 438,
            }
        }),
    },
    thief: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 704,
            },
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 704,
            }
        }),
    },
    assassin: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 704,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 704,
            }
        }),
    },
    myrmidon: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 837,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            mid: {
                startX: 190,
                startY: 837 + DEFAULT_FRAME_HEIGHT + 3,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            bottom: {
                startX: 191,
                startY: 837 + DEFAULT_FRAME_HEIGHT * 2 + 6,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 837,
            }
        }),
    },
    swordMaster: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 837,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            mid: {
                startX: 369,
                startY: 837 + DEFAULT_FRAME_HEIGHT + 4,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            bottom: {
                startX: 369,
                startY: 837 + DEFAULT_FRAME_HEIGHT * 2 + 6,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 830,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            mid: {
                startX: 500,
                startY: 830 + DEFAULT_FRAME_HEIGHT + 3,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            bottom: {
                startX: 500,
                startY: 830 + DEFAULT_FRAME_HEIGHT * 2 + 14,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
        })
    },
    fighter: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 1103,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 1103,
            }
        }),
    },
    warrior: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 1103,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 1103,
            }
        }),
    },
    knight: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 1236,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 1236,
            }
        }),
    },
    general: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 1236,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 1236,
            }
        }),
    },
    archer: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 1369,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            mid: {
                startX: 190,
                startY: 1369 + DEFAULT_FRAME_HEIGHT + 3,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
            bottom: {
                startX: 190,
                startY: 1369 + DEFAULT_FRAME_HEIGHT * 2 + 5,
                width: DEFAULT_FRAME_WIDTH,
                height: DEFAULT_FRAME_HEIGHT,
            },
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 1369,
            }
        }),
    },
    sniper: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 1369,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 1369,
            }
        }),
    },
    monk: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 1635,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 1635,
            }
        }),
    },
    bishopMale: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 1635,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 1635,
            }
        }),
    },
    cleric: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 1768,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 1768,
            }
        }),
    },
    bishopFemale: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 1768,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 1768,
            }
        }),
    },
    mageMale: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 1901,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 1901,
            }
        }),
    },
    sageMale: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 1901,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 1901,
            }
        }),
    },
    shaman: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 2167,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 2167,
            }
        }),
    },
    druid: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 2167,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 2167,
            }
        }),
    },
    cavalier: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 2433,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 2433,
            }
        }),
    },
    paladin: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 2433,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 2433,
            }
        }),
    },
    troubadaour: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 2566,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 2566,
            }
        }),
    },
    valkyrie: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 2566,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 2566,
            }
        }),
    },
    nomad: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 2699,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 2699,
            }
        }),
    },
    nomadTrooper: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 2699,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 2699,
            }
        }),
    },
    pegasusKnight: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 2965,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 324,
                startY: 2965,
            }
        }),
    },
    falconKnight: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 2965,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 2965,
            }
        }),
    },
    wyvernRider: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 3098,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 324,
                startY: 3098,
            }
        }),
    },
    wyvernLord: {
        idle: getFramesCoords({
            top: {
                startX: 360,
                startY: 3098,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 495,
                startY: 3098,
            }
        }),
    },
    pirate: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 3231,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 3231,
            }
        }),
    },
    berserker: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 3231,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 3231,
            }
        }),
    },
    brigand: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 3364,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 3364,
            }
        }),
    },
    soldier: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 3364,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 3364,
            }
        }),
    },
    dancer: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 3497,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 3497,
            }
        }),
    },
    bard: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 3497,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 3497,
            }
        }),
    },
    archsage: {
        idle: getFramesCoords({
            top: {
                startX: 190,
                startY: 3630,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 322,
                startY: 3630,
            }
        }),
    },
    darkDruid: {
        idle: getFramesCoords({
            top: {
                startX: 369,
                startY: 3630,
            }
        }),
        hover: getFramesCoords({
            top: {
                startX: 500,
                startY: 3630,
            }
        }),
    },
};

export function getHectorMapIdle(spriteSheet: HTMLImageElement, canvasCtx: CanvasRenderingContext2D) {
    const frames = [
        new AnimationFrame(
            spriteSheet,
            20,

            190,
            306,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            2,

            190,
            338,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,
            
            canvasCtx
            ),
        new AnimationFrame(
            spriteSheet,
            15,
            
            190,
            370,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            5,

            190,
            338,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

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
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            15,

            322,
            306,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            2,

            322,
            338,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

            canvasCtx
        ),
        new AnimationFrame(
            spriteSheet,
            14,

            322,
            370,
            DEFAULT_FRAME_WIDTH,
            DEFAULT_FRAME_HEIGHT,

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

            // const spriteName = 'hector';
            // const spriteName = 'eliwood';
            // const spriteName = 'lyn';
            // const spriteName = 'mercenary';
            const spriteName = 'thief';
            // const spriteName = 'myrmidon';
            // const spriteName = 'fighter';
            // const spriteName = 'knight';

            // const spriteName = 'archer';
            // const spriteName = 'monk';
            // const spriteName = 'cleric';
            // const spriteName = 'mage';
            // const spriteName = 'shaman';
            // const spriteName = 'cavalier';
            // const spriteName = 'troubadaour';
            // const spriteName = 'nomad';
            // const spriteName = 'pegasusKnight';
            // const spriteName = 'wyvernRider';
            // const spriteName = 'pirate';
            // const spriteName = 'brigand';
            // const spriteName = 'dancer';
            // const spriteName = 'archsage';
            // const spriteName = 'knightLord';
            // const spriteName = 'bladeLord';
            // const spriteName = 'greatLord';
            // const spriteName = 'hero';
            // const spriteName = 'assassin';
            // const spriteName = 'swordMaster';
            // const spriteName = 'warrior';
            // const spriteName = 'general';
            // const spriteName = 'sniper';
            // const spriteName = 'bishopMale';
            // const spriteName = 'bishopFemale';
            // const spriteName = 'sageMale';
            // const spriteName = 'druid';
            // const spriteName = 'paladin';
            // const spriteName = 'valkyrie';
            // const spriteName = 'nomadTrooper';
            // const spriteName = 'falconKnight';
            // const spriteName = 'wyvernLord';
            // const spriteName = 'berserker';
            // const spriteName = 'soldier';
            // const spriteName = 'bard';
            // const spriteName = 'darkDruid';

            const idle = getMapIdle(
                spriteSheet,
                this.rc.ctx,
                spriteName
            );
            const hover = getMapHover(
                spriteSheet,
                this.rc.ctx,
                spriteName
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