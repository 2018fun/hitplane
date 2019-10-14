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
var GroundControlView = (function (_super) {
    __extends(GroundControlView, _super);
    function GroundControlView() {
        var _this = _super.call(this) || this;
        _this.buildingViewList = [null];
        _this.touchedTime = 0;
        _this.touching = false;
        _this.intiView();
        return _this;
    }
    GroundControlView.prototype.intiView = function () {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        // this.controlViewBg.x = ;
        this.controlViewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.controlViewBg);
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = "新建筑";
        this.addChild(this.titleTextField);
        // this.tipText = new egret.TextField();
        // this.tipText.x = 36;
        // this.tipText.y = 18 + this.titleTextField.height;
        // this.tipText.text = "一星建筑拆除没有折损，会返回原价，您可以任意尝试多种建筑组合。"
        // this.addChild(this.tipText);
        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);
        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();
        var building;
        var buildingMiniView;
        for (var i = 1; i < BuildingEnum.count; i++) {
            building = BuildingDataCache.getInstance().getBuildingByIdAndLevel(i, 1);
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.name = i18n.getInstance().getLanguage(building.name);
            buildingMiniView.view = building.view;
            buildingMiniView.x = 200 * (this.buildingViewList.length - 1);
            this.buildingViewList.push(buildingMiniView);
            buildingMiniView.touchChildren = false;
            // buildingView = new egret.Bitmap();
            // buildingView.texture = RES.getRes(building.view);
            // buildingView.scaleX = buildingView.scaleY = 0.25;
            // buildingView.y = 50;
            // buildingView.x = 200 * (i - 1);
            // buildingView.touchEnabled = true;
            // this.buildingViewList.push(buildingView);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.width = AdaptSceenUtil.curWidth();
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.buildingContainer);
        this.addChild(this.scrollView);
    };
    GroundControlView.prototype.onBuild = function (e) {
        var buildingView = e.target;
        var id = this.buildingViewList.indexOf(buildingView);
        CityController.getInstance().buildBuilding(id);
    };
    GroundControlView.prototype.onTouchBegin = function (e) {
        var _this = this;
        this.touchedTime = new Date().getTime();
        this.touching = true;
        egret.setTimeout(function () {
            if (_this.touching) {
                console.log(_this.buildingViewList);
                SceneManager.getInstance().cityScene.buildDetail(_this.buildingViewList.indexOf(e.target));
            }
        }, this, 1000);
        e.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    GroundControlView.prototype.onTouchEnd = function (e) {
        this.touching = false;
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    GroundControlView.prototype.onBackButtonTouched = function () {
    };
    return GroundControlView;
}(egret.Sprite));
__reflect(GroundControlView.prototype, "GroundControlView");
