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
var FactoryControlView = (function (_super) {
    __extends(FactoryControlView, _super);
    function FactoryControlView() {
        var _this = _super.call(this) || this;
        _this.initFactoryView();
        return _this;
    }
    FactoryControlView.prototype.initFactoryView = function () {
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);
        if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
            this.repairButton.visible = true;
        }
        this.repairAllButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.repairAllBuilding);
        this.repairAllButton.scale(0.5, 0.5);
        this.repairAllButton.setButtonText(i18n.getInstance().getLanguage("ui_repair_all"));
        this.repairAllButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.repairAllButton.y = 200;
        this.addChild(this.repairAllButton);
        return;
        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();
        this.buildingList = new Array();
        var buildingMiniView;
        for (var i = 0; i < CityController.getInstance().getBuildings().length; i++) {
            if (CityController.getInstance().getBuildings()[i].level === 0) {
                continue;
            }
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.name = i18n.getInstance().getLanguage(CityController.getInstance().getBuildings()[i].name);
            buildingMiniView.level = CityController.getInstance().getBuildings()[i].level;
            buildingMiniView.x = 200 * this.buildingList.length;
            this.buildingList.push(buildingMiniView);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.buildingContainer);
        this.addChild(this.scrollView);
    };
    FactoryControlView.prototype.onBackButtonTouched = function () {
    };
    FactoryControlView.prototype.repairAllBuilding = function () {
        CityController.getInstance().repairAll();
    };
    return FactoryControlView;
}(BuildingControlView));
__reflect(FactoryControlView.prototype, "FactoryControlView");
