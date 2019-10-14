/**
 * 
 */
class RecordController {
    private static instance: RecordController = null;

    private map: GridData[];
    private recordingRound = 0;
    private currentRound = 0;
    private headRecored = [];
    private hitRecorded = [];
    private bulletRecorded = [];
    private gridOpenRecorded = [];
    private gridEachRound = [];
    private girdThisRound = [];
    private hittedPlane = [];
    private allOpen = [];

    constructor() {
        if (RecordController.instance) {
            throw new Error("AIController singlon error")
        }
        this.init();
    }

    private _continuousIndex = -1;
    private _continuousType = GridTypeEnum.UNSET;
    private _continuousTimes = 0;
    private _missTimes = 0;
    private _bodyTimes = 0;
    private _headTimes = 0;
    private _indexTimes = 0;
    private _indexOneTimes = 0;
    private _indexTwoTimes = 0;
    private _indexThreeTimes = 0;
    private _indexContinuousTimes = 0;

    private init() {

    }

    public reset() {
        this.hitRecorded = [];
        this.headRecored = [];
        this.bulletRecorded = [];
        this.gridOpenRecorded = [];
        this.gridEachRound = [];
        this.hittedPlane = [];
        this._continuousIndex = -1;
        this._continuousTimes = 0;
        this._continuousType = GridTypeEnum.UNSET;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
        this._indexOneTimes = 0;
        this._indexThreeTimes = 0;
        this._indexTwoTimes = 0;
        this._indexContinuousTimes = 0;
        this.currentRound = 0;
        for (let i = 0; i < 81; i++) {
            this.allOpen[i] = false;
        }
    }

    public nextRound() {
        this.currentRound++;
    }

    public recordMap(map) {
        this.map = map;
    }

    public recordGridOpen(grid) {
        console.log(this.gridOpenRecorded);
        ArrayUtil.add(this.gridOpenRecorded, grid.gridValue);
        this.girdThisRound.push(grid.gridValue);
        if (this.allOpen[grid.gridValue] === false) {
            this.allOpen[grid.gridValue] = true;
            if (grid.gridType === GridTypeEnum.HEAD) {
                ArrayUtil.add(this.headRecored, { head: grid.gridValue, direction: grid.direction });
                platform.analytics("hitHead", { grid: grid.gridValue })
                console.log(this.headRecored);
            }
        }
        // else {
        //     if (grid.gridType === GridTypeEnum.HEAD) {
        //         ArrayUtil.add(this.headRecored, { head: grid.gridValue, direction: grid.direction });
        //         platform.analytics("hitHead", { grid: grid.gridValue })
        //         console.log(this.headRecored);
        //     }
        // }

    }

    public recordEachRound() {
        this.nextRound();
        let thisRound = [];
        for (let i = 0; i < this.girdThisRound.length; i++) {
            thisRound.push(this.girdThisRound[i]);
        }
        this.gridEachRound.push(thisRound);
        this.girdThisRound = [];

    }

    public recordAction(grid: GridData, bullet = BulletTypeEnum.MISSILE, isDirect = true) {
        this.hitRecorded.push(grid.gridValue);
        platform.analytics("hitAction", { indexBullet: this.hitRecorded.length, bulletType: bullet, grid: grid.gridValue })
        this.bulletRecorded.push(bullet);
        if (grid.index !== -1) {
            ArrayUtil.add(this.hittedPlane, grid.index);
        }
        if (this.allOpen[grid.gridValue] === false) {
            if (this.isContinuous(grid.index, grid.gridType)) {
                // RewardController.getInstance().continuousReward();
            }
        }
        //再次判断 小鸟撞击
        if (bullet === BulletTypeEnum.ARMOR_PIERCING_MISSILE) {
            let headGridId;
            let direction = grid.direction;
            let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
            if (grid.bodyType === GridTypeEnum.BODY) {
                headGridId = grid.gridValue - bodyGrids[grid.bodyType];
            } else {
                headGridId = grid.gridValue;
            }
            ArrayUtil.add(this.headRecored, { head: grid.gridValue, direction: grid.direction });
        }
        // this.allOpen[grid.gridValue] = true;
        if (this.headRecored.length === 3) {
            GameController.getInstance().gameFinished(true);
            GuideController.getInstance().guideFinished();
            return;
        }
        // if (grid.gridType === GridTypeEnum.HEAD) {
        //     ArrayUtil.add(this.headRecored, grid);
        //     console.log(this.headRecored);
        //     if (this.headRecored.length === 3) {
        //         GameController.getInstance().gameFinished(true);
        //         return;
        //     }
        // }

        console.log(this.bulletRecorded.length);

        if (GuideController.getInstance().isFinished() && this.bulletRecorded.length >= 20) {
            GameController.getInstance().gameFinished(false);
            return;
        }

        // if (grid.gridType === GridTypeEnum.MISS) {
        //     RewardController.getInstance().missReward();
        // }

    }

    public isContinuous(index, type) {
        let result = false;
        if (index === this._indexTimes) {
            this._indexTimes++;
            result = true;
        }
        if (type === GridTypeEnum.MISS) {
            if (this._continuousType === type) {
                this._continuousTimes++;
                result = true;
            } else {
                this._continuousType = GridTypeEnum.MISS;
                this._continuousTimes = 1;
            }
            this._missTimes++;
        } else if (type === GridTypeEnum.BODY) {
            if (this._continuousType === GridTypeEnum.BODY) {
                this._continuousTimes++;
                result = true;
            } else if (this._continuousType === GridTypeEnum.HEAD) {
                this._continuousTimes++;
                this._continuousType = GridTypeEnum.BODY;
                result = true;
            } else {
                this._continuousType = GridTypeEnum.BODY;
                this._continuousTimes = 1;
            }
            this._bodyTimes++;

        }
        if (type === GridTypeEnum.HEAD) {
            if (this._continuousType === GridTypeEnum.HEAD) {
                this._continuousTimes++;
                result = true;
            } else if (this._continuousType === GridTypeEnum.BODY) {
                this._continuousTimes++;
                this._continuousType = GridTypeEnum.HEAD;
                result = true;
            } else {
                this._continuousType = GridTypeEnum.HEAD;
                this._continuousTimes = 1;
            }
            this._headTimes++;
        }
        return result;
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new RecordController();
        }
        return this.instance;
    }

    public get continuousType() {
        return this._continuousType;
    }

    public get continuousTimes() {
        return this._continuousTimes;
    }
    public get missTimes() {
        return this._missTimes;
    }
    public get bodyTimes() {
        return this._bodyTimes;
    }
    public get headTimes() {
        return this._headTimes;
    }

    public getOneUnhitPlane() {
        if (this.hittedPlane.indexOf(0) === -1) {
            return 0;
        }
        if (this.hittedPlane.indexOf(1) === -1) {
            return 1;
        }
        if (this.hittedPlane.indexOf(2) === -1) {
            return 2;
        }
        return -1;
    }

    public getHitRecorded() {
        return this.hitRecorded;
    }

    public get roundBullet() {
        return this.bulletRecorded[this.bulletRecorded.length - 1];
    }

    public get bulletUsed() {
        // return this.bulletRecorded.filter((e) => {
        //     return e !== BulletTypeEnum.GUIDED_MISSILE
        // }).length;
        return this.bulletRecorded.length;
    }

    public getHitPosition(index) {
        return this.hitRecorded[index];
    }

    public getBulletByIndex(index) {
        return this.bulletRecorded[index];
    }

    public getGridOpenRecorded(index) {
        return this.gridOpenRecorded[index];
    }

    public getEachGridOpenRecord(index) {
        if (index >= this.gridEachRound.length) {
            return [];
        }
        return this.gridEachRound[index];
    }

    public get recordedMap() {
        return this.map;
    }

    public get round() {
        return this.currentRound;
    }

    public isGridOpen(gridId) {
        return this.allOpen[gridId]
    }

    public get heads() {
        return this.headRecored;
    }
}