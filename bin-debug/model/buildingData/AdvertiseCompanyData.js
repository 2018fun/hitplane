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
var AdvertiseCompanyData = (function (_super) {
    __extends(AdvertiseCompanyData, _super);
    function AdvertiseCompanyData(data) {
        var _this = _super.call(this) || this;
        _this.id = BuildingEnum.ADVERTISE_COMPANY;
        _this.level = data.level;
        _this.cost = data.cost;
        _this.name = data.name;
        _this.view = data.view;
        _this.desc = data.desc;
        _this.appear = data.appear;
        _this.earn = data.earn;
        return _this;
    }
    return AdvertiseCompanyData;
}(BuildingBase));
__reflect(AdvertiseCompanyData.prototype, "AdvertiseCompanyData");
