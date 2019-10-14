var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var BuildingDataCache = (function () {
    function BuildingDataCache() {
        this.airportData = [null];
        this.bankData = [null];
        this.scienceData = [null];
        this.gasStationData = [null];
        this.repairFactoryData = [null];
        this.insureCompanyData = [null];
        this.defenseData = [null];
        this.advertiseData = [null];
        this.intiData();
    }
    BuildingDataCache.getInstance = function () {
        if (this.instance === null) {
            this.instance = new BuildingDataCache();
        }
        return this.instance;
    };
    BuildingDataCache.prototype.intiData = function () {
        this.parseData(RES.getRes("building_json"));
    };
    BuildingDataCache.prototype.parseData = function (buildingData) {
        for (var key in buildingData) {
            switch (key) {
                case BuildingEnum.buildingString[BuildingEnum.AIRPORT]:
                    this.parseAirport(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.BANK]:
                    this.parseBank(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.BULLET_SCIENCE]:
                    this.parseBulletScience(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.GAS_STATION]:
                    this.parseGasStatision(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.REPAIR_FACTORY]:
                    this.parseRepairFactory(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.INSURE_COMPANY]:
                    this.parseInsureCompany(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.DEFENSE]:
                    this.parseDefense(buildingData[key]);
                    break;
                case BuildingEnum.buildingString[BuildingEnum.ADVERTISE_COMPANY]:
                    this.parseAdvertise(buildingData[key]);
                    break;
                default:
                    console.log("new building has no parse");
                    break;
            }
        }
    };
    BuildingDataCache.prototype.parseAirport = function (airportDatas) {
        var airport;
        for (var i = 0; i < airportDatas.length; i++) {
            airport = new AirportData(airportDatas[i]);
            this.airportData.push(airport);
        }
    };
    BuildingDataCache.prototype.parseBank = function (bankDatas) {
        var bank;
        for (var i = 0; i < bankDatas.length; i++) {
            bank = new BankData(bankDatas[i]);
            this.bankData.push(bank);
        }
    };
    BuildingDataCache.prototype.parseBulletScience = function (bsDatas) {
        var bullet_science;
        for (var i = 0; i < bsDatas.length; i++) {
            bullet_science = new BulletScienceData(bsDatas[i]);
            this.scienceData.push(bullet_science);
        }
    };
    BuildingDataCache.prototype.parseGasStatision = function (bsDatas) {
        var gas_station;
        for (var i = 0; i < bsDatas.length; i++) {
            gas_station = new GasStationData(bsDatas[i]);
            this.gasStationData.push(gas_station);
        }
    };
    BuildingDataCache.prototype.parseRepairFactory = function (rfDatas) {
        var repair_factory;
        for (var i = 0; i < rfDatas.length; i++) {
            repair_factory = new RepairFactoryData(rfDatas[i]);
            this.repairFactoryData.push(repair_factory);
        }
    };
    BuildingDataCache.prototype.parseInsureCompany = function (icDatas) {
        var insure_company;
        for (var i = 0; i < icDatas.length; i++) {
            insure_company = new InsureCompanyData(icDatas[i]);
            this.insureCompanyData.push(insure_company);
        }
    };
    BuildingDataCache.prototype.parseDefense = function (defenseData) {
        var defense;
        for (var i = 0; i < defenseData.length; i++) {
            defense = new DefenseData(defenseData[i]);
            this.defenseData.push(defense);
        }
    };
    BuildingDataCache.prototype.parseAdvertise = function (data) {
        var advertise;
        for (var i = 0; i < data.length; i++) {
            advertise = new AdvertiseCompanyData(data[i]);
            this.advertiseData.push(advertise);
        }
    };
    BuildingDataCache.prototype.getBuildingByIdAndLevel = function (id, level) {
        if (level > 0 && level < 6) {
            switch (id) {
                case BuildingEnum.AIRPORT:
                    return this.getAirportDataByLevel(level);
                case BuildingEnum.BANK:
                    return this.getBankDataByLevel(level);
                case BuildingEnum.BULLET_SCIENCE:
                    return this.getBulletScienceByLevel(level);
                case BuildingEnum.GAS_STATION:
                    return this.getGasStationByLevel(level);
                case BuildingEnum.REPAIR_FACTORY:
                    return this.getRepairFactoryByLevel(level);
                case BuildingEnum.INSURE_COMPANY:
                    return this.getInsureCompanyByLevel(level);
                case BuildingEnum.DEFENSE:
                    return this.getDefenseByLevel(level);
                case BuildingEnum.ADVERTISE_COMPANY:
                    return this.getAdvertiseByLevel(level);
                default:
                    return new BuildingBase();
            }
        }
        else {
            return new BuildingBase();
        }
    };
    BuildingDataCache.prototype.getAirportDataByLevel = function (level) {
        return new AirportData(this.airportData[level]);
    };
    BuildingDataCache.prototype.getBankDataByLevel = function (level) {
        return new BankData(this.bankData[level]);
    };
    BuildingDataCache.prototype.getBulletScienceByLevel = function (level) {
        return new BulletScienceData(this.scienceData[level]);
    };
    BuildingDataCache.prototype.getGasStationByLevel = function (level) {
        return new GasStationData(this.gasStationData[level]);
    };
    BuildingDataCache.prototype.getRepairFactoryByLevel = function (level) {
        return new RepairFactoryData(this.repairFactoryData[level]);
    };
    BuildingDataCache.prototype.getInsureCompanyByLevel = function (level) {
        return new InsureCompanyData(this.insureCompanyData[level]);
    };
    BuildingDataCache.prototype.getDefenseByLevel = function (level) {
        return new DefenseData(this.defenseData[level]);
    };
    BuildingDataCache.prototype.getAdvertiseByLevel = function (level) {
        return new AdvertiseCompanyData(this.advertiseData[level]);
    };
    BuildingDataCache.instance = null;
    return BuildingDataCache;
}());
__reflect(BuildingDataCache.prototype, "BuildingDataCache");
