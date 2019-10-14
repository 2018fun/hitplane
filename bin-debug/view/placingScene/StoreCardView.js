/**
 *
 */
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
var StoreCardView = (function (_super) {
    __extends(StoreCardView, _super);
    function StoreCardView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    StoreCardView.prototype.initView = function () {
        this.gameView = new GameView(true);
        this.heads = this.data.heads;
        if (this.heads.length !== 3) {
            console.log("头信息错误");
        }
        else {
            for (var i = 0; i < this.heads.length; i++) {
                this.addOnePlane(this.heads[i].head, this.heads[i].direction);
            }
        }
    };
    StoreCardView.prototype.addOnePlane = function (headGridId, direction) {
    };
    return StoreCardView;
}(egret.Sprite));
__reflect(StoreCardView.prototype, "StoreCardView");
