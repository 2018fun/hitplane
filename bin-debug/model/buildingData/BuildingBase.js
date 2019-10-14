var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var BuildingBase = (function () {
    function BuildingBase() {
        this.id = BuildingEnum.UNSET;
        this.level = 0;
        this.top = 0;
        this.insure = [];
        this.protect = false;
    }
    return BuildingBase;
}());
__reflect(BuildingBase.prototype, "BuildingBase");
