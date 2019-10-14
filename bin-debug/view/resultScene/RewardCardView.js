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
var RewardCardView = (function (_super) {
    __extends(RewardCardView, _super);
    function RewardCardView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    RewardCardView.prototype.initView = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);
    };
    return RewardCardView;
}(egret.Sprite));
__reflect(RewardCardView.prototype, "RewardCardView");
