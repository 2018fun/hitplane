/**
 * 建筑物枚举
 */
var BuildingEnum;
(function (BuildingEnum) {
    BuildingEnum.buildingString = [];
    /**
     * 未开发
     */
    BuildingEnum.UNSET = -1;
    /**
     * 飞机场
     */
    BuildingEnum.AIRPORT = 0;
    BuildingEnum.buildingString[BuildingEnum.AIRPORT] = "airport";
    /**
     * 银行
     */
    BuildingEnum.BANK = 1;
    BuildingEnum.buildingString[BuildingEnum.BANK] = "bank";
    /**
     * 弹药工厂
     */
    BuildingEnum.BULLET_SCIENCE = 2;
    BuildingEnum.buildingString[BuildingEnum.BULLET_SCIENCE] = "bullet_science";
    /**
     * 加油站
     */
    BuildingEnum.GAS_STATION = 3;
    BuildingEnum.buildingString[BuildingEnum.GAS_STATION] = "gas_station";
    /**
     * 广告
     */
    BuildingEnum.ADVERTISE_COMPANY = 4;
    BuildingEnum.buildingString[BuildingEnum.ADVERTISE_COMPANY] = "advertise_company";
    /**
     * 风景
     */
    BuildingEnum.REPAIR_FACTORY = 5;
    BuildingEnum.buildingString[BuildingEnum.REPAIR_FACTORY] = "repair_factory";
    /**
     * 保险公司
     */
    BuildingEnum.INSURE_COMPANY = 6;
    BuildingEnum.buildingString[BuildingEnum.INSURE_COMPANY] = "insure_company";
    /**
     * 防空塔
     */
    BuildingEnum.DEFENSE = 7;
    BuildingEnum.buildingString[BuildingEnum.DEFENSE] = "defense";
    /**
        * 防空塔
        */
    BuildingEnum.STRATEGY_CENTER = 8;
    BuildingEnum.buildingString[BuildingEnum.STRATEGY_CENTER] = "strategy_center";
    BuildingEnum.count = 8;
})(BuildingEnum || (BuildingEnum = {}));
