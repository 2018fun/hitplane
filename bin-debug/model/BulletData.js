var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var BulletData = (function () {
    function BulletData(data) {
        this.phase = [];
        this.id = data.id;
        this.type = data.type;
        this.desc = data.desc;
        this.view = data.view;
        this.animate = data.animate;
        this.phase = data.phase;
    }
    return BulletData;
}());
__reflect(BulletData.prototype, "BulletData");
