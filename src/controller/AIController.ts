/**
 * 玩家练习
 * 随机地图
 * creat by tishoy
 * 2019.4.12
 */
class AIController {
    private static instance: AIController = null;

    private randomMapData: MapData;
    private random: boolean = true;

    constructor() {
        if (AIController.instance) {
            throw new Error("AIController singlon error")
        }
        this.init();
    }

    private init() {
        this.randomMapData = new MapData();
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new AIController();
        }
        return this.instance;
    }

    async clear() {
        await this.randomMapData.clear();
    }

    public generateRandomMap() {
        this.clear();
        while (this.randomMapData.numPlane < 3) {
            this.addPlane();
        }
        return this.randomMapData;
    }

    public addPlane(): void {
        var direction: number = 0;
        var headColumn: number = 0;
        var headRow: number = 0;

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
        } else {

        }
        if (this.randomMapData.setPlaneGrid(headColumn, headRow, direction)) {
            this.randomMapData.numPlane++;
        } else {
            this.randomMapData.clear();
        }
    }

    public getGridTypeById(id): number {
        return this.randomMapData.map[id].gridType;
    }

    public randomOpponent() {
        let airport_level = CityController.getInstance().getTopLevel(BuildingEnum.AIRPORT);
        if (airport_level === 1) {
            return [1, 1, 1];
        }
        let data = BuildingDataCache.getInstance().getAirportDataByLevel(airport_level);
        let opponents = [];
        let op_level;
        for (let i = 0; i < data.opponent; i++) {
            let rand = NumUtil.range(1, 7);
            op_level = 1;
            if (rand > 5) {
                op_level = data.opponent_level;
            } else if (rand > 3) {
                op_level = data.opponent_level - 1;
            } else if (rand > 0) {
                op_level = data.opponent_level - 2;

            }
            opponents.push(op_level);
        }
        return opponents;
    }


    public calOffline() {
        let lastDate = SaveDataManager.getInstance().getUserData().lastDate;
        let offlineData = { time: lastDate, missleUse: 0 };
        let now = new Date().getTime();
        let offLineTime = now - lastDate;
        offlineData["time"] = offLineTime;
        let hours = Math.floor((offLineTime) / GameConst.HOUR);
        let minutes = Math.floor(offLineTime / GameConst.MINUTE);
        let gas_speed = CityController.getInstance().getGasSpeed();
        let gas_before = SaveDataManager.getInstance().getUserData().gas;
        let gas_current = Math.min(gas_before, CityController.getInstance().getGasStationMax());
        let destroyTimes = 0;
        let paid = 0;
        if (offLineTime < 2 * GameConst.HOUR) {
            // 不满足两小时的 按分钟计算体力;
            gas_current = Math.min(gas_before + gas_speed * minutes / 60, CityController.getInstance().getGasStationMax())
        } else {
            // 按小时计算体力
            gas_current = Math.min(gas_before + gas_speed * 2, CityController.getInstance().getGasStationMax());
            // 建筑摧毁
            /** 
            for (let i = 0; i < hours - 3; i++) {
                //用户计算拆毁后数据
                let destroy_building = this.randomDestroy();
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

                    //计算保险
                    paid += CityController.getInstance().calBuildingInsurePay(destroy_building.data.position);

                    continue;
                } else {

                    break;
                }

            }
            */
        }

        // 奖励保险赔付
        // GameController.getInstance().addGold(paid);
        // SceneManager.getInstance().showTip("保险赔付金额" + paid);


        if (new Date(lastDate).getDate() === new Date(now).getDate()) {
            SaveDataManager.getInstance().getUserData().setDestroyTimes(destroyTimes, false);
        } else {
            SaveDataManager.getInstance().getUserData().setDestroyTimes(destroyTimes, true);
        }

        GameController.getInstance().addGas(gas_current - gas_before);

        // if () {

        // }
        platform.analytics("offReward", { paid: paid, amount: offlineData["missleUse"], destroyTimes: destroyTimes, name: "tishoy", gas: gas_current - gas_before, time: offlineData["time"] });

        console.log(offlineData);

        //清除超期的分享地图
        let maps = SaveDataManager.getInstance().getUserData().getSharedMap();
        for (let i = maps.length - 1; i >= 0; i--) {
            if (maps[i].date === undefined || maps[i].date - now > 3 * GameConst.DAY) {
                SaveDataManager.getInstance().getUserData().deleteShareMap(i);
            }
            
        }

        SaveDataManager.getInstance().getUserData().setLastDate();
        // if () {

        // }
    }

    public randomDestroy() {
        let buildings = CityController.getInstance().getBuildings();
        let levelAbove0 = buildings.filter((element) => {
            return element.level > 0;
        });
        if (levelAbove0.length === 0) {
            return { id: BuildingEnum.UNSET, data: null };
        }
        let buildingData = levelAbove0[Math.floor(Math.random() * levelAbove0.length)];
        return { id: buildingData.id, data: buildingData };
    }

    public addPlaneByBody(gridId) {
        let data = null;
        console.log("generate_time" + new Date().getTime());
        do {
            data = this.generateRandomMap()
        } while (data.map[gridId].gridType !== GridTypeEnum.BODY);
        console.log("generate_time2" + new Date().getTime());
        if (data !== null) {
            GameController.getInstance().setAwayGame(data);
        } else {
            console.log("引导地图生产错误")
        }

    }

    /**
     * 打飞机的策略 
     * 提示
     */
    public AIPlayGame() {
        Math.random() * 5;
    }

}