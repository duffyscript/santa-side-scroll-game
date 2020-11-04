export type PositionType = {
    x:number,
    y:number
}

export type SetMapType = {
    mapWidth:number,
    mapHeight:number,
    startX:number,
    startY:number,
}

export type StartLevelType = {
    mapWidth:number,
    mapHeight:number,
    startX:number,
    startY:number,
    finishX?:number,
    finishY?:number,
    nextLevel:string
    ,
}

export type levelInitType = {
    score:number,
    livesNumber:number,
    countStars:number,
    keyCollected:boolean,
}

export type EnemyMovingType = {
    x?: {
        from:number,
        to:number,
    },
    y?: {
        from:number,
        to:number,
    },
    pause?:number,
    speed?:number,
}
