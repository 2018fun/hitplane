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
 * 子弹头部
 */
var BulletHead = (function (_super) {
    __extends(BulletHead, _super);
    function BulletHead() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    BulletHead.prototype.initView = function () {
    };
    BulletHead.prototype.updateView = function () {
    };
    BulletHead.prototype.setName = function (name) {
        this.playerName = name;
    };
    return BulletHead;
}(egret.Sprite));
__reflect(BulletHead.prototype, "BulletHead");
