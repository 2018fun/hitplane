/**
 * 游戏主逻辑
 * creat by tishoy
 * 2019.4.12
 */
class GameController {
    private static instance: GameController = null;

    // private homeDataList;

    private awayMapData: MapData;


    //游戏类型
    private _type: number;
    //游戏状态
    private phase: number;
    private gameResult = null;

    private one_round_result = [];  //gridType
    private firing_grid = [];

    constructor() {
        if (GameController.instance) {
            throw new Error("AIController singlon error")
        }
        egret.setInterval(this.gameUpdate, this, 10000);
        egret.setInterval(this.bolloonFly, this, 30000);
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new GameController();
        }
        return this.instance;
    }

    private bolloonFly() {
        CityController.getInstance().balloonFly();
    }

    private gameUpdate() {
        let gasSpeed = CityController.getInstance().getGasSpeed();
        this.addGas(gasSpeed / 360)
    }

    public setAwayGame(value) {
        this.awayMapData = value;
    }

    public attackSharedMap(mapId) {
        let list = MapUtil.headIdToHeadData(mapId);
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
        for (let i = 0; i < 3; i++) {
            this.awayMapData.setPlaneGridByHead(list[i].head, list[i].direction);
        }
        SceneManager.getInstance().toAwayScene();
        this.startAttackPhase();
    }

    public attackOpponent(level = 0) {
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

    }

    public startPlacingGame() {
        this._type = GameTypeEnum.GAME_TYPE_MAPING;
        platform.analytics("placing", {});
        PlacingController.getInstance().randomMap();
    }


    public isGuiding() {
        return GameTypeEnum.GAME_TYPE_GUIDE === GameController.getInstance().type;
    }

    public isHitGaming() {
        return GameTypeEnum.GAME_TYPE_HITTING === GameController.getInstance().type;
    }

    public isDoubleHitting() {
        return GameTypeEnum.GAME_TYPE_DOUBLE_HITTING === GameController.getInstance().type;
    }

    public isPlacing() {
        return GameTypeEnum.GAME_TYPE_MAPING === GameController.getInstance().type;
    }

    public gameFinished(isWin: boolean) {
        this.phase = PhaseEnum.OVER_PHASE;
        this.gameResult = isWin;
        RecordController.getInstance().recordMap(this.awayMapData.map);
        if (isWin) {
            let result = ScoreTypeEnum.C;
            for (let i = 0; i < ScoreTypeEnum.SCORE.length; i++) {
                console.log(RecordController.getInstance().bulletUsed);
                if (RecordController.getInstance().bulletUsed <= ScoreTypeEnum.SCORE[i]) {
                    result = ScoreTypeEnum.SCORE[i];
                    break;
                }
            }
            platform.analytics("winGame", { result: result });
            SceneManager.getInstance().resultScene.showResult(ResultTypeEnum.WIN, result);
        } else {
            platform.analytics("failGame", { result: ScoreTypeEnum.C });
            SceneManager.getInstance().resultScene.showResult(ResultTypeEnum.FAIL, ScoreTypeEnum.C);
        }
        let mapId = MapUtil.headDataToHeadId(this.awayMapData.getHeadList());
        console.log("saveMap" + mapId);
        // platform.callFunction("setMapData", { mapId: mapId, isWin: isWin, bullets: RecordController.getInstance().bulletUsed }, () => {
        //     console.log("地图存储成功")
        // })

        SceneManager.getInstance().awayScene.showGameFinished();
    }

    public mapShowGird(gridId, fire = false) {
        if (MapUtil.gridValid(gridId)) {
            let grid = this.awayMapData.map[gridId];
            this.one_round_result.push(grid.gridType);
            RecordController.getInstance().recordGridOpen(grid);
            SceneManager.getInstance().awayScene.showGridView(gridId, grid.gridType);
            if (fire) {
                SceneManager.getInstance().awayScene.fireGrid(gridId);
            }
            return grid.gridType
        }
        return ""
    }


    public startAttackPhase() {
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

    }

    public hitGrid(gridId, bulletType) {

        if (this.phase !== PhaseEnum.ATTACK_PHASE) {
            return;
        }

        if (GuideController.getInstance().isFinished()) {
            // SceneManager.getInstance().awayScene.msgView.showHitInfo();
        }

        this.phase = PhaseEnum.RESULT_PHASE;
        let effectGrids;
        let effectArea = BulletTypeEnum.BULLET_GRID_AREA[bulletType];
        this.one_round_result = [];


       
        if (bulletType === BulletTypeEnum.GUIDED_MISSILE) {
            effectGrids = [this.getUnHitPlaneGrid()];
            SceneManager.getInstance().awayScene.getGameView().launchGuidedMissile(gridId, effectGrids[0]);
            RecordController.getInstance().recordAction(this.awayMapData.map[gridId], bulletType);
        } else {
            effectGrids = BulletTypeEnum.getBulletEffect(bulletType, gridId);
            for (var i = 0; i < effectGrids.length; i++) {
                this.mapShowGird(effectGrids[i]);
            }
            if (bulletType === BulletTypeEnum.MISSILE) {
                let grid = this.awayMapData.map[gridId];
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
            let reward = RewardController.getInstance().hitReward(this.one_round_result);
            RecordController.getInstance().recordAction(this.awayMapData.map[gridId], bulletType);


            // if (RecordController.getInstance().isContinuous(this.awayMapData.map[gridId], this.awayMapData.map[gridId].gridType)) {
            //     RewardController.getInstance().continuousReward();
            // }
            if (this.phase !== PhaseEnum.OVER_PHASE) {
                this.phase = PhaseEnum.END_PHASE;
                this.endingPhase()

                //    SceneManager.getInstance().awayScene.m
            } else {
                if (RecordController.getInstance().round < 20) {
                    BulletController.getInstance().prepareNextBullet();
                }
            }
        }


    }


    public afterAnimate(hitGRid) {
        this.mapShowGird(hitGRid);
        RecordController.getInstance().recordEachRound();
        let reward = RewardController.getInstance().hitReward(this.one_round_result);
        // RecordController.getInstance().recordAction(this.awayMapData.map[gridId], bulletType);


        // if (RecordController.getInstance().isContinuous(this.awayMapData.map[gridId], this.awayMapData.map[gridId].gridType)) {
        //     RewardController.getInstance().continuousReward();
        // }
        if (this.phase !== PhaseEnum.OVER_PHASE) {
            this.phase = PhaseEnum.END_PHASE;
            this.endingPhase()

            //    SceneManager.getInstance().awayScene.m
        } else {
            if (RecordController.getInstance().round < 20) {
                BulletController.getInstance().prepareNextBullet();
            }
        }
    }

    private endingPhase() {
        if (this.firing_grid.length > 0) {
            let next_firing_grid = [];
            for (let i = 0; i < this.firing_grid.length; i++) {
                console.log(this.firing_grid[i]);
                let times = this.firing_grid[i].fire;
                if (times === 0) {
                    next_firing_grid.push({ grid: this.firing_grid[i].grid, fire: ++times });
                    SceneManager.getInstance().awayScene.fireGrid(this.firing_grid[i].grid);
                    continue;
                }
                let firing_nearby = MapUtil.getNearByGrid(this.firing_grid[i].grid);
                console.log(firing_nearby);
                for (let i = 0; i < firing_nearby.length; i++) {
                    let grid = this.awayMapData.map[firing_nearby[i]];

                    if (grid.gridType !== GridTypeEnum.MISS) {
                        // RecordController.getInstance().isGridOpen(grid.gridValue)
                        this.mapShowGird(firing_nearby[i], true);
                        if (times === 2) {

                        } else {
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
    }

    public costGold(cost) {
        let userGold = SaveDataManager.getInstance().getUserData().gold;
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
    }

    public costGas(cost) {
        let userGas = SaveDataManager.getInstance().getUserData().gas;
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
    }

    public addGold(add) {
        SaveDataManager.getInstance().getUserData().gold += add;
        SceneManager.getInstance().updateGold();
        SaveDataManager.getInstance().saveUserData();
    }

    public addGas(add) {
        SaveDataManager.getInstance().getUserData().gas = Math.min(SaveDataManager.getInstance().getUserData().gas + add, CityController.getInstance().getGasStationMax());
        SceneManager.getInstance().updateGas();
        SaveDataManager.getInstance().saveUserData();
    }

    public getMapByUser() {

    }


    public getTestMapData() {

    }

    public setTestMapData() {

    }

    public getAwayMapData(gridId) {
        return this.awayMapData.map[gridId].gridType;
    }



    public get type() {
        return this._type;
    }
    public set type(value) {
        this._type = value;
    }

    public get isAttackPhase(): boolean {
        return this.phase === PhaseEnum.ATTACK_PHASE;
    }

    /**
     * 获取未击中飞机的一个位置
     */
    public getUnHitPlaneGrid() {
        let index = RecordController.getInstance().getOneUnhitPlane();
        if (index === -1) {
            return this.getPlaneGridUnhit();
        } else {
            return this.getPlaneGridUnhitByIndex(index);
        }

    }

    public getPlaneGridUnhitByIndex(index) {
        let hitted = RecordController.getInstance().getHitRecorded();
        let plane = this.awayMapData.getPlaneGridByIndex(index);
        let unhit = plane.filter((element) => {
            return hitted.indexOf(element.gridValue) === -1
        })
        return ArrayUtil.random(unhit).gridValue;
        for (let i = 0; i < plane.length; i++) {
            if (hitted.indexOf(plane[i].gridValue) === -1) {
                return plane[i].gridValue;
            }
        }
    }

    public getPlaneGridUnhit() {
        let hitted = RecordController.getInstance().getHitRecorded();
        let planes = this.awayMapData.getPlaneGrid();
        let unhit = planes.filter((element) => {
            return hitted.indexOf(element.gridValue) === -1
        })
        return ArrayUtil.random(unhit).gridValue;
    }


}