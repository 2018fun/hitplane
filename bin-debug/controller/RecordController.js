var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var RecordController = (function () {
    function RecordController() {
        this.recordingRound = 0;
        this.currentRound = 0;
        this.headRecored = [];
        this.hitRecorded = [];
        this.bulletRecorded = [];
        this.gridOpenRecorded = [];
        this.gridEachRound = [];
        this.girdThisRound = [];
        this.hittedPlane = [];
        this.allOpen = [];
        this._continuousIndex = -1;
        this._continuousType = GridTypeEnum.UNSET;
        this._continuousTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
        this._indexTimes = 0;
        this._indexOneTimes = 0;
        this._indexTwoTimes = 0;
        this._indexThreeTimes = 0;
        this._indexContinuousTimes = 0;
        if (RecordController.instance) {
            throw new Error("AIController singlon error");
        }
        this.init();
    }
    RecordController.prototype.init = function () {
    };
    RecordController.prototype.reset = function () {
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
        for (var i = 0; i < 81; i++) {
            this.allOpen[i] = false;
        }
    };
    RecordController.prototype.nextRound = function () {
        this.currentRound++;
    };
    RecordController.prototype.recordMap = function (map) {
        this.map = map;
    };
    RecordController.prototype.recordGridOpen = function (grid) {
        console.log(this.gridOpenRecorded);
        ArrayUtil.add(this.gridOpenRecorded, grid.gridValue);
        this.girdThisRound.push(grid.gridValue);
        if (this.allOpen[grid.gridValue] === false) {
            this.allOpen[grid.gridValue] = true;
            if (grid.gridType === GridTypeEnum.HEAD) {
                ArrayUtil.add(this.headRecored, { head: grid.gridValue, direction: grid.direction });
                platform.analytics("hitHead", { grid: grid.gridValue });
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
    };
    RecordController.prototype.recordEachRound = function () {
        this.nextRound();
        var thisRound = [];
        for (var i = 0; i < this.girdThisRound.length; i++) {
            thisRound.push(this.girdThisRound[i]);
        }
        this.gridEachRound.push(thisRound);
        this.girdThisRound = [];
    };
    RecordController.prototype.recordAction = function (grid, bullet, isDirect) {
        if (bullet === void 0) { bullet = BulletTypeEnum.MISSILE; }
        if (isDirect === void 0) { isDirect = true; }
        this.hitRecorded.push(grid.gridValue);
        platform.analytics("hitAction", { indexBullet: this.hitRecorded.length, bulletType: bullet, grid: grid.gridValue });
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
            var headGridId = void 0;
            var direction = grid.direction;
            var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
            if (grid.bodyType === GridTypeEnum.BODY) {
                headGridId = grid.gridValue - bodyGrids[grid.bodyType];
            }
            else {
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
    };
    RecordController.prototype.isContinuous = function (index, type) {
        var result = false;
        if (index === this._indexTimes) {
            this._indexTimes++;
            result = true;
        }
        if (type === GridTypeEnum.MISS) {
            if (this._continuousType === type) {
                this._continuousTimes++;
                result = true;
            }
            else {
                this._continuousType = GridTypeEnum.MISS;
                this._continuousTimes = 1;
            }
            this._missTimes++;
        }
        else if (type === GridTypeEnum.BODY) {
            if (this._continuousType === GridTypeEnum.BODY) {
                this._continuousTimes++;
                result = true;
            }
            else if (this._continuousType === GridTypeEnum.HEAD) {
                this._continuousTimes++;
                this._continuousType = GridTypeEnum.BODY;
                result = true;
            }
            else {
                this._continuousType = GridTypeEnum.BODY;
                this._continuousTimes = 1;
            }
            this._bodyTimes++;
        }
        if (type === GridTypeEnum.HEAD) {
            if (this._continuousType === GridTypeEnum.HEAD) {
                this._continuousTimes++;
                result = true;
            }
            else if (this._continuousType === GridTypeEnum.BODY) {
                this._continuousTimes++;
                this._continuousType = GridTypeEnum.HEAD;
                result = true;
            }
            else {
                this._continuousType = GridTypeEnum.HEAD;
                this._continuousTimes = 1;
            }
            this._headTimes++;
        }
        return result;
    };
    RecordController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new RecordController();
        }
        return this.instance;
    };
    Object.defineProperty(RecordController.prototype, "continuousType", {
        get: function () {
            return this._continuousType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordController.prototype, "continuousTimes", {
        get: function () {
            return this._continuousTimes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordController.prototype, "missTimes", {
        get: function () {
            return this._missTimes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordController.prototype, "bodyTimes", {
        get: function () {
            return this._bodyTimes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordController.prototype, "headTimes", {
        get: function () {
            return this._headTimes;
        },
        enumerable: true,
        configurable: true
    });
    RecordController.prototype.getOneUnhitPlane = function () {
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
    };
    RecordController.prototype.getHitRecorded = function () {
        return this.hitRecorded;
    };
    Object.defineProperty(RecordController.prototype, "roundBullet", {
        get: function () {
            return this.bulletRecorded[this.bulletRecorded.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordController.prototype, "bulletUsed", {
        get: function () {
            // return this.bulletRecorded.filter((e) => {
            //     return e !== BulletTypeEnum.GUIDED_MISSILE
            // }).length;
            return this.bulletRecorded.length;
        },
        enumerable: true,
        configurable: true
    });
    RecordController.prototype.getHitPosition = function (index) {
        return this.hitRecorded[index];
    };
    RecordController.prototype.getBulletByIndex = function (index) {
        return this.bulletRecorded[index];
    };
    RecordController.prototype.getGridOpenRecorded = function (index) {
        return this.gridOpenRecorded[index];
    };
    RecordController.prototype.getEachGridOpenRecord = function (index) {
        if (index >= this.gridEachRound.length) {
            return [];
        }
        return this.gridEachRound[index];
    };
    Object.defineProperty(RecordController.prototype, "recordedMap", {
        get: function () {
            return this.map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordController.prototype, "round", {
        get: function () {
            return this.currentRound;
        },
        enumerable: true,
        configurable: true
    });
    RecordController.prototype.isGridOpen = function (gridId) {
        return this.allOpen[gridId];
    };
    Object.defineProperty(RecordController.prototype, "heads", {
        get: function () {
            return this.headRecored;
        },
        enumerable: true,
        configurable: true
    });
    RecordController.instance = null;
    return RecordController;
}());
__reflect(RecordController.prototype, "RecordController");
