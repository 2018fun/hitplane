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
 * 建筑物面板
 */
var BuildingPop = (function (_super) {
    __extends(BuildingPop, _super);
    function BuildingPop(id) {
        var _this = _super.call(this) || this;
        _this.buildingId = id;
        _this.initView();
        return _this;
    }
    BuildingPop.prototype.initView = function () {
    };
    BuildingPop.prototype.updateView = function () {
    };
    // private 
    BuildingPop.prototype.setBuildingId = function (id) {
        this.buildingId = id;
    };
    return BuildingPop;
}(egret.Sprite));
__reflect(BuildingPop.prototype, "BuildingPop");
