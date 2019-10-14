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
var BuildingListView = (function (_super) {
    __extends(BuildingListView, _super);
    /**
     *
     */
    function BuildingListView() {
        var _this = _super.call(this) || this;
        _this.buildingList = [_this.airport, _this.bank, _this.gasStation, _this.scenery, _this.science];
        _this.buildings = [1, 1, 1, 1, 1];
        _this.scrollView = new egret.ScrollView;
        _this.scrollView.x = 0;
        _this.scrollView.y = 0;
        _this.addChild(_this.scrollView);
        _this.airport = new AirPort();
        _this.airport.x = -960;
        _this.bank = new Bank();
        _this.gasStation = new GasStation();
        _this.scenery = new Scenery();
        _this.science = new Science();
        // this.setCityView(1);
        // this.airport.x = this.airport.y = this.bank.x = this.bank.y = this.gasStation.x = this.gasStation.y = 0;
        // this.scenery.y = this.scenery.y = this.science.x = this.science.y = 0;
        _this.airport.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onAirPortTouched, _this);
        _this.bank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBankTouched, _this);
        _this.gasStation.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGasStationTouched, _this);
        _this.scenery.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSceneryTouched, _this);
        _this.science.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onScienceTouched, _this);
        var content = new egret.Sprite();
        content.addChild(_this.airport);
        content.addChild(_this.bank);
        content.addChild(_this.gasStation);
        content.addChild(_this.scenery);
        content.addChild(_this.science);
        _this.scrollView.setContent(content);
        return _this;
        // this.scrollView.addChild(this.bank);
        // this.scrollView.addChild(this.gasStation);
        // this.scrollView.addChild(this.scenery);
        // this.scrollView.addChild(this.science);
    }
    BuildingListView.prototype.update = function () {
    };
    BuildingListView.prototype.levelUPBuilding = function (id) {
    };
    BuildingListView.prototype.onAirPortTouched = function (e) {
        SceneManager.getInstance().openBuildingPop(1);
    };
    BuildingListView.prototype.onBankTouched = function (e) {
    };
    BuildingListView.prototype.onGasStationTouched = function (e) {
    };
    BuildingListView.prototype.onSceneryTouched = function (e) {
    };
    BuildingListView.prototype.onScienceTouched = function (e) {
    };
    return BuildingListView;
}(egret.Sprite));
__reflect(BuildingListView.prototype, "BuildingListView");
