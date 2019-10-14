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
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    Panel.prototype.initView = function () {
        this.panelBg = new egret.Bitmap();
        this.panelBg.texture = RES.getRes("panel_png");
        this.panelBg.anchorOffsetX = this.panelBg.width / 2;
        this.panelBg.anchorOffsetY = this.panelBg.height / 2;
        this.addChild(this.panelBg);
        this.closeButton = new E8Button(this, RES.getRes("close_btn_png"), this.closePanel);
        this.closeButton.x = this.panelBg.x + this.panelBg.width / 2 - this.closeButton.width;
        this.closeButton.y = this.panelBg.y - this.panelBg.height / 2;
        this.closeButton.touchEnabled = true;
        this.addChild(this.closeButton);
        this.touchChildren = true;
    };
    Panel.prototype.setContent = function () {
    };
    Panel.prototype.updateView = function () {
    };
    Panel.prototype.closePanel = function (param) {
        this.parent.removeChild(this);
    };
    return Panel;
}(egret.Sprite));
__reflect(Panel.prototype, "Panel");
