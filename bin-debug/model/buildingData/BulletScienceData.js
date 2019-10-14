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
var BulletScienceData = (function (_super) {
    __extends(BulletScienceData, _super);
    function BulletScienceData(data) {
        var _this = _super.call(this) || this;
        _this.id = BuildingEnum.BULLET_SCIENCE;
        _this.level = data.level;
        _this.cost = data.cost;
        _this.name = data.name;
        _this.view = data.view;
        _this.desc = data.desc;
        _this.level = data.level;
        _this.first = data.first;
        _this.then = data.then;
        _this.first_num = data.first_num;
        _this.bullets = data.bullets;
        return _this;
    }
    Object.defineProperty(BulletScienceData.prototype, "allBulletsType", {
        get: function () {
            return this.bullets;
        },
        enumerable: true,
        configurable: true
    });
    return BulletScienceData;
}(BuildingBase));
__reflect(BulletScienceData.prototype, "BulletScienceData");
