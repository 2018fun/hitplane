var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 玩家练习
 * 随机地图
 * creat by tishoy
 * 2019.4.12
 */
var AIController = (function () {
    function AIController() {
        this.random = true;
        if (AIController.instance) {
            throw new Error("AIController singlon error");
        }
        this.init();
    }
    AIController.prototype.init = function () {
        this.randomMapData = new MapData();
    };
    AIController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new AIController();
        }
        return this.instance;
    };
    AIController.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.randomMapData.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AIController.prototype.generateRandomMap = function () {
        this.clear();
        while (this.randomMapData.numPlane < 3) {
            this.addPlane();
        }
        return this.randomMapData;
    };
    AIController.prototype.addPlane = function () {
        var direction = 0;
        var headColumn = 0;
        var headRow = 0;
        if (this.random) {
            direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case DirectionTypeEnum.UP:
                    headColumn = 2 + Math.floor(Math.random() * 5);
                    headRow = Math.floor(Math.random() * 6);
                    break;
                case DirectionTypeEnum.RIGHT:
                    headColumn = 3 + Math.floor(Math.random() * 6);
                    headRow = 2 + Math.floor(Math.random() * 5);
                    break;
                case DirectionTypeEnum.DOWN:
                    headColumn = 2 + Math.floor(Math.random() * 5);
                    headRow = 3 + Math.floor(Math.random() * 6);
                    break;
                case DirectionTypeEnum.LEFT:
                    headColumn = Math.floor(Math.random() * 6);
                    headRow = 2 + Math.floor(Math.random() * 5);
                    break;
            }
            //处理特殊情况，无法放置三架飞机的情况！！！
        }
        else {
        }
        if (this.randomMapData.setPlaneGrid(headColumn, headRow, direction)) {
            this.randomMapData.numPlane++;
        }
        else {
            this.randomMapData.clear();
        }
    };
    AIController.prototype.getGridTypeById = function (id) {
        return this.randomMapData.map[id].gridType;
    };
    AIController.prototype.randomOpponent = function () {
        var airport_level = CityController.getInstance().getTopLevel(BuildingEnum.AIRPORT);
        if (airport_level === 1) {
            return [1, 1, 1];
        }
        var data = BuildingDataCache.getInstance().getAirportDataByLevel(airport_level);
        var opponents = [];
        var op_level;
        for (var i = 0; i < data.opponent; i++) {
            var rand = NumUtil.range(1, 7);
            op_level = 1;
            if (rand > 5) {
                op_level = data.opponent_level;
            }
            else if (rand > 3) {
                op_level = data.opponent_level - 1;
            }
            else if (rand > 0) {
                op_level = data.opponent_level - 2;
            }
            opponents.push(op_level);
        }
        return opponents;
    };
    AIController.prototype.calOffline = function () {
        var lastDate = SaveDataManager.getInstance().getUserData().lastDate;
        var offlineData = { time: lastDate, missleUse: 0 };
        var now = new Date().getTime();
        var offLineTime = now - lastDate;
        offlineData["time"] = offLineTime;
        var hours = Math.floor((offLineTime) / GameConst.HOUR);
        var minutes = Math.floor(offLineTime / GameConst.MINUTE);
        var gas_speed = CityController.getInstance().getGasSpeed();
        var gas_before = SaveDataManager.getInstance().getUserData().gas;
        var gas_current = Math.min(gas_before, CityController.getInstance().getGasStationMax());
        var destroyTimes = 0;
        var paid = 0;
        if (offLineTime < 2 * GameConst.HOUR) {
            // 不满足两小时的 按分钟计算体力;
            gas_current = Math.min(gas_before + gas_speed * minutes / 60, CityController.getInstance().getGasStationMax());
        }
        else {
            // 按小时计算体力
            gas_current = Math.min(gas_before + gas_speed * 2, CityController.getInstance().getGasStationMax());
            // 建筑摧毁
            for (var i = 0; i < hours - 3; i++) {
                //用户计算拆毁后数据
                var destroy_building = this.randomDestroy();
                if (destroy_building.id !== BuildingEnum.UNSET) {
                    if (destroy_building.id === BuildingEnum.AIRPORT && destroy_building.data.level === 1) {
                        return;
                    }
                    if (CityController.getInstance().isProtected(destroy_building.data.position) && CityController.getInstance().useMissle()) {
                        offlineData["missleUse"]++;
                        return;
                    }
                    destroyTimes++;
                    if (destroy_building.id === BuildingEnum.GAS_STATION) {
                        gas_speed = CityController.getInstance().getGasSpeed();
                    }
                    gas_current = Math.min(gas_before + gas_speed, CityController.getInstance().getGasStationMax());
                    //实际进行拆毁
                    CityController.getInstance().destroyCity(destroy_building.data.position);
                    /**
                     * 计算保险
                     */
                    paid += CityController.getInstance().calBuildingInsurePay(destroy_building.data.position);
                    continue;
                }
                else {
                    break;
                }
            }
        }
        // 奖励保险赔付
        GameController.getInstance().addGold(paid);
        SceneManager.getInstance().showTip("保险赔付金额" + paid);
        if (new Date(lastDate).getDate() === new Date(now).getDate()) {
            SaveDataManager.getInstance().getUserData().setDestroyTimes(destroyTimes, false);
        }
        else {
            SaveDataManager.getInstance().getUserData().setDestroyTimes(destroyTimes, true);
        }
        GameController.getInstance().addGas(gas_current - gas_before);
        // if () {
        // }
        platform.analytics("offReward", { paid: paid, amount: offlineData["missleUse"], destroyTimes: destroyTimes, name: "tishoy", gas: gas_current - gas_before, time: offlineData["time"] });
        console.log(offlineData);
        //清除超期的分享地图
        var maps = SaveDataManager.getInstance().getUserData().getSharedMap();
        for (var i = maps.length - 1; i >= 0; i--) {
            if (maps[i].date === undefined || maps[i].date - now > 3 * GameConst.DAY) {
                SaveDataManager.getInstance().getUserData().deleteShareMap(i);
            }
        }
        SaveDataManager.getInstance().getUserData().setLastDate();
        // if () {
        // }
    };
    AIController.prototype.randomDestroy = function () {
        var buildings = CityController.getInstance().getBuildings();
        var levelAbove0 = buildings.filter(function (element) {
            return element.level > 0;
        });
        if (levelAbove0.length === 0) {
            return { id: BuildingEnum.UNSET, data: null };
        }
        var buildingData = levelAbove0[Math.floor(Math.random() * levelAbove0.length)];
        return { id: buildingData.id, data: buildingData };
    };
    AIController.prototype.addPlaneByBody = function (gridId) {
        var data = null;
        console.log("generate_time" + new Date().getTime());
        do {
            data = this.generateRandomMap();
        } while (data.map[gridId].gridType !== GridTypeEnum.BODY);
        console.log("generate_time2" + new Date().getTime());
        if (data !== null) {
            GameController.getInstance().setAwayGame(data);
        }
        else {
            console.log("引导地图生产错误");
        }
    };
    /**
     * 打飞机的策略
     * 提示
     */
    AIController.prototype.AIPlayGame = function () {
        Math.random() * 5;
    };
    AIController.instance = null;
    return AIController;
}());
__reflect(AIController.prototype, "AIController");
