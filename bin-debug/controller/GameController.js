var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏主逻辑
 * creat by tishoy
 * 2019.4.12
 */
var GameController = (function () {
    function GameController() {
        this.gameResult = null;
        this.one_round_result = []; //gridType
        this.firing_grid = [];
        if (GameController.instance) {
            throw new Error("AIController singlon error");
        }
        egret.setInterval(this.gameUpdate, this, 10000);
        egret.setInterval(this.bolloonFly, this, 30000);
    }
    GameController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new GameController();
        }
        return this.instance;
    };
    GameController.prototype.bolloonFly = function () {
        CityController.getInstance().balloonFly();
    };
    GameController.prototype.gameUpdate = function () {
        var gasSpeed = CityController.getInstance().getGasSpeed();
        this.addGas(gasSpeed / 360);
    };
    GameController.prototype.setAwayGame = function (value) {
        this.awayMapData = value;
    };
    GameController.prototype.attackSharedMap = function (mapId) {
        var list = MapUtil.headIdToHeadData(mapId);
        console.log(list);
        platform.analytics("playShare", { mapId: mapId });
        this.phase = PhaseEnum.PREPARE_PHASE;
        this.gameResult = null;
        RewardController.getInstance().reset();
        RecordController.getInstance().reset();
        BulletController.getInstance().resetBullets();
        SceneManager.getInstance().awayScene.resetGameView();
        this._type = GameTypeEnum.GAME_TYPE_HITTING;
        this.awayMapData = new MapData();
        this.firing_grid = [];
        for (var i = 0; i < 3; i++) {
            this.awayMapData.setPlaneGridByHead(list[i].head, list[i].direction);
        }
        SceneManager.getInstance().toAwayScene();
        this.startAttackPhase();
    };
    GameController.prototype.attackOpponent = function (level) {
        if (level === void 0) { level = 0; }
        platform.analytics("attack", { level: level });
        this.phase = PhaseEnum.PREPARE_PHASE;
        this.firing_grid = [];
        this.gameResult = null;
        RewardController.getInstance().reset();
        RecordController.getInstance().reset();
        BulletController.getInstance().resetBullets();
        SceneManager.getInstance().awayScene.resetGameView(level);
        this._type = GameTypeEnum.GAME_TYPE_HITTING;
        this.awayMapData = AIController.getInstance().generateRandomMap();
        SceneManager.getInstance().toAwayScene();
        this.startAttackPhase();
        return;
        // if (GuideController.getInstance().isFinished()) {
        //     if (this.costGas(Math.pow(level, 3) * 2)) {
        //         platform.analytics("attack", { level: level });
        //         this.phase = PhaseEnum.PREPARE_PHASE;
        //         this.firing_grid = [];
        //         this.gameResult = null;
        //         RewardController.getInstance().reset();
        //         RecordController.getInstance().reset();
        //         BulletController.getInstance().resetBullets();
        //         SceneManager.getInstance().awayScene.resetGameView(level);
        //         this._type = GameTypeEnum.GAME_TYPE_HITTING;
        //         this.awayMapData = AIController.getInstance().generateRandomMap();
        //         SceneManager.getInstance().toAwayScene();
        //         this.phase = PhaseEnum.ATTACK_PHASE;
        //     }
        // } else {
        //     platform.analytics("guide", {});
        //     this.phase = PhaseEnum.PREPARE_PHASE;
        //     this.firing_grid = [];
        //     this.gameResult = null;
        //     RewardController.getInstance().reset();
        //     RecordController.getInstance().reset();
        //     BulletController.getInstance().resetBullets();
        //     this._type = GameTypeEnum.GAME_TYPE_GUIDE;
        //     SceneManager.getInstance().awayScene.resetGameView(level, true);
        //     GuideController.getInstance().startAwayGuide();
        //     SceneManager.getInstance().toAwayScene();
        //     this.phase = PhaseEnum.ATTACK_PHASE;
        // }
    };
    GameController.prototype.startPlacingGame = function () {
        this._type = GameTypeEnum.GAME_TYPE_MAPING;
        platform.analytics("placing", {});
        PlacingController.getInstance().randomMap();
    };
    GameController.prototype.isGuiding = function () {
        return GameTypeEnum.GAME_TYPE_GUIDE === GameController.getInstance().type;
    };
    GameController.prototype.isHitGaming = function () {
        return GameTypeEnum.GAME_TYPE_HITTING === GameController.getInstance().type;
    };
    GameController.prototype.isDoubleHitting = function () {
        return GameTypeEnum.GAME_TYPE_DOUBLE_HITTING === GameController.getInstance().type;
    };
    GameController.prototype.isPlacing = function () {
        return GameTypeEnum.GAME_TYPE_MAPING === GameController.getInstance().type;
    };
    GameController.prototype.gameFinished = function (isWin) {
        this.phase = PhaseEnum.OVER_PHASE;
        this.gameResult = isWin;
        RecordController.getInstance().recordMap(this.awayMapData.map);
        if (isWin) {
            var result = ScoreTypeEnum.C;
            for (var i = 0; i < ScoreTypeEnum.SCORE.length; i++) {
                console.log(RecordController.getInstance().bulletUsed);
                if (RecordController.getInstance().bulletUsed <= ScoreTypeEnum.SCORE[i]) {
                    result = ScoreTypeEnum.SCORE[i];
                    break;
                }
            }
            platform.analytics("winGame", { result: result });
            SceneManager.getInstance().resultScene.showResult(ResultTypeEnum.WIN, result);
        }
        else {
            platform.analytics("failGame", { result: ScoreTypeEnum.C });
            SceneManager.getInstance().resultScene.showResult(ResultTypeEnum.FAIL, ScoreTypeEnum.C);
        }
        var mapId = MapUtil.headDataToHeadId(this.awayMapData.getHeadList());
        console.log("saveMap" + mapId);
        // platform.callFunction("setMapData", { mapId: mapId, isWin: isWin, bullets: RecordController.getInstance().bulletUsed }, () => {
        //     console.log("地图存储成功")
        // })
        SceneManager.getInstance().awayScene.showGameFinished();
    };
    GameController.prototype.mapShowGird = function (gridId, fire) {
        if (fire === void 0) { fire = false; }
        if (MapUtil.gridValid(gridId)) {
            var grid = this.awayMapData.map[gridId];
            this.one_round_result.push(grid.gridType);
            RecordController.getInstance().recordGridOpen(grid);
            SceneManager.getInstance().awayScene.showGridView(gridId, grid.gridType);
            if (fire) {
                SceneManager.getInstance().awayScene.fireGrid(gridId);
            }
            return grid.gridType;
        }
        return "";
    };
    GameController.prototype.startAttackPhase = function () {
        if (this.phase === PhaseEnum.OVER_PHASE) {
            return;
        }
        this.phase = PhaseEnum.ATTACK_PHASE;
        // if (BulletController.getInstance().getCurrentBullet() === BulletTypeEnum.GUIDED_MISSILE) {
        //     // let planeIndex = RecordController.getInstance().getUnHitPlaneGrid();
        //     // let girds = this.awayMapData.getPlaneByIndex(planeIndex);
        //     this.hitGrid(this.getUnHitPlaneGrid(), BulletController.getInstance().useBullet());
        // } else {
        // }
    };
    GameController.prototype.hitGrid = function (gridId, bulletType) {
        if (this.phase !== PhaseEnum.ATTACK_PHASE) {
            return;
        }
        if (GuideController.getInstance().isFinished()) {
            // SceneManager.getInstance().awayScene.msgView.showHitInfo();
        }
        this.phase = PhaseEnum.RESULT_PHASE;
        var effectGrids;
        var effectArea = BulletTypeEnum.BULLET_GRID_AREA[bulletType];
        this.one_round_result = [];
        if (bulletType === BulletTypeEnum.GUIDED_MISSILE) {
            effectGrids = [this.getUnHitPlaneGrid()];
            SceneManager.getInstance().awayScene.getGameView().launchGuidedMissile(gridId, effectGrids[0]);
            RecordController.getInstance().recordAction(this.awayMapData.map[gridId], bulletType);
        }
        else {
            effectGrids = BulletTypeEnum.getBulletEffect(bulletType, gridId);
            for (var i = 0; i < effectGrids.length; i++) {
                this.mapShowGird(effectGrids[i]);
            }
            if (bulletType === BulletTypeEnum.MISSILE) {
                var grid = this.awayMapData.map[gridId];
                switch (grid.gridType) {
                    case GridTypeEnum.HEAD:
                        SoundManager.getInstance().playSound(SoundEnum.HEAD_MP3);
                        break;
                    case GridTypeEnum.BODY:
                        SoundManager.getInstance().playSound(SoundEnum.HIT_MP3);
                        break;
                    case GridTypeEnum.MISS:
                        SoundManager.getInstance().playSound(SoundEnum.MISS_MP3);
                        break;
                }
            }
            if (bulletType === BulletTypeEnum.INCENDIARY_BOMB) {
                if (this.awayMapData.map[gridId].gridType !== GridTypeEnum.MISS) {
                    this.firing_grid.push({ grid: gridId, fire: 0 });
                }
            }
            RecordController.getInstance().recordEachRound();
            var reward = RewardController.getInstance().hitReward(this.one_round_result);
            RecordController.getInstance().recordAction(this.awayMapData.map[gridId], bulletType);
            // if (RecordController.getInstance().isContinuous(this.awayMapData.map[gridId], this.awayMapData.map[gridId].gridType)) {
            //     RewardController.getInstance().continuousReward();
            // }
            if (this.phase !== PhaseEnum.OVER_PHASE) {
                this.phase = PhaseEnum.END_PHASE;
                this.endingPhase();
                //    SceneManager.getInstance().awayScene.m
            }
            else {
                if (RecordController.getInstance().round < 20) {
                    BulletController.getInstance().prepareNextBullet();
                }
            }
        }
    };
    GameController.prototype.afterAnimate = function (hitGRid) {
        this.mapShowGird(hitGRid);
        RecordController.getInstance().recordEachRound();
        var reward = RewardController.getInstance().hitReward(this.one_round_result);
        // RecordController.getInstance().recordAction(this.awayMapData.map[gridId], bulletType);
        // if (RecordController.getInstance().isContinuous(this.awayMapData.map[gridId], this.awayMapData.map[gridId].gridType)) {
        //     RewardController.getInstance().continuousReward();
        // }
        if (this.phase !== PhaseEnum.OVER_PHASE) {
            this.phase = PhaseEnum.END_PHASE;
            this.endingPhase();
            //    SceneManager.getInstance().awayScene.m
        }
        else {
            if (RecordController.getInstance().round < 20) {
                BulletController.getInstance().prepareNextBullet();
            }
        }
    };
    GameController.prototype.endingPhase = function () {
        if (this.firing_grid.length > 0) {
            var next_firing_grid = [];
            for (var i = 0; i < this.firing_grid.length; i++) {
                console.log(this.firing_grid[i]);
                var times = this.firing_grid[i].fire;
                if (times === 0) {
                    next_firing_grid.push({ grid: this.firing_grid[i].grid, fire: ++times });
                    SceneManager.getInstance().awayScene.fireGrid(this.firing_grid[i].grid);
                    continue;
                }
                var firing_nearby = MapUtil.getNearByGrid(this.firing_grid[i].grid);
                console.log(firing_nearby);
                for (var i_1 = 0; i_1 < firing_nearby.length; i_1++) {
                    var grid = this.awayMapData.map[firing_nearby[i_1]];
                    if (grid.gridType !== GridTypeEnum.MISS) {
                        // RecordController.getInstance().isGridOpen(grid.gridValue)
                        this.mapShowGird(firing_nearby[i_1], true);
                        if (times === 2) {
                        }
                        else {
                            next_firing_grid.push({ grid: grid.gridValue, fire: times + 1 });
                        }
                    }
                }
            }
            this.firing_grid = next_firing_grid;
        }
        if (RecordController.getInstance().round < 20) {
            BulletController.getInstance().prepareNextBullet();
        }
    };
    GameController.prototype.costGold = function (cost) {
        var userGold = SaveDataManager.getInstance().getUserData().gold;
        if (Number(userGold) === NaN) {
            return false;
        }
        if (cost > userGold) {
            SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_gold_not_enough") + ",还差" + Math.floor(cost - userGold));
            // TODO 提示
            return false;
        }
        SaveDataManager.getInstance().getUserData().gold = Number(userGold) - Number(cost);
        SceneManager.getInstance().updateGold();
        SaveDataManager.getInstance().saveUserData();
        return true;
    };
    GameController.prototype.costGas = function (cost) {
        var userGas = SaveDataManager.getInstance().getUserData().gas;
        if (Number(userGas) === NaN) {
            return false;
        }
        if (cost > userGas) {
            SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_gas_not_enough") + ",还差" + Math.floor(cost - userGas));
            // TODO 提示
            return false;
        }
        SaveDataManager.getInstance().getUserData().gas -= cost;
        SceneManager.getInstance().updateGas();
        SaveDataManager.getInstance().saveUserData();
        return true;
    };
    GameController.prototype.addGold = function (add) {
        SaveDataManager.getInstance().getUserData().gold += add;
        SceneManager.getInstance().updateGold();
        SaveDataManager.getInstance().saveUserData();
    };
    GameController.prototype.addGas = function (add) {
        SaveDataManager.getInstance().getUserData().gas = Math.min(SaveDataManager.getInstance().getUserData().gas + add, CityController.getInstance().getGasStationMax());
        SceneManager.getInstance().updateGas();
        SaveDataManager.getInstance().saveUserData();
    };
    GameController.prototype.getMapByUser = function () {
    };
    GameController.prototype.getTestMapData = function () {
    };
    GameController.prototype.setTestMapData = function () {
    };
    GameController.prototype.getAwayMapData = function (gridId) {
        return this.awayMapData.map[gridId].gridType;
    };
    Object.defineProperty(GameController.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameController.prototype, "isAttackPhase", {
        get: function () {
            return this.phase === PhaseEnum.ATTACK_PHASE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取未击中飞机的一个位置
     */
    GameController.prototype.getUnHitPlaneGrid = function () {
        var index = RecordController.getInstance().getOneUnhitPlane();
        if (index === -1) {
            return this.getPlaneGridUnhit();
        }
        else {
            return this.getPlaneGridUnhitByIndex(index);
        }
    };
    GameController.prototype.getPlaneGridUnhitByIndex = function (index) {
        var hitted = RecordController.getInstance().getHitRecorded();
        var plane = this.awayMapData.getPlaneGridByIndex(index);
        var unhit = plane.filter(function (element) {
            return hitted.indexOf(element.gridValue) === -1;
        });
        return ArrayUtil.random(unhit).gridValue;
        for (var i = 0; i < plane.length; i++) {
            if (hitted.indexOf(plane[i].gridValue) === -1) {
                return plane[i].gridValue;
            }
        }
    };
    GameController.prototype.getPlaneGridUnhit = function () {
        var hitted = RecordController.getInstance().getHitRecorded();
        var planes = this.awayMapData.getPlaneGrid();
        var unhit = planes.filter(function (element) {
            return hitted.indexOf(element.gridValue) === -1;
        });
        return ArrayUtil.random(unhit).gridValue;
    };
    GameController.instance = null;
    return GameController;
}());
__reflect(GameController.prototype, "GameController");
