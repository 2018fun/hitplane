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
 */
var CompanyControlView = (function (_super) {
    __extends(CompanyControlView, _super);
    function CompanyControlView() {
        var _this = _super.call(this) || this;
        _this.INIT_STATUS = 0;
        _this.INSURE_STATUS = 1;
        _this.INFO_STATUS = 2;
        _this.UNINSURE_STATUS = 3;
        _this.initInsure();
        return _this;
    }
    CompanyControlView.prototype.initInsure = function () {
        this.status = this.INIT_STATUS;
        this.demolishButton.visible = false;
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);
        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);
        this.saftyRatioText = new egret.TextField();
        this.saftyRatioText.text = "城市安全评估:" + CityController.getInstance().getCitySaftyRatio().toString();
        this.saftyRatioText.x = 0;
        this.saftyRatioText.y = 50;
        this.addChild(this.saftyRatioText);
        this.insureTimesText = new egret.TextField();
        this.insureTimesText.text = "还可投保建筑数" + CityController.getInstance().selectedData.building;
        this.insureTimesText.x = 350;
        this.insureTimesText.y = 50;
        this.addChild(this.insureTimesText);
        this.buyButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onShowBuldingList);
        this.buyButton.scale(0.5, 0.5);
        this.buyButton.setButtonText(i18n.getInstance().getLanguage("ui_buy_insure"));
        this.buyButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.buyButton.y = 200;
        this.addChild(this.buyButton);
        this.cancelButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onShowInsuredBuilding);
        this.cancelButton.scale(0.5, 0.5);
        this.cancelButton.setButtonText(i18n.getInstance().getLanguage("ui_uninsure"));
        this.cancelButton.x = AdaptSceenUtil.curWidth() - 4 * this.buyButton.width - 40;
        this.cancelButton.y = 200;
        this.addChild(this.cancelButton);
        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();
        this.scrollView.x = 0;
        this.scrollView.width = AdaptSceenUtil.curWidth();
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.addChild(this.scrollView);
        this.updateView();
    };
    CompanyControlView.prototype.updateView = function () {
        if (this.status === this.INSURE_STATUS) {
            this.scrollView.visible = true;
            this.backButton.visible = true;
            this.levelUpButton.visible = false;
            this.demolishButton.visible = false;
            this.buyButton.visible = false;
            this.cancelButton.visible = false;
            this.repairButton.visible = false;
        }
        else if (this.status === this.INIT_STATUS) {
            this.scrollView.visible = false;
            this.backButton.visible = false;
            this.levelUpButton.visible = true;
            this.demolishButton.visible = true;
            this.buyButton.visible = true;
            this.cancelButton.visible = true;
            if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
                this.repairButton.visible = true;
            }
            else {
                this.repairButton.visible = false;
            }
        }
        else if (this.status === this.INFO_STATUS) {
        }
    };
    CompanyControlView.prototype.onBackButtonTouched = function () {
        this.status = this.INIT_STATUS;
        this.updateView();
    };
    CompanyControlView.prototype.onShowBuldingList = function (e) {
        this.status = this.INSURE_STATUS;
        this.buildingList = [];
        var buildingMiniView;
        var building;
        for (var i = 0; i < CityController.getInstance().getBuildings().length; i++) {
            if (CityController.getInstance().getBuildings()[i].level === 0) {
                continue;
            }
            building = CityController.getInstance().getBuildings()[i];
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.position = i;
            buildingMiniView.name = i18n.getInstance().getLanguage(building.name);
            buildingMiniView.level = building.level;
            buildingMiniView.view = building.view;
            buildingMiniView.x = 200 * this.buildingList.length;
            this.buildingList.push(buildingMiniView);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBuildingInsure, this);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.setContent(this.buildingContainer);
        this.updateView();
    };
    CompanyControlView.prototype.onBuyBuildingInsure = function (e) {
        var building = e.target;
        console.log(building);
        CityController.getInstance().buyInsure(building.position);
    };
    CompanyControlView.prototype.onShowInsuredBuilding = function (e) {
        this.status = this.INSURE_STATUS;
        this.buildingList = [];
        var buildingMiniView;
        var buildings = CityController.getInstance().getBuildings();
        for (var i = 0; i < buildings.length; i++) {
            if (buildings[i].level === 0 || buildings[i].insure.length === 0) {
                continue;
            }
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.touchChildren = false;
            buildingMiniView.name = i18n.getInstance().getLanguage(buildings[i].name);
            buildingMiniView.position = i;
            buildingMiniView.level = buildings[i].level;
            buildingMiniView.x = 200 * this.buildingList.length;
            buildingMiniView.view = buildings[i].view;
            this.buildingList.push(buildingMiniView);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuildingUninsure, this);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.setContent(this.buildingContainer);
        this.updateView();
    };
    CompanyControlView.prototype.onBuildingUninsure = function (e) {
        var building = e.target;
        CityController.getInstance().unInsure(building.position);
    };
    return CompanyControlView;
}(BuildingControlView));
__reflect(CompanyControlView.prototype, "CompanyControlView");
