/**
 * 
 * 城市讯息
 */
class CityMessageView extends egret.Sprite {

    AIRPORT_RENDER = "airport_render";
    BANK_RENDER = "bank_render";
    BULLET_SCIENCE_RENDER = "bullet_science_render";
    GAS_STATION_RENDER = "gas_station_render";
    INSURE_COMPANY_RENDER = "insure_company_render";
    DEFENSE_RENDER = "defense_render";
    REPAIR_FACTORY_RENDER = "repair_factory_render";
    ADVERTISE_COMPANY_RENDER = "advertise_company_render";
    BANNER_RENDER = "banner_render";
    GROUND_RENDER = "ground_render";
    RANK_RENDER = "rank_render";

    private renderingPhase = 0;
    private viewBg: egret.Bitmap;

    private msgContainer: egret.Sprite;

    private currentRender;

    constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.viewBg = new egret.Bitmap();
        this.viewBg.texture = RES.getRes("msg_png");
        // this.viewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.viewBg);

        this.msgContainer = new egret.Sprite();
        this.addChild(this.msgContainer);
        this.renderHelloMsg();
    }

    private updateView() {

    }

    public renderBanner() {

    }

    public renderBullet(type = 0) {
        let detail = i18n.getInstance().getLanguage("");
        
        switch(type) {

        }
    }

    public renderPosition(buildingData: BuildingBase) {
        console.log(buildingData);
        this.msgContainer.removeChildren();
        if (buildingData.top === 0) {
            this.renderGroundMsg();
            return;
        }

        if (buildingData.level === 0) {
            this.renderDestroyMsg();
            return;
        }
        this.renderBuilding(buildingData.id)
    }

    public renderBuilding(id) {
        switch (id) {
            case BuildingEnum.AIRPORT:
                this.renderAirportMsg();
                break;
            case BuildingEnum.BANK:
                this.renderBankMsg();
                break;

            case BuildingEnum.BULLET_SCIENCE:
                this.renderScience();
                break;

            case BuildingEnum.GAS_STATION:
                this.renderStation();
                break;

            case BuildingEnum.INSURE_COMPANY:
                this.renderCompany();
                break;

            case BuildingEnum.DEFENSE:
                this.renderDefense();
                break;

            case BuildingEnum.REPAIR_FACTORY:
                this.renderFactory();
                break;

            case BuildingEnum.ADVERTISE_COMPANY:
                this.renderAdvertise();
                break;
        }
    }

    private renderDestroyMsg() {

    }

    private renderHelloMsg() {
        this.msgContainer.removeChildren();
        let helloText = new egret.TextField();
        helloText.x = 10;
        helloText.text = "欢迎回来,我想死你了";
        this.msgContainer.addChild(helloText);
    }

    /**
     * 飞机场详细信息
     */
    private renderAirportMsg() {
        if (this.currentRender !== this.AIRPORT_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.AIRPORT_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: AirportData = CityController.getInstance().selectedData as AirportData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                //建筑等级
                let airportLevel = CityController.getInstance().selectedData.level + 1;
                if (airportLevel > 5) {
                    this.renderingPhase++;
                    this.renderAirportMsg();
                    return;
                }
                let data: AirportData = BuildingDataCache.getInstance().getAirportDataByLevel(airportLevel);
                this.renderNextLevelMsg(data);

                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let airportLevel = CityController.getInstance().getTopLevel(BuildingEnum.AIRPORT);
                let data: AirportData = BuildingDataCache.getInstance().getAirportDataByLevel(airportLevel);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }


        }

        let yoursText = new egret.TextField();


    }

    private renderBankMsg() {
        let block = CityController.getInstance().getBuildingBlockByType(BuildingEnum.BANK);
        if (this.currentRender !== this.BANK_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.BANK_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: BankData = CityController.getInstance().selectedData as BankData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let bankLevel = CityController.getInstance().selectedData.level + 1;
                if (bankLevel > 5) {
                    this.renderingPhase++;
                    this.renderBankMsg();
                    return;
                }
                let data: BankData = BuildingDataCache.getInstance().getBankDataByLevel(bankLevel);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let bankLevel = CityController.getInstance().getTopLevel(BuildingEnum.BANK);
                let data: BankData = BuildingDataCache.getInstance().getBankDataByLevel(bankLevel);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderScience() {
        let block = CityController.getInstance().getBuildingBlockByType(BuildingEnum.BANK);
        if (this.currentRender !== this.BULLET_SCIENCE_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.BULLET_SCIENCE_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: BulletScienceData = CityController.getInstance().selectedData as BulletScienceData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderScience();
                    return;
                }
                let data: BulletScienceData = BuildingDataCache.getInstance().getBulletScienceByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let level = CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE);
                let data: BulletScienceData = BuildingDataCache.getInstance().getBulletScienceByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderFactory() {
        if (this.currentRender !== this.REPAIR_FACTORY_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.REPAIR_FACTORY_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: RepairFactoryData = CityController.getInstance().selectedData as RepairFactoryData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderBankMsg();
                    return;
                }
                let data: RepairFactoryData = BuildingDataCache.getInstance().getRepairFactoryByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let level = CityController.getInstance().getTopLevel(BuildingEnum.REPAIR_FACTORY);
                let data: RepairFactoryData = BuildingDataCache.getInstance().getRepairFactoryByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderCompany() {
        if (this.currentRender !== this.INSURE_COMPANY_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.INSURE_COMPANY_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: InsureCompanyData = CityController.getInstance().selectedData as InsureCompanyData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderBankMsg();
                    return;
                }
                let data: InsureCompanyData = BuildingDataCache.getInstance().getInsureCompanyByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let level = CityController.getInstance().getTopLevel(BuildingEnum.INSURE_COMPANY);
                let data: InsureCompanyData = BuildingDataCache.getInstance().getInsureCompanyByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderDefense() {
        if (this.currentRender !== this.DEFENSE_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.DEFENSE_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: DefenseData = CityController.getInstance().selectedData as DefenseData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderDefense();
                    return;
                }
                let data: DefenseData = BuildingDataCache.getInstance().getDefenseByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let level = CityController.getInstance().getTopLevel(BuildingEnum.DEFENSE);
                let data: DefenseData = BuildingDataCache.getInstance().getDefenseByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderStation() {
        if (this.currentRender !== this.GAS_STATION_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.GAS_STATION_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: GasStationData = CityController.getInstance().selectedData as GasStationData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderStation();
                    return;
                }
                let data: GasStationData = BuildingDataCache.getInstance().getGasStationByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let level = CityController.getInstance().getTopLevel(BuildingEnum.GAS_STATION);
                let data: GasStationData = BuildingDataCache.getInstance().getGasStationByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderAdvertise() {
        if (this.currentRender !== this.ADVERTISE_COMPANY_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.ADVERTISE_COMPANY_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            let data: AdvertiseCompanyData = CityController.getInstance().selectedData as AdvertiseCompanyData;
            this.renderCurrentLevelMsg(data);
        } else {
            if (this.renderingPhase === 1) {
                let level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderAdvertise();
                    return;
                }
                let data: AdvertiseCompanyData = BuildingDataCache.getInstance().getAdvertiseByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            } else if (this.renderingPhase === 2) {
                //建筑等级
                let level = CityController.getInstance().getTopLevel(BuildingEnum.ADVERTISE_COMPANY);
                let data: AdvertiseCompanyData = BuildingDataCache.getInstance().getAdvertiseByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    }

    private renderGroundMsg() {
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage("building_ground");
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        // let levelText = new egret.TextField();
        // levelText.text = i18n.getInstance().getLanguage("ui_level") + data.level;
        // levelText.x = 10 + nameText.width + 100;
        // this.msgContainer.addChild(levelText);

        let descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage("desc_ground");
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    }

    private renderCurrentLevelMsg(data) {
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_level") + data.level;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);

        let descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    }

    private renderNextLevelMsg(data) {
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage("ui_next_level") + i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_next_level") + data.level;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);

        let scoreText = new egret.TextField();

        let descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    }

    private renderTopLevelMsg(data) {
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_top_level") + data.level;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);

        let scoreText = new egret.TextField();

        let descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    }

}