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
 * 面板基lei
 */
var PanelBase = (function (_super) {
    __extends(PanelBase, _super);
    function PanelBase() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    PanelBase.prototype.initView = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("panel_png");
        this.addChild(bg);
    };
    PanelBase.prototype.updateView = function () {
    };
    return PanelBase;
}(egret.DisplayObjectContainer));
__reflect(PanelBase.prototype, "PanelBase");
