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
var AirportData = (function (_super) {
    __extends(AirportData, _super);
    function AirportData(data) {
        var _this = _super.call(this) || this;
        _this.id = BuildingEnum.AIRPORT;
        _this.level = data.level;
        _this.cost = data.cost;
        _this.name = data.name;
        _this.view = data.view;
        _this.desc = data.desc;
        _this.opponent = data.opponent;
        _this.opponent_level = data.opponent_level;
        return _this;
    }
    return AirportData;
}(BuildingBase));
__reflect(AirportData.prototype, "AirportData");
