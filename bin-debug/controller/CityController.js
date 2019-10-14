/**
 * 城市结案早
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CityController = (function () {
    function CityController() {
        this.buildings = [];
        this.selectedPosition = -1;
        this.bolloonApearTimes = 0;
        if (CityController.instance) {
            throw new Error("AIController singlon error");
        }
        this.init();
    }
    CityController.prototype.init = function () {
        this.buildingData = BuildingDataCache.getInstance();
        this.citySave = SaveDataManager.getInstance().getUserData().buildings;
        console.log(this.citySave);
        this.center = this.buildingData.getAirportDataByLevel(this.citySave[0].level);
        this.center.position = 0;
        this.center.top = this.citySave[0].top;
        this.buildings.push(this.center);
        for (var i = 1; i < this.citySave.length; i++) {
            this.buildings.push(this.buildingData.getBuildingByIdAndLevel(this.citySave[i].id, this.citySave[i].level));
            this.buildings[i].position = i;
            this.buildings[i].top = this.citySave[i].top;
        }
        this.buildingCircle = new Circle(6, this.buildings.slice(1, this.buildings.length));
    };
    CityController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new CityController();
        }
        return this.instance;
    };
    /**
     * 选择位置
     * @param position
     */
    CityController.prototype.selectPosition = function (position) {
        this.selectedPosition = position;
        SceneManager.getInstance().cityScene.selectPosition(this.buildings[position], this.selectedPosition);
        // console.log(this.buildings[position]);
    };
    CityController.prototype.resetSelected = function () {
        this.selectedPosition = -1;
    };
    /**
     * 更新环
     */
    CityController.prototype.updateCircle = function () {
        this.buildingCircle.data = this.buildings.slice(1, this.buildings.length);
    };
    /**
     * 建造当前建筑
     * @param id
     */
    CityController.prototype.buildBuilding = function (id) {
        if (this.selectedPosition > 0 && this.selectedPosition < 7) {
            if (this.buildings[this.selectedPosition].id === -1) {
                if (GameController.getInstance().costGold(this.buildingData.getBuildingByIdAndLevel(id, 1).cost)) {
                    this.buildings[this.selectedPosition] = this.buildingData.getBuildingByIdAndLevel(id, 1);
                    this.buildings[this.selectedPosition].top = 1;
                    this.buildings[this.selectedPosition].level = 1;
                    this.buildings[this.selectedPosition].position = this.selectedPosition;
                    this.saveCity(this.selectedPosition);
                    platform.analytics("build", { position: this.selectPosition, type: id });
                    this.updateCircle();
                    if (this.buildings[this.selectedPosition].id === BuildingEnum.GAS_STATION) {
                        SceneManager.getInstance().updateGas();
                    }
                    SceneManager.getInstance().cityScene.build(this.buildings[this.selectedPosition]);
                    if (this.buildings[this.selectedPosition].id === BuildingEnum.DEFENSE) {
                        this.updateAll();
                    }
                }
            }
        }
    };
    /**
     * 摧毁当前建筑
     */
    CityController.prototype.demolish = function () {
        if (this.selectedPosition === 0) {
            SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_airport_cant_demolish"));
            console.log("空军基地不能拆除");
            // TODO 提示
            return;
        }
        var dmolishBuilding = this.buildings[this.selectedPosition].id;
        GameController.getInstance().addGold(this.buildings[this.selectedPosition].cost);
        this.buildings[this.selectedPosition] = new BuildingBase();
        this.buildings[this.selectedPosition].position = this.selectedPosition;
        this.buildings[this.selectedPosition].top = 0;
        this.buildings[this.selectedPosition].level = 0;
        this.saveCity(this.selectedPosition);
        platform.analytics("demolish", { position: this.selectPosition, type: this.buildings[this.selectedPosition].id });
        if (dmolishBuilding === BuildingEnum.DEFENSE) {
            this.updateAll();
        }
        this.updateCircle();
        SceneManager.getInstance().cityScene.demolish(this.buildings[this.selectedPosition]);
        if (dmolishBuilding === BuildingEnum.GAS_STATION) {
            SceneManager.getInstance().updateGas();
        }
    };
    /**
     * 升级当前建筑
     */
    CityController.prototype.levelUpBuilding = function () {
        if (this.selectedPosition >= 0 && this.selectedPosition < 7) {
            if (this.buildings[this.selectedPosition].level < 5) {
                var nextData = this.buildingData.getBuildingByIdAndLevel(this.buildings[this.selectedPosition].id, this.buildings[this.selectedPosition].level + 1);
                if (GameController.getInstance().costGold(nextData.cost)) {
                    this.buildings[this.selectedPosition] = nextData;
                    this.buildings[this.selectedPosition].position = this.selectedPosition;
                    // this.buildings[this.selectedPosition].level += 1;    Ê4                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                    this.buildings[this.selectedPosition].top = this.buildings[this.selectedPosition].level;
                    // this.buildings[this.selectedPosition].top = Math.max(this.buildings[this.selectedPosition].top, this.buildings[this.selectedPosition].level);
                    this.saveCity(this.selectedPosition);
                    platform.analytics("levelUp", { position: this.selectPosition, type: this.buildings[this.selectedPosition].id, level: nextData.level });
                    this.updateCircle();
                    SceneManager.getInstance().cityScene.levelupBuilding(this.buildings[this.selectedPosition]);
                    if (this.buildings[this.selectedPosition].id === BuildingEnum.GAS_STATION) {
                        SceneManager.getInstance().updateGas();
                    }
                }
            }
            else {
                SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_building_is_top_level"));
            }
        }
    };
    /**
     * 获得总分数
     */
    CityController.prototype.getTotalScore = function () {
        var score = 0;
        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].id !== BuildingEnum.UNSET) {
                score += this.buildings[i].level;
            }
        }
        return score;
    };
    CityController.prototype.getBuildingNum = function (type) {
        var num = 0;
        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].id === type) {
                num++;
            }
        }
        return num;
    };
    CityController.prototype.getTopLevel = function (type) {
        var level = 0;
        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].id === type) {
                level = Math.max(level, this.buildings[i].level);
            }
        }
        return level;
    };
    CityController.prototype.getAllBuildingsByType = function (type) {
        var result = this.buildings.filter(function (element) {
            return element.id === type;
        });
        return result;
    };
    CityController.prototype.getBuildingBlockByType = function (type) {
        var result = [];
        for (var i = 0; i < this.buildingCircle.length; i++) {
            if (this.isBlock(this.buildingCircle.data[i].position)) {
                result.push(this.buildingCircle.data[i]);
            }
        }
        return result.filter(function (element) {
            return element.id === type;
        });
    };
    // public getBuildingBlockNext() {
    //     let result = this.buildingCircle.map((building) => {
    //         return building.isBlockNext();
    //     })
    //     return result;
    // }
    // public getBuildingBlockPre() {
    //     let result = this.buildingCircle.map((building) => {
    //         return building.isBlockPrevious();
    //     })
    //     return result;
    // }
    CityController.prototype.getBlock = function (position) {
        var result = [];
        var next_blocking = true;
        var pre_blocking = true;
        var temp = position;
        while (next_blocking) {
            if (this.isBlockNext(temp)) {
                temp++;
                result.push(temp % this.buildingCircle.length);
            }
            else {
                next_blocking = false;
            }
            if (result.length === this.buildingCircle.length) {
                return result;
            }
        }
        temp = position;
        while (pre_blocking) {
            if (this.isBlockPrevious(temp)) {
                temp--;
                result.push(temp % this.buildingCircle.length);
            }
            else {
                pre_blocking = false;
            }
        }
        result.push(position);
        return result;
    };
    CityController.prototype.isBlock = function (position) {
        return (this.buildingCircle.getData(position).id === this.buildingCircle.getNext(position).id || this.buildingCircle.getData(position).id === this.buildingCircle.getPrevious(position).id);
    };
    CityController.prototype.isBlockPrevious = function (position) {
        return (this.buildingCircle.getData(position).id === this.buildingCircle.getPrevious(position).id);
    };
    CityController.prototype.isBlockNext = function (position) {
        return (this.buildingCircle.getData(position).id === this.buildingCircle.getNext(position).id);
    };
    CityController.prototype.getBuildingByPostion = function (position) {
        return this.buildings[position];
    };
    CityController.prototype.getBuildingsExceptAirpot = function () {
        return this.buildings;
    };
    CityController.prototype.getBuildings = function () {
        return this.buildings;
    };
    CityController.prototype.saveCity = function (position) {
        var buildingSave = {
            id: this.buildings[position].id,
            level: this.buildings[position].level,
            top: this.buildings[position].top,
            insure: this.buildings[position].insure
        };
        SaveDataManager.getInstance().getUserData().setBuilding(position, buildingSave);
    };
    CityController.prototype.destroyCity = function (position) {
        if (this.buildings[position].level - 1 >= 0) {
            this.buildings[position].level -= 1;
            this.saveCity(position);
            // platform.analytics("destroyCity", { position: position });
        }
    };
    /**
     * 修复建筑
     * @param position
     */
    CityController.prototype.repairCity = function (position) {
        if (position === void 0) { position = null; }
        if (position === null) {
            position = this.selectPosition;
        }
        if (this.buildings[position].level < this.buildings[position].top) {
            this.buildings[position].level = this.buildings[position].top;
            this.saveCity(position);
            platform.analytics("repairCity", { position: position });
        }
    };
    CityController.prototype.balloonFly = function () {
        this.bolloonApearTimes++;
        platform.analytics("balloonFly", { times: this.bolloonApearTimes });
        SceneManager.getInstance().cityScene.flyballoon();
    };
    Object.defineProperty(CityController.prototype, "selectedData", {
        get: function () {
            return this.buildings[this.selectedPosition];
        },
        enumerable: true,
        configurable: true
    });
    CityController.prototype.updateAll = function () {
        SceneManager.getInstance().cityScene.cityView.updateView();
    };
    //----------------------------------------------空军基地------------------------------------------------------
    CityController.prototype.makeOpponenetDataByLevel = function (level) {
        var rank = NumUtil.range(1, 100) * 200 + NumUtil.range(1, 200);
        var opponentData = {
            level: level,
            rank: rank,
            score: 1000 * level,
            gold: 50000 * level,
            rob: 20000 * level,
        };
        return opponentData;
    };
    //------------------------------------------------银行功能----------------------------------------------------
    /**
     * 获取攻击奖励系数
     */
    CityController.prototype.getBankGameReward = function () {
        var banks = this.getAllBuildingsByType(BuildingEnum.BANK);
        var result = 1;
        for (var i = 0; i < banks.length; i++) {
            if (banks[i].level > 0) {
                result += banks[i].game_reward;
            }
        }
        return result;
    };
    CityController.prototype.getBankChestReward = function () {
        var banks = this.getAllBuildingsByType(BuildingEnum.BANK);
        var result = 1;
        for (var i = 0; i < banks.length; i++) {
            if (banks[i].level > 0) {
                result += banks[i].chest_reward;
            }
        }
        return result;
    };
    CityController.prototype.getBankVedioReward = function () {
        var banks = this.getAllBuildingsByType(BuildingEnum.BANK);
        var result = 1;
        for (var i = 0; i < banks.length; i++) {
            if (banks[i].level > 0) {
                result += banks[i].vedio_reward;
            }
        }
        return result;
    };
    //-----------------------------------------------炮弹研发中心---------------------------------------------------
    //建筑中显示
    CityController.prototype.getBulletDetail = function () {
        var buildings = this.getAllBuildingsByType(BuildingEnum.BULLET_SCIENCE);
        var bullets = [];
        for (var i = 0; i < buildings.length; i++) {
            // bullets.push()
        }
    };
    // 战斗中使用
    //------------------------------------------------提炼厂功能----------------------------------------------------
    /**
     * 获取总石油储量
     */
    CityController.prototype.getGasStationMax = function () {
        if (this.getTopLevel(BuildingEnum.GAS_STATION) === 0) {
            return Const.getInstance().initGasMax;
        }
        return this.buildingData.getGasStationByLevel(this.getTopLevel(BuildingEnum.GAS_STATION)).max;
    };
    CityController.prototype.getGasSpeed = function () {
        if (this.getGasStationMax() < SaveDataManager.getInstance().getUserData().gas) {
            return (SaveDataManager.getInstance().getUserData().gas - this.getGasStationMax()) / 60;
        }
        var gasStations = this.getAllBuildingsByType(BuildingEnum.GAS_STATION);
        var speed = 0;
        for (var i = 0; i < gasStations.length; i++) {
            speed += this.buildingData.getGasStationByLevel(gasStations[i].top).mph;
        }
        return speed;
    };
    CityController.prototype.onPause = function () {
        this.pauseDate = new Date().getTime();
    };
    CityController.prototype.onResume = function () {
        if (this.pauseDate == null) {
            return;
        }
        var time = new Date().getTime() - this.pauseDate;
        console.log(time);
        GameController.getInstance().addGas(this.getGasSpeed() * time / 3600);
    };
    //---------------------------------------------保险公司---------------------------------------------------------
    CityController.prototype.calBuildingInsurePay = function (position) {
        var insure = this.buildings[position].insure;
        var gold = 0;
        for (var i = 0; i < insure.length; i++) {
            gold += insure[i].data.cost;
        }
        console.log(gold);
        return gold;
    };
    CityController.prototype.buildingDestroyed = function (position) {
        if (this.buildings[position].level < this.buildings[position].top) {
            return true;
        }
        return false;
    };
    CityController.prototype.destroyRate = function () {
    };
    CityController.prototype.getCitySaftyRatio = function () {
        var destroyTimes = SaveDataManager.getInstance().getUserData().getDestroyTimes();
        var destroySum = destroyTimes.reduce(function (previous, current) {
            return previous + current;
        }, 0);
        var score = this.getTotalScore();
        console.log(score);
        console.log(destroyTimes);
        return score + destroySum;
    };
    CityController.prototype.buyInsure = function (targetPos) {
        // if () {
        if (targetPos === void 0) { targetPos = null; }
        // }
        var insurePos = this.selectedPosition;
        var ratio = this.getCitySaftyRatio();
        if (targetPos === null) {
            console.log("购买保险错误");
            return;
        }
        if (GameController.getInstance().costGold(Math.floor(this.buildings[targetPos].cost * 0.3) * ratio / 100)) {
            console.log(this.buildings[insurePos]);
            this.buildings[targetPos].insure.push({ insure: this.buildings[insurePos], ratio: ratio });
            platform.analytics("buyInsure", { insure: this.buildings[insurePos], ratio: ratio });
            this.saveCity(targetPos);
            SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_buy_insure_success"));
        }
    };
    CityController.prototype.unInsure = function (position) {
        if (position === void 0) { position = null; }
        var insures = this.buildings[position].insure;
        var gotMoney = 0;
        for (var i = 0; i < insures.length; i++) {
            platform.analytics("unInsure", insures[i].insure.cost * 0.3 * insures[i].ratio / 100);
            gotMoney += insures[i].insure.cost * 0.3 * insures[i].ratio / 100;
        }
        GameController.getInstance().addGold(gotMoney);
        this.buildBuilding[position].insure = [];
        //返回钱
        this.saveCity(position);
        // platform.analytics("unInsure", { insure: this.buildings[insurePos], ratio: ratio })
        SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_exit_insure_success"));
    };
    CityController.prototype.canBuyBuildingAmout = function () {
    };
    //------------------------------------------------------------------维修工厂---------------------------------------------------------------
    /**
     *
     */
    CityController.prototype.repairAll = function () {
        var canRepair = this.getCanRepair();
        var topFactory = this.getTopLevel(BuildingEnum.REPAIR_FACTORY);
        for (var i = 0; i < canRepair.length; i++) {
            // this.buildings[canRepair[i].position].level = this.buildings[canRepair[i].position].top;
            this.repairBuilding(canRepair[i].position);
        }
        this.updateAll();
    };
    CityController.prototype.getTopFactory = function () {
        var factory = this.getAllBuildingsByType(BuildingEnum.REPAIR_FACTORY);
        var top = 0;
        for (var i = 0; i < factory.length; i++) {
            if (factory[i].top > top) {
                top = factory[i].top;
            }
        }
        return top;
    };
    /**
     * 获取可修复建筑
     * @param position
     */
    CityController.prototype.getCanRepair = function () {
        var result = this.buildings.filter(function (element) {
            return element.top > element.level;
        });
        return result;
    };
    /**
     * 修复建筑
     * @param position
     */
    CityController.prototype.repairBuilding = function (position) {
        if (position === void 0) { position = null; }
        // 视频点
        if (position === null) {
            position = this.selectPosition;
        }
        if (this.buildings[position].level < this.buildings[position].top) {
            this.buildings[position].level = Math.max(this.buildings[position].level, Math.min(this.getTopFactory(), this.buildings[position].top));
            this.saveCity(position);
        }
    };
    //--------------------------------------------------------广告公司-------------------------------------------------------------------------
    /**
     *
     */
    CityController.prototype.isShowBanner = function () {
        var advertisings = this.getAllBuildingsByType(BuildingEnum.ADVERTISE_COMPANY);
        if (advertisings.length > 0) {
            return true;
        }
        return false;
    };
    //---------------------------------------------------------防空塔-------------------------------------------------
    CityController.prototype.isProtected = function (position) {
        if (CityController.getInstance().getAllBuildingsByType(BuildingEnum.DEFENSE).length <= 0) {
            return false;
        }
        if (position === 0) {
            return true;
        }
        if (this.buildings[NumUtil.circle(6, position)].id === BuildingEnum.DEFENSE) {
            return true;
        }
        ;
        if (this.buildings[NumUtil.circle(6, position + 1)].id === BuildingEnum.DEFENSE) {
            return true;
        }
        ;
        if (this.buildings[NumUtil.circle(6, position - 1)].id === BuildingEnum.DEFENSE) {
            return true;
        }
        return false;
    };
    CityController.prototype.getIsProtected = function () {
        var protectedBuildings = [];
        var defenses = this.getBuildingBlockByType(BuildingEnum.DEFENSE);
        if (defenses.length > 0) {
            protectedBuildings.push(0);
        }
        for (var i = 0; i < defenses.length; i++) {
            ArrayUtil.add(protectedBuildings, NumUtil.circle(6, defenses[i].position + 1));
            ArrayUtil.add(protectedBuildings, NumUtil.circle(6, defenses[i].position));
            ArrayUtil.add(protectedBuildings, NumUtil.circle(6, defenses[i].position - 1));
        }
        return protectedBuildings;
    };
    CityController.prototype.useMissle = function () {
        if (SaveDataManager.getInstance().getUserData().missles > 0) {
            SaveDataManager.getInstance().getUserData().useMissle();
            return true;
        }
        else {
            return false;
        }
    };
    CityController.prototype.buyMissle = function (position) {
        if (position === void 0) { position = null; }
        var missles = 0;
        var defenses = this.getBuildingBlockByType(BuildingEnum.DEFENSE);
        for (var i = 0; i < defenses.length; i++) {
            missles += defenses[i].missle;
        }
        var cost = (missles - SaveDataManager.getInstance().getUserData().missles) * Const.getInstance().missleCost;
        if (GameController.getInstance().costGold(cost)) {
            platform.analytics("buyMissle", { cost: cost });
            SaveDataManager.getInstance().getUserData().missles = missles;
        }
    };
    CityController.instance = null;
    return CityController;
}());
__reflect(CityController.prototype, "CityController");
