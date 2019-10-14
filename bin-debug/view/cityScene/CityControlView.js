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
var CityControlView = (function (_super) {
    __extends(CityControlView, _super);
    function CityControlView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    CityControlView.prototype.initView = function () {
        this.controlContainer = new egret.Sprite();
        this.addChild(this.controlContainer);
    };
    CityControlView.prototype.renderControlView = function (building) {
        switch (building.id) {
            case BuildingEnum.UNSET:
                this.renderGroundControl();
                break;
            case BuildingEnum.AIRPORT:
                this.renderAirportControl();
                break;
            case BuildingEnum.BANK:
                this.renderBankControl();
                break;
            case BuildingEnum.BULLET_SCIENCE:
                this.renderScience();
                break;
            case BuildingEnum.GAS_STATION:
                this.renderStation();
                break;
            case BuildingEnum.DEFENSE:
                this.renderDefense();
                break;
            case BuildingEnum.INSURE_COMPANY:
                this.renderInsure();
                break;
            case BuildingEnum.REPAIR_FACTORY:
                this.renderRepair();
                break;
            case BuildingEnum.ADVERTISE_COMPANY:
                this.renderBanner();
                break;
            default:
                break;
        }
    };
    CityControlView.prototype.reset = function () {
        this.controlContainer.removeChildren();
    };
    CityControlView.prototype.updateView = function () {
    };
    CityControlView.prototype.renderGroundControl = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new GroundControlView());
    };
    CityControlView.prototype.renderAirportControl = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new AirportControlView());
    };
    CityControlView.prototype.renderBankControl = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new BankControlView());
    };
    CityControlView.prototype.renderScience = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new ScienceControlView());
    };
    CityControlView.prototype.renderStation = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new StationControlView());
    };
    CityControlView.prototype.renderBanner = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new BannerControlView());
    };
    CityControlView.prototype.renderRepair = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new FactoryControlView());
    };
    CityControlView.prototype.renderInsure = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new CompanyControlView());
    };
    CityControlView.prototype.renderDefense = function () {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new DefenseControlView());
    };
    return CityControlView;
}(egret.Sprite));
__reflect(CityControlView.prototype, "CityControlView");
