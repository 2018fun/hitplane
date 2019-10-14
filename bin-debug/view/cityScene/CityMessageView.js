var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * 城市讯息
 */
var CityMessageView = (function (_super) {
    __extends(CityMessageView, _super);
    function CityMessageView() {
        var _this = _super.call(this) || this;
        _this.AIRPORT_RENDER = "airport_render";
        _this.BANK_RENDER = "bank_render";
        _this.BULLET_SCIENCE_RENDER = "bullet_science_render";
        _this.GAS_STATION_RENDER = "gas_station_render";
        _this.INSURE_COMPANY_RENDER = "insure_company_render";
        _this.DEFENSE_RENDER = "defense_render";
        _this.REPAIR_FACTORY_RENDER = "repair_factory_render";
        _this.ADVERTISE_COMPANY_RENDER = "advertise_company_render";
        _this.BANNER_RENDER = "banner_render";
        _this.GROUND_RENDER = "ground_render";
        _this.RANK_RENDER = "rank_render";
        _this.renderingPhase = 0;
        _this.initView();
        return _this;
    }
    CityMessageView.prototype.initView = function () {
        this.viewBg = new egret.Bitmap();
        this.viewBg.texture = RES.getRes("msg_png");
        // this.viewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.viewBg);
        this.msgContainer = new egret.Sprite();
        this.addChild(this.msgContainer);
        this.renderHelloMsg();
    };
    CityMessageView.prototype.updateView = function () {
    };
    CityMessageView.prototype.renderBanner = function () {
    };
    CityMessageView.prototype.renderBullet = function (type) {
        if (type === void 0) { type = 0; }
        var detail = i18n.getInstance().getLanguage("");
        switch (type) {
        }
    };
    CityMessageView.prototype.renderPosition = function (buildingData) {
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
        this.renderBuilding(buildingData.id);
    };
    CityMessageView.prototype.renderBuilding = function (id) {
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
    };
    CityMessageView.prototype.renderDestroyMsg = function () {
    };
    CityMessageView.prototype.renderHelloMsg = function () {
        this.msgContainer.removeChildren();
        var helloText = new egret.TextField();
        helloText.x = 10;
        helloText.text = "欢迎回来,我想死你了";
        this.msgContainer.addChild(helloText);
    };
    /**
     * 飞机场详细信息
     */
    CityMessageView.prototype.renderAirportMsg = function () {
        if (this.currentRender !== this.AIRPORT_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.AIRPORT_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                //建筑等级
                var airportLevel = CityController.getInstance().selectedData.level + 1;
                if (airportLevel > 5) {
                    this.renderingPhase++;
                    this.renderAirportMsg();
                    return;
                }
                var data = BuildingDataCache.getInstance().getAirportDataByLevel(airportLevel);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var airportLevel = CityController.getInstance().getTopLevel(BuildingEnum.AIRPORT);
                var data = BuildingDataCache.getInstance().getAirportDataByLevel(airportLevel);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
        var yoursText = new egret.TextField();
    };
    CityMessageView.prototype.renderBankMsg = function () {
        var block = CityController.getInstance().getBuildingBlockByType(BuildingEnum.BANK);
        if (this.currentRender !== this.BANK_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.BANK_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var bankLevel = CityController.getInstance().selectedData.level + 1;
                if (bankLevel > 5) {
                    this.renderingPhase++;
                    this.renderBankMsg();
                    return;
                }
                var data = BuildingDataCache.getInstance().getBankDataByLevel(bankLevel);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var bankLevel = CityController.getInstance().getTopLevel(BuildingEnum.BANK);
                var data = BuildingDataCache.getInstance().getBankDataByLevel(bankLevel);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderScience = function () {
        var block = CityController.getInstance().getBuildingBlockByType(BuildingEnum.BANK);
        if (this.currentRender !== this.BULLET_SCIENCE_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.BULLET_SCIENCE_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderScience();
                    return;
                }
                var data = BuildingDataCache.getInstance().getBulletScienceByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var level = CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE);
                var data = BuildingDataCache.getInstance().getBulletScienceByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderFactory = function () {
        if (this.currentRender !== this.REPAIR_FACTORY_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.REPAIR_FACTORY_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderBankMsg();
                    return;
                }
                var data = BuildingDataCache.getInstance().getRepairFactoryByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var level = CityController.getInstance().getTopLevel(BuildingEnum.REPAIR_FACTORY);
                var data = BuildingDataCache.getInstance().getRepairFactoryByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderCompany = function () {
        if (this.currentRender !== this.INSURE_COMPANY_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.INSURE_COMPANY_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderBankMsg();
                    return;
                }
                var data = BuildingDataCache.getInstance().getInsureCompanyByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var level = CityController.getInstance().getTopLevel(BuildingEnum.INSURE_COMPANY);
                var data = BuildingDataCache.getInstance().getInsureCompanyByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderDefense = function () {
        if (this.currentRender !== this.DEFENSE_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.DEFENSE_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderDefense();
                    return;
                }
                var data = BuildingDataCache.getInstance().getDefenseByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var level = CityController.getInstance().getTopLevel(BuildingEnum.DEFENSE);
                var data = BuildingDataCache.getInstance().getDefenseByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderStation = function () {
        if (this.currentRender !== this.GAS_STATION_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.GAS_STATION_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderStation();
                    return;
                }
                var data = BuildingDataCache.getInstance().getGasStationByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var level = CityController.getInstance().getTopLevel(BuildingEnum.GAS_STATION);
                var data = BuildingDataCache.getInstance().getGasStationByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderAdvertise = function () {
        if (this.currentRender !== this.ADVERTISE_COMPANY_RENDER || this.renderingPhase === 0) {
            this.currentRender = this.ADVERTISE_COMPANY_RENDER;
            this.renderingPhase = 1;
            //建筑等级
            var data = CityController.getInstance().selectedData;
            this.renderCurrentLevelMsg(data);
        }
        else {
            if (this.renderingPhase === 1) {
                var level = CityController.getInstance().selectedData.level + 1;
                if (level > 5) {
                    this.renderingPhase++;
                    this.renderAdvertise();
                    return;
                }
                var data = BuildingDataCache.getInstance().getAdvertiseByLevel(level);
                this.renderNextLevelMsg(data);
                this.renderingPhase++;
            }
            else if (this.renderingPhase === 2) {
                //建筑等级
                var level = CityController.getInstance().getTopLevel(BuildingEnum.ADVERTISE_COMPANY);
                var data = BuildingDataCache.getInstance().getAdvertiseByLevel(level);
                this.renderTopLevelMsg(data);
                this.renderingPhase = 0;
            }
        }
    };
    CityMessageView.prototype.renderGroundMsg = function () {
        var nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage("building_ground");
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        // let levelText = new egret.TextField();
        // levelText.text = i18n.getInstance().getLanguage("ui_level") + data.level;
        // levelText.x = 10 + nameText.width + 100;
        // this.msgContainer.addChild(levelText);
        var descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage("desc_ground");
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    };
    CityMessageView.prototype.renderCurrentLevelMsg = function (data) {
        var nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        var levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_level") + data.level;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);
        var descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    };
    CityMessageView.prototype.renderNextLevelMsg = function (data) {
        var nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage("ui_next_level") + i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        var levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_next_level") + data.level;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);
        var scoreText = new egret.TextField();
        var descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    };
    CityMessageView.prototype.renderTopLevelMsg = function (data) {
        var nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        var levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_top_level") + data.level;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);
        var scoreText = new egret.TextField();
        var descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);
    };
    return CityMessageView;
}(egret.Sprite));
__reflect(CityMessageView.prototype, "CityMessageView");
