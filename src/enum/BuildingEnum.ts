/**
 * 建筑物枚举
 */
module BuildingEnum {
    export var buildingString = [];
    /**
     * 未开发
     */
    export const UNSET = -1;
    /**
     * 飞机场
     */
    export const AIRPORT = 0;
    buildingString[AIRPORT] = "airport";
    /**
     * 银行
     */
    export const BANK = 1;
    buildingString[BANK] = "bank";
    /**
     * 弹药工厂
     */
    export const BULLET_SCIENCE = 2;
    buildingString[BULLET_SCIENCE] = "bullet_science";
    /**
     * 加油站
     */
    export const GAS_STATION = 3;
    buildingString[GAS_STATION] = "gas_station";
    /**
     * 广告
     */
    export const ADVERTISE_COMPANY = 4;
    buildingString[ADVERTISE_COMPANY] = "advertise_company";
    /**
     * 风景
     */
    export const REPAIR_FACTORY = 5;
    buildingString[REPAIR_FACTORY] = "repair_factory";
    /**
     * 保险公司
     */
    export const INSURE_COMPANY = 6;
    buildingString[INSURE_COMPANY] = "insure_company";
    /**
     * 防空塔
     */
    export const DEFENSE = 7;
    buildingString[DEFENSE] = "defense";

    /**
        * 防空塔
        */
    export const STRATEGY_CENTER = 8;
    buildingString[STRATEGY_CENTER] = "strategy_center";

    export const count = 8;


}