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
var InsureCompanyData = (function (_super) {
    __extends(InsureCompanyData, _super);
    function InsureCompanyData(data) {
        var _this = _super.call(this) || this;
        _this.id = BuildingEnum.INSURE_COMPANY;
        _this.level = data.level;
        _this.cost = data.cost;
        _this.name = data.name;
        _this.view = data.view;
        _this.desc = data.desc;
        _this.duration = data.duration;
        _this.building = data.building;
        _this.paid = data.paid;
        return _this;
    }
    return InsureCompanyData;
}(BuildingBase));
__reflect(InsureCompanyData.prototype, "InsureCompanyData");
