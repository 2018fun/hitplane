/**
 * 
 */
class BuildingDataCache {

    public static instance = null;
    private airportData = [null];
    private bankData = [null];
    private scienceData = [null];
    private gasStationData = [null];
    private repairFactoryData = [null];
    private insureCompanyData = [null];
    private defenseData = [null];
    private advertiseData = [null];

    constructor() {
        this.intiData();
    }

    public static getInstance(): BuildingDataCache {
        if (this.instance === null) {
            this.instance = new BuildingDataCache();
        }
        return this.instance;
    }

    private intiData() {
        this.parseData(RES.getRes("building_json"));
    }

    private parseData(buildingData) {
        for (let key in buildingData) {
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
                    console.log("new building has no parse")
                    break;

            }
        }
    }


    private parseAirport(airportDatas: Array<any>) {
        let airport: AirportData;
        for (let i = 0; i < airportDatas.length; i++) {
            airport = new AirportData(airportDatas[i]);
            this.airportData.push(airport);
        }
    }

    private parseBank(bankDatas: Array<any>) {
        let bank: BankData;
        for (let i = 0; i < bankDatas.length; i++) {
            bank = new BankData(bankDatas[i]);
            this.bankData.push(bank);
        }
    }

    private parseBulletScience(bsDatas: Array<any>) {
        let bullet_science: BulletScienceData;
        for (let i = 0; i < bsDatas.length; i++) {
            bullet_science = new BulletScienceData(bsDatas[i]);
            this.scienceData.push(bullet_science);
        }
    }


    private parseGasStatision(bsDatas: Array<any>) {
        let gas_station: GasStationData;
        for (let i = 0; i < bsDatas.length; i++) {
            gas_station = new GasStationData(bsDatas[i]);
            this.gasStationData.push(gas_station);
        }
    }

    private parseRepairFactory(rfDatas: Array<any>) {
        let repair_factory: RepairFactoryData;
        for (let i = 0; i < rfDatas.length; i++) {
            repair_factory = new RepairFactoryData(rfDatas[i]);
            this.repairFactoryData.push(repair_factory);
        }
    }

    private parseInsureCompany(icDatas: Array<any>) {
        let insure_company: InsureCompanyData;
        for (let i = 0; i < icDatas.length; i++) {
            insure_company = new InsureCompanyData(icDatas[i]);
            this.insureCompanyData.push(insure_company);
        }
    }

    private parseDefense(defenseData: Array<any>) {
        let defense: DefenseData;
        for (let i = 0; i < defenseData.length; i++) {
            defense = new DefenseData(defenseData[i]);
            this.defenseData.push(defense);
        }
    }

    private parseAdvertise(data: Array<any>) {
        let advertise: AdvertiseCompanyData;
        for (let i = 0; i < data.length; i++) {
            advertise = new AdvertiseCompanyData(data[i]);
            this.advertiseData.push(advertise);
        }
    }

    public getBuildingByIdAndLevel(id, level): BuildingBase {
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
        } else {
            return new BuildingBase();
        }
    }

    public getAirportDataByLevel(level) {
        return new AirportData(this.airportData[level]);
    }

    public getBankDataByLevel(level) {
        return new BankData(this.bankData[level]);
    }

    public getBulletScienceByLevel(level) {
        return new BulletScienceData(this.scienceData[level]);
    }

    public getGasStationByLevel(level) {
        return new GasStationData(this.gasStationData[level]);
    }

    public getRepairFactoryByLevel(level) {
        return new RepairFactoryData(this.repairFactoryData[level]);
    }

    public getInsureCompanyByLevel(level) {
        return new InsureCompanyData(this.insureCompanyData[level]);
    }

    public getDefenseByLevel(level) {
        return new DefenseData(this.defenseData[level]);
    }

    public getAdvertiseByLevel(level) {
        return new AdvertiseCompanyData(this.advertiseData[level]);
    }
}