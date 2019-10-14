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
 * 统计
 * 我的打击
 * 我使用过的地图等
 */
var MineScene = (function (_super) {
    __extends(MineScene, _super);
    function MineScene() {
        return _super.call(this) || this;
    }
    return MineScene;
}(egret.Sprite));
__reflect(MineScene.prototype, "MineScene");
